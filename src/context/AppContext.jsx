// context/AppContext.jsx
import { createContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "../config/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [intendedPath, setIntendedPath] = useState(null);

  // Detectar si el usuario está logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid); //referencia al documento del usuario en Firestore
        const docSnap = await getDoc(userRef); //obtiene el documento del usuario

        if (docSnap.exists()) {
          const data = docSnap.data() || {};
          if (!data.rol) {
            await setDoc(userRef, { rol: "cliente" }, { merge: true }); //si el usuario no tiene rol, lo crea
            data.rol = "cliente";
          }
          
          // Une los campos de autenticación con los de Firestore
          setUser({
            uid: currentUser.uid, //id del usuario
            nombre: data.nombre ?? currentUser.displayName ?? null, //nombre del usuario
            email: data.email ?? currentUser.email ?? null, //email del usuario
            telefono: data.telefono ?? null, //telefono del usuario
            photoURL: data.photoURL ?? currentUser.photoURL ?? null, //foto del usuario
            rol: (data.rol ?? "cliente").toString().trim().toLowerCase(), //rol del usuario
          });
          //registra el usuario en la consola
          try { console.log("[Auth] User set from Firestore+Auth:", { uid: currentUser.uid, rol: (data.rol ?? "cliente").toString().trim().toLowerCase() }); } catch {} 
          setShowLogin(false); //cierra el popup de login
        } else {
          const newUser = { //crea un nuevo usuario
            nombre: currentUser.displayName, //nombre del usuario
            email: currentUser.email, //email del usuario
            photoURL: currentUser.photoURL ?? null, //foto del usuario
            rol: "cliente", //rol del usuario
          };
          await setDoc(userRef, newUser); //guarda el nuevo usuario en Firestore
          setUser({ uid: currentUser.uid, ...newUser }); //establece el nuevo usuario
          //registra el usuario en la consola
          try { console.log("[Auth] New user created and set:", { uid: currentUser.uid, rol: "cliente" }); } catch {} 
          setShowLogin(false); //cierra el popup de login
        }
      } else {
        setUser(null); //establece el usuario como null
      }
      setLoadingUser(false); //cierra el popup de login
    });

    return () => unsubscribe();
  }, []);

  // Leer carrito y favoritos desde localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart"); //lee el carrito desde localStorage
    const storedFavorites = localStorage.getItem("favorites"); //lee los favoritos desde localStorage

    if (storedCart) setCart(JSON.parse(storedCart)); //establece el carrito
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites)); //establece los favoritos
  }, []);

  // Guardar carrito/favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); //guarda el carrito en localStorage
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites)); //guarda los favoritos en localStorage
  }, [favorites]);

  // Funciones globales
  const addToCart = (item) => { //agrega un item al carrito
    if (!user) { //si no hay usuario
      setShowLogin(true); //abre el popup de login
      return;
    }
    setCart((prev) => {
      // Si viene con talle, eliminar cualquier entrada previa del mismo producto sin talle
      let next = item.talle ? prev.filter((p) => !(p.id === item.id && !p.talle)) : [...prev];

      // Evitar duplicado exacto por id+talle
      if (item.talle) {
        const existsSameTalle = next.some((p) => p.id === item.id && p.talle === item.talle);
        if (existsSameTalle) return next;
        return [...next, item];
      }

      // Caso sin talle: evitar múltiples entradas sin talle del mismo producto
      const existsNoTalle = next.some((p) => p.id === item.id && !p.talle);
      if (existsNoTalle) return next;
      return [...next, item];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id)); //remueve un item del carrito

  const addToFavorites = (item) => { //agrega un item a los favoritos
    if (!user) { //si no hay usuario
      setShowLogin(true); //abre el popup de login
      return;
    }
    if (!favorites.some((f) => f.id === item.id)) { //si el item no esta en los favoritos
      setFavorites((prev) => [...prev, item]); //agrega el item a los favoritos
    }
  };
  const removeFromFavorites = (id) =>
    setFavorites((prev) => prev.filter((item) => item.id !== id)); //remueve un item de los favoritos

  // Login con Google
  const loginWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider); //inicia sesión con Google
    const user = result.user;
    const userRef = doc(db, "users", user.uid); //referencia al documento del usuario en Firestore
    const docSnap = await getDoc(userRef); //obtiene el documento del usuario
    
    if (!docSnap.exists()) { //si el usuario no existe
      await setDoc(userRef, {
        nombre: user.displayName, //nombre del usuario
        email: user.email, //email del usuario
        rol: "cliente", //rol del usuario
      });
    }
  };

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth); //cierra sesión con Firebase
    setUser(null); //establece el usuario como null
  };

  return (
    <AppContext.Provider //proveedor del contexto
      value={{ // valor del contexto
        user, // usuario
        loadingUser, // cargando usuario
        loginWithGoogle, // iniciar sesión con Google
        logout, // cerrar sesión
        showLogin, // mostrar login
        setShowLogin, // establecer mostrar login
        intendedPath, // ruta previa
        setIntendedPath, // establecer ruta previa
        cart, // carrito
        addToCart, // agregar al carrito
        removeFromCart, // remover del carrito
        favorites, // favoritos
        addToFavorites, // agregar a favoritos
        removeFromFavorites, // remover de favoritos
      }}
    >
      {children}
    </AppContext.Provider>
  );
};