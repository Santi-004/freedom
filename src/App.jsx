import Button from "./components/Button";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import './index.css';
import Producto from "./pages/Producto";
import ABM from "./pages/ABM";
import Carrito from "./pages/Carrito";
import Catalogo from "./pages/Catalogo";
import Favoritos from "./pages/Favoritos";
import Index from "./pages/index";
import Perfil from "./pages/Perfil";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ABM" element={<ABM />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/producto" element={<Producto />} />
      </Routes>
    </BrowserRouter>
);
}
export default App;