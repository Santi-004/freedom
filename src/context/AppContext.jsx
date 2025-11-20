// context/AppContext.jsx
import { createContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "../config/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, collection, onSnapshot, orderBy, query, addDoc, serverTimestamp, updateDoc } from "firebase/firestore";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [intendedPath, setIntendedPath] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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

          // Cargar carrito y favoritos desde Firestore si existen
          try {
            if (Array.isArray(data.cart)) setCart(data.cart);
            if (Array.isArray(data.favorites)) setFavorites(data.favorites);
          } catch {}

          // Suscribirse a notificaciones del usuario (usuarios existentes)
          try {
            const q = query(collection(db, "users", currentUser.uid, "notifications"), orderBy("createdAt", "desc"));
            const unsubNoti = onSnapshot(q, (snap) => {
              const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
              setNotifications(list);
              setUnreadCount(list.filter((n) => !n.read).length);
            });
            window.__notiUnsub && window.__notiUnsub();
            window.__notiUnsub = unsubNoti;
          } catch {}
        } else {
          const newUser = { //crea un nuevo usuario
            nombre: currentUser.displayName, //nombre del usuario
            email: currentUser.email, //email del usuario
            photoURL: currentUser.photoURL ?? null, //foto del usuario
            rol: "cliente", //rol del usuario
          };
          await setDoc(userRef, { ...newUser, cart: [], favorites: [] }); //guarda el nuevo usuario en Firestore
          setUser({ uid: currentUser.uid, ...newUser }); //establece el nuevo usuario
          //registra el usuario en la consola
          try { console.log("[Auth] New user created and set:", { uid: currentUser.uid, rol: "cliente" }); } catch {} 
          setShowLogin(false); //cierra el popup de login

          // Suscribirse a notificaciones del usuario
          try {
            const q = query(collection(db, "users", currentUser.uid, "notifications"), orderBy("createdAt", "desc"));
            const unsubNoti = onSnapshot(q, (snap) => {
              const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
              setNotifications(list);
              setUnreadCount(list.filter((n) => !n.read).length);
            });
            // Guardar en closure para limpiar en logout
            window.__notiUnsub && window.__notiUnsub();
            window.__notiUnsub = unsubNoti;
          } catch {}
        }
      } else {
        setUser(null); //establece el usuario como null
        setNotifications([]);
        setUnreadCount(0);
        try { window.__notiUnsub && window.__notiUnsub(); window.__notiUnsub = null; } catch {}
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

  // Persistir carrito y favoritos en Firestore cuando el usuario está logueado
  useEffect(() => {
    const persist = async () => {
      if (!user?.uid) return;
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { cart }, { merge: true });
      } catch (e) {
        try { console.warn("[Sync] Error saving cart to Firestore", e); } catch {}
      }
    };
    persist();
  }, [user?.uid, cart]);

  useEffect(() => {
    const persist = async () => {
      if (!user?.uid) return;
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { favorites }, { merge: true });
      } catch (e) {
        try { console.warn("[Sync] Error saving favorites to Firestore", e); } catch {}
      }
    };
    persist();
  }, [user?.uid, favorites]);

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
        if (existsSameTalle) {
          // Incrementar cantidad si ya existe
          return next.map((p) =>
            p.id === item.id && p.talle === item.talle
              ? { ...p, cantidad: (p.cantidad ?? 1) + (item.cantidad ?? 1) }
              : p
          );
        }
        return [...next, { ...item, cantidad: item.cantidad ?? 1 }];
      }

      // Caso sin talle: evitar múltiples entradas sin talle del mismo producto
      const existsNoTalle = next.some((p) => p.id === item.id && !p.talle);
      if (existsNoTalle) {
        return next.map((p) =>
          p.id === item.id && !p.talle ? { ...p, cantidad: (p.cantidad ?? 1) + (item.cantidad ?? 1) } : p
        );
      }
      return [...next, { ...item, cantidad: item.cantidad ?? 1 }];
    });
  };

  const updateQuantity = (id, talle, cantidad) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && (talle ? item.talle === talle : true)
            ? { ...item, cantidad: Math.max(1, Number(cantidad) || 1) }
            : item
        )
        .filter((item) => (talle ? !(item.id === id && item.talle === talle && (Number(cantidad) || 1) <= 0) : true))
    );
  };

  const removeFromCart = (id, talle) =>
    setCart((prev) => prev.filter((item) => (talle ? !(item.id === id && item.talle === talle) : item.id !== id))); //remueve un item del carrito

  const clearCart = () => setCart([]);

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

    // Crear notificación de inicio de sesión en cada login explícito
    try {
      await addDoc(collection(db, "users", user.uid, "notifications"), {
        type: "login",
        message: `Iniciaste sesión`,
        createdAt: serverTimestamp(),
        read: false,
      });
    } catch (e) {
      try { console.warn('[Noti] No se pudo crear notificación de login', e); } catch {}
    }
  };

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth); //cierra sesión con Firebase
    setUser(null); //establece el usuario como null
  };

  // Marcar notificaciones como leídas
  const markAllNotificationsRead = async () => {
    try {
      if (!user?.uid) return;
      const unread = notifications.filter((n) => !n.read);
      await Promise.all(
        unread.map((n) => updateDoc(doc(db, 'users', user.uid, 'notifications', n.id), { read: true }))
      );
    } catch (e) {
      try { console.warn('[Noti] Error al marcar notificaciones como leídas', e); } catch {}
    }
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
        updateQuantity, // actualizar cantidad
        clearCart, // vaciar carrito
        favorites, // favoritos
        addToFavorites, // agregar a favoritos
        removeFromFavorites, // remover de favoritos
        notifications, // notificaciones
        unreadCount, // no leídas
        markAllNotificationsRead, // acción para marcarlas como leídas
      }}
    >
      {children}
    </AppContext.Provider>
  );
};