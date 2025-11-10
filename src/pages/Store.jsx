import { createContext, useState, useEffect } from "react";

// Crear contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProviser = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Leer localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedFavorites = localStorage.getItem("favorites");

    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Funciones asincrónicas, preparadas para Firebase en el futuro
  const addToCart = async (item) => {
    // Aquí vendría la lógica Firebase en el futuro
    // await firebaseAddToCart(item);
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = async (id) => {
    // await firebaseRemoveFromCart(id);
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToFavorites = async (item) => {
    // await firebaseAddToFavorites(item);
    if (!favorites.some((f) => f.id === item.id)) {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const removeFromFavorites = async (id) => {
    // await firebaseRemoveFromFavorites(id);
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};