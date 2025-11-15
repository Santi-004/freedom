import LogoFreedom from "../assets/img/freedom.png";
import { FaShoppingCart, FaStar, FaUserCircle } from "react-icons/fa";
import { FaBookBible, FaBookOpen } from "react-icons/fa6";
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import LoginPopup from "./LoginPopup";

function Header() {
  const [mostrar, setMostrar] = useState(false);
  const navigate = useNavigate();
  const { user, showLogin, setShowLogin, intendedPath, setIntendedPath } = useContext(AppContext);

  const handleProtectedNav = (path) => {
    if (user) {
      navigate(path);
    } else {
      setIntendedPath(path);
      setShowLogin(true);
    }
  };

  const goToPath = (path) => {
    navigate(path);
    setMostrar(false);
  };

  const goToSection = (id) => {
    if (window.location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = id;
      }
    } else {
      navigate(`/#${id}`);
    }
    setMostrar(false);
  };

  return (
    <header className="bg-GrisOscuro h-[100px] flex justify-between items-center">
      {/* Logo */}
      <div>
        <Link to="/" className="text-white text-2xl cursor-pointer"><img src={LogoFreedom} alt="Logo Freedom" className="h-[100px] w-[200px] p-3"/></Link>
      </div>

      <div>
        {/* Nav para pantallas grandes */}
        <nav className="flex justify-center items-center hidden DropDownMenu:flex">
          <div className="p-3">
            <button type="button" onClick={() => goToPath('/')} className="linkanimado text-white text-2xl cursor-pointer bg-transparent">INICIO</button>
          </div>
          <div className="p-3">
            <button type="button" onClick={() => goToSection('nosotros')} className="linkanimado text-white text-2xl cursor-pointer bg-transparent">NOSOTROS</button>
          </div>
          <div className="p-3">
            <button type="button" onClick={() => goToSection('contacto')} className="linkanimado text-white text-2xl cursor-pointer bg-transparent">CONTACTOS</button>
          </div>
          <div className="p-3">
            <button type="button" onClick={() => goToPath('/catalogo')} className="linkanimado text-white text-2xl cursor-pointer bg-transparent">CATALOGO</button>
          </div>
          <div className="p-3">
            <button onClick={() => handleProtectedNav('/carrito')}>
              <FaShoppingCart className="h-6 mt-1.5 w-auto text-white animacion-escala transition-transform duration-300 ease-in-out" />
            </button>
          </div>
          <div className="p-3">
            <button onClick={() => handleProtectedNav('/favoritos')}>
              <FaStar className="h-6 mt-1.5 w-auto text-white animacion-escala transition-transform duration-300 ease-in-out" />
            </button>
          </div>
          <div className="p-3">
            <button onClick={() => handleProtectedNav('/perfil')}>
              <FaUserCircle className="h-6 mt-1.5 w-auto text-white animacion-escala transition-transform duration-300 ease-in-out" />
            </button>
          </div>
        </nav>

        {/* Botón de DropDownMenu para pantallas pequeñas */}
        <div className="flex DropDownMenu:hidden pr-6">
          <button onClick={() => setMostrar(!mostrar)} className="text-white text-2xl p-5">
            {mostrar ? <FaBookOpen /> : <FaBookBible />}
          </button>

          {mostrar && (
            <div className="absolute xl:hidden top-24 left-0 w-full z-50 bg-GrisOscuro flex flex-col items-center gap-6 dropdownmenuanimacion">
              <div className="p-3">
                <button type="button" onClick={() => goToPath('/')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out bg-transparent">INICIO</button>
              </div>
              <div className="p-3">
                <button type="button" onClick={() => goToSection('nosotros')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out bg-transparent">NOSOTROS</button>
              </div>
              <div className="p-3">
                <button type="button" onClick={() => goToSection('contacto')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out bg-transparent">CONTACTOS</button>
              </div>
              <div className="p-3">
                <button type="button" onClick={() => goToPath('/catalogo')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out bg-transparent">CATALOGO</button>
              </div>
              <div className="p-3">
                <button onClick={() => handleProtectedNav('/carrito')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">CARRITO</button>
              </div>
              <div className="p-3">
                <button onClick={() => handleProtectedNav('/favoritos')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">FAVORITOS</button>
              </div>
              <div className="p-3">
                <button onClick={() => handleProtectedNav('/perfil')} className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">PERFIL</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showLogin && (
        <LoginPopup
          onClose={() => setShowLogin(false)}
          onSuccess={() => {
            if (intendedPath) {
              navigate(intendedPath);
              setIntendedPath(null);
            }
          }}
        />
      )}
    </header>
  );
}

export default Header;
