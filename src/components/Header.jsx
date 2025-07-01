import LogoFreedom from "../assets/img/freedom.png";
import { FaShoppingCart, FaStar, FaUserCircle  } from "react-icons/fa";
import { FaBookBible, FaBookOpen } from "react-icons/fa6";
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header(){
    // Estado del boton del DropDownMenu
    const [mostrar, setMostrar] = useState(false);
    return(
        // Header
        <header className="bg-GrisOscuro h-[100px] flex justify-between items-center">
            
            {/* Div Logo Freedom */}
            <div>
                <img src={LogoFreedom} alt="Logo Freedom" className="h-[100px] w-[200px] p-3"/>
            </div>

            
            <div>
                {/* Nav para pantallas grandes */}
                <nav className="flex p-5 hidden DropDownMenu:flex">
                    <div className="p-3"><Link to="/" className="linkanimado text-white text-2xl cursor-pointer">INICIO</Link></div>
                    <div className="p-3"><Link to="/catalogo" className="linkanimado text-white text-2xl cursor-pointer">CATALOGO</Link></div>
                    <div className="p-3"><Link to="/" className="linkanimado text-white text-2xl cursor-pointer">NOSOTROS</Link></div>
                    <div className="p-3"><Link to="/" className="linkanimado text-white text-2xl cursor-pointer">CONTACTOS</Link></div>
                    <div><Link to="/carrito" ><FaShoppingCart className="h-6 w-auto text-white m-4 animacion-escala" /></Link></div>
                    <div><Link to="/favoritos" ><FaStar className="h-6 w-auto text-white m-4 animacion-escala" /></Link></div>
                    <div><Link to="/perfil" ><FaUserCircle className="h-6 w-auto text-white m-4 animacion-escala" /></Link></div>
                </nav>
                
                {/* Boton de DropDownMenu para las pantallas pequeñas */}
                <div className="flex DropDownMenu:hidden pr-6 ">
                    <button onClick={() => setMostrar(!mostrar)} className="text-white text-2xl p-5">
                        {mostrar ? <FaBookOpen /> : <FaBookBible/> }
                    </button>

                    {mostrar && (
                        // Nav para pantallas pequeñas
                        <div className={"absolute xl:hidden top-24 left-0 w-full bg-GrisOscuro flex flex-col item-center gap-6 dropdownmenuanimacion"}>
                            <div className="">
                                <div className="p-3"><p className='text-white text-xl text-center animacion-escala'>INICIO</p></div>
                                <div className="p-3"><p className='text-white text-xl text-center animacion-escala'>CATALOGO</p></div>
                                <div className="p-3"><p className='text-white text-xl text-center animacion-escala'>FAVORITOS</p></div>
                                <div className="p-3"><p className='text-white text-xl text-center animacion-escala'>CARRITO</p></div>
                                <div className="p-3"><p className='text-white text-xl text-center animacion-escala'>PERFIL</p></div>
                            </div>
                        </div>
                    )}
                </div>


            </div>
            
        </header>
    );
}

export default Header;