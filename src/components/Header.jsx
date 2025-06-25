import LogoFreedom from "../assets/img/freedom.png";
import { FaShoppingCart, FaStar, FaUserCircle  } from "react-icons/fa";
import { FaBookBible, FaBookOpen } from "react-icons/fa6";
import { useState } from 'react';


function Header(){
    const [mostrar, setMostrar] = useState(false);
    return(
        <header className="bg-GrisOscuro h-[100px] flex justify-between items-center">
            <div>
                <img src={LogoFreedom} className="h-[100px] w-[200px] p-3"/>
            </div>

            <div>
                <nav className="flex p-5 hidden DropDownMenu:flex">
                    <p className='text-white text-2xl p-3 '>INICIO</p>
                    <p className='text-white text-2xl p-3 '>CATALOGO</p>
                    <p className='text-white text-2xl p-3 '>NOSOTROS</p>
                    <p className='text-white text-2xl p-3 '>CONTACTOS</p>

                    <FaShoppingCart className="h-6 w-auto text-white m-4" />
                    <FaStar className="h-6 w-auto text-white m-4" />
                    <FaUserCircle className="h-6 w-auto text-white m-4" />
                </nav>
                
                <div className="flex DropDownMenu:hidden pr-6 ">
                    <button onClick={() => setMostrar(!mostrar)} className="text-white text-2xl p-5">
                        {mostrar ? <FaBookOpen /> : <FaBookBible/> }
                    </button>

                    {mostrar && (
                        <div className={`absolute xl:hidden top-24 left-0 w-full bg-GrisOscuro flex flex-col item-center gap-6 `}>
                            <div className="">
                                <p className='text-white text-xl text-center p-3 '>INICIO</p>
                                <p className='text-white text-xl text-center p-3 '>CATALOGO</p>
                                <p className='text-white text-xl text-center p-3 '>FAVORITOS</p>
                                <p className='text-white text-xl text-center p-3 '>CARRITO</p>
                                <p className='text-white text-xl text-center p-3 '>PERFIL</p>
                            </div>
                        </div>
                    )}
                </div>


            </div>
            
        </header>
    );
}

export default Header;