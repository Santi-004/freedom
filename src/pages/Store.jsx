import { createContext, useState, useEffect } from "react";

// Crear contexto
export const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
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

  // Funciones
  const addToCart = async (item) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = async (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToFavorites = async (item) => {
    if (!favorites.some((f) => f.id === item.id)) {
      setFavorites((prev) => [...prev, item]);
    }
  };

  const removeFromFavorites = async (id) => {
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
