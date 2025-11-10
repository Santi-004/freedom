import LogoFreedom from "../assets/img/freedom.png";
import { FaShoppingCart, FaStar, FaUserCircle } from "react-icons/fa";
import { FaBookBible, FaBookOpen } from "react-icons/fa6";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <header className="bg-GrisOscuro h-[100px] flex justify-between items-center">
      {/* Logo */}
      <div>
        <img src={LogoFreedom} alt="Logo Freedom" className="h-[100px] w-[200px] p-3"/>
      </div>

      <div>
        {/* Nav para pantallas grandes */}
        <nav className="flex p-5 hidden DropDownMenu:flex">
          <div className="p-3">
            <Link to="/" className="linkanimado text-white text-2xl cursor-pointer">INICIO</Link>
          </div>
          <div className="p-3">
            <Link to="/catalogo" className="linkanimado text-white text-2xl cursor-pointer">CATALOGO</Link>
          </div>
          <div className="p-3">
            <a href="#nosotros" className="linkanimado text-white text-2xl cursor-pointer">NOSOTROS</a>
          </div>
          <div className="p-3">
            <a href="#contacto" className="linkanimado text-white text-2xl cursor-pointer">CONTACTOS</a>
          </div>
          <div>
            <Link to="/carrito">
              <FaShoppingCart className="h-6 w-auto text-white m-4 animacion-escala transition-transform duration-300 ease-in-out" />
            </Link>
          </div>
          <div>
            <Link to="/favoritos">
              <FaStar className="h-6 w-auto text-white m-4 animacion-escala transition-transform duration-300 ease-in-out" />
            </Link>
          </div>
          <div>
            <Link to="/perfil">
              <FaUserCircle className="h-6 w-auto text-white m-4 animacion-escala transition-transform duration-300 ease-in-out" />
            </Link>
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
                <Link to="/" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">INICIO</Link>
              </div>
              <div className="p-3">
                <Link to="/catalogo" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">CATALOGO</Link>
              </div>
              <div className="p-3">
                <a href="#nosotros" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">NOSOTROS</a>
              </div>
              <div className="p-3">
                <a href="#contacto" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">CONTACTOS</a>
              </div>
              <div className="p-3">
                <Link to="/carrito" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">CARRITO</Link>
              </div>
              <div className="p-3">
                <Link to="/favoritos" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">FAVORITOS</Link>
              </div>
              <div className="p-3">
                <Link to="/perfil" className="text-white text-xl text-center animacion-escala transition-transform duration-300 ease-in-out">PERFIL</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
