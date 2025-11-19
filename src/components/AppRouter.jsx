import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import ABM from "../pages/ABM";
import Carrito from "../pages/Carrito";
import Catalogo from "../pages/Catalogo";
import Favoritos from "../pages/Favoritos";
import Perfil from "../pages/Perfil";
import Producto from "../pages/Producto";
import Index from "../pages/index";
import Checkout from "../pages/Checkout";

// Redirección que abre popup en efecto para evitar setState durante render
const LoginRedirect = ({ path }) => { //path ruta a la que el usuario se dirigía
  const navigate = useNavigate();
  const { setShowLogin, setIntendedPath } = useContext(AppContext); //setShowLogin para mostrar popup, setIntendedPath para guardar la ruta a la que el usuario se dirigía
  useEffect(() => {
    setIntendedPath(path); //guarda la ruta a la que el usuario se dirigía
    setShowLogin(true); //abre popup
    navigate("/", { replace: true }); //redirige a inicio
  }, [path, navigate, setIntendedPath, setShowLogin]);
  return null;
};

// Componente para rutas protegidas
const PrivateRoute = ({ element, path, allowedRoles }) => { 
  const { user, loadingUser } = useContext(AppContext); //user para obtener datos del usuario, loadingUser para verificar si el usuario está cargando
  if (loadingUser) return null; // o un spinner si querés
  if (!user) return <LoginRedirect path={path} />; //si no hay usuario, redirige a login
  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(user.rol)) {
      return <Navigate to="/" replace />; //si el usuario no tiene el rol permitido, redirige a inicio
    }
  }
  return element; 
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas  */}
      <Route path="/" element={<Index />} />
      <Route path="/catalogo" element={<Catalogo />} />
      <Route path="/producto/:id" element={<Producto />} />

      {/* Rutas privadas */}
      <Route
        path="/carrito"
        element={<PrivateRoute path="/carrito" allowedRoles={["cliente","admin"]} element={<Carrito />} />}
      />
      <Route
        path="/checkout"
        element={<PrivateRoute path="/checkout" allowedRoles={["cliente","admin"]} element={<Checkout />} />}
      />
      <Route
        path="/favoritos"
        element={<PrivateRoute path="/favoritos" allowedRoles={["cliente","admin"]} element={<Favoritos />} />}
      />
      <Route
        path="/perfil"
        element={<PrivateRoute path="/perfil" allowedRoles={["cliente","admin"]} element={<Perfil />} />}
      />

      {/* Rutas de administrador */}
      <Route
        path="/abm"
        element={<PrivateRoute path="/abm" allowedRoles={["admin"]} element={<ABM />} />}
      />
      <Route
        path="/ABM"
        element={<PrivateRoute path="/ABM" allowedRoles={["admin"]} element={<ABM />} />}
      />

      {/* Redirección a inicio si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;