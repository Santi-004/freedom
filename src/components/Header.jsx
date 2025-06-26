import LogoFreedom from "../assets/img/freedom.png";
import { FaShoppingCart, FaStar, FaUserCircle  } from "react-icons/fa";
import { FaBookBible, FaBookOpen } from "react-icons/fa6";
import { useState } from 'react';


function Header(){
    const [mostrar, setMostrar] = useState(false);
    return(
        <header className="bg-GrisOscuro h-[100px] flex justify-between items-center">
            <div>
                <img src={LogoFreedom} alt="Logo Freedom" className="h-[100px] w-[200px] p-3"/>
            </div>

            <div>
                <nav className="flex p-5 hidden DropDownMenu:flex">
                    <div className="p-3"><p className='linkanimado text-white text-2xl'>INICIO</p></div>
                    <div className="p-3"><p className='linkanimado text-white text-2xl'>CATALOGO</p></div>
                    <div className="p-3"><p className='linkanimado text-white text-2xl'>NOSOTROS</p></div>
                    <div className="p-3"><p className='linkanimado text-white text-2xl'>CONTACTOS</p></div>

                    <FaShoppingCart className="h-6 w-auto text-white m-4" />
                    <FaStar className="h-6 w-auto text-white m-4" />
                    <FaUserCircle className="h-6 w-auto text-white m-4" />
                </nav>
                
                <div className="flex DropDownMenu:hidden pr-6 ">
                    <button onClick={() => setMostrar(!mostrar)} className="text-white text-2xl p-5">
                        {mostrar ? <FaBookOpen /> : <FaBookBible/> }
                    </button>

                    {mostrar && (
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