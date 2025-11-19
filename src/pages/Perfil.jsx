import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Perfil(){
    const { user, logout } = useContext(AppContext);
    return(
        <div className="bg-AzulClaro">
            <Header></Header>
            {/* Div con toda la page del perfil */}
            <div className="flex ">
                {/* Div que se muestra en pantallas de 1024 pixeles de ancho o más. */}
                <div className="hidden lg:flex flex w-full">
                    {/* Div que contiene el menu de información*/}
                    <div className="w-[400px] h-auto p-4 bg-Azul flex flex-col items-center justify-center">
                        <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">INFORMACIÓN DE LA CUENTA</button></div>
                        <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">METODOS DE PAGO</button></div>
                        <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">PEDIDOS</button></div>
                        <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">NOTIFICACIONES</button></div>
                        <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">AYUDA</button></div>
                        <div className="w-full p-2 text-white"><button onClick={logout} className="bg-AzulCeleste border-Azul border-4 hover:bg-AzulClaro hover:border-AzulCeleste hover:border-4 max-w-[400px] font-bold hover:text-black py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">CERRAR SESIÓN</button></div>
                    </div>
                    
                    {/* Div que contiene la información principal de la cuenta.*/}
                    <div className="flex flex-col items-center justify-center mx-auto w-auto m-10">
                        {user?.photoURL ? (
                            <img src={user.photoURL} referrerPolicy="no-referrer" alt="Foto de perfil" className="rounded-full w-[200px] h-[200px] object-cover" />
                        ) : (
                            <div className="rounded-full bg-Azul w-[200px] h-[200px] "></div>
                        )}
                        <div className="mt-4 bg-Azul font-bold p-4 pt-2 pb-2 rounded-full text-center w-full max-w-[500px]"><p className="m-0">NOMBRE: {user?.nombre || "-"}</p></div>
                        <div className="mt-4 bg-Azul font-bold p-4 pt-2 pb-2 rounded-full text-center w-full max-w-[500px]"><p className="m-0">E-MAIL: {user?.email || "-"}</p></div>
                        <div className="mt-4 bg-Azul font-bold p-4 pt-2 pb-2 rounded-full text-center w-full max-w-[500px]"><p className="m-0">TELÉFONO: {user?.telefono || "-"}</p></div>
                    </div>
                </div>
                {/* Div que se muestra en pantallas de 1023 pixeles de ancho o menos. */}
                <div className="w-full lg:hidden">
                    
                    {/* Div que contiene la información principal de la cuenta.*/}
                    <div className="flex flex-col items-center justify-center mx-auto w-auto mt-0 p-4">
                        {user?.photoURL ? (
                            <img src={user.photoURL} referrerPolicy="no-referrer" alt="Foto de perfil" className="rounded-full w-[100px] h-[100px] object-cover" />
                        ) : (
                            <div className="rounded-full bg-Azul w-[100px] h-[100px] "></div>
                        )}
                        <div className="mt-2 bg-Azul font-bold p-2 rounded-full text-center w-full"><p className="m-0">NOMBRE: {user?.nombre || "-"}</p></div>
                        <div className="mt-2 bg-Azul font-bold p-2 rounded-full text-center w-full"><p className="m-0">E-MAIL: {user?.email || "-"}</p></div>
                        <div className="mt-2 bg-Azul font-bold p-2 rounded-full text-center w-full"><p className="m-0">TELÉFONO: {user?.telefono || "-"}</p></div>
                    </div>
                    {/* Div que contiene el menu de información*/}
                    <div className="p-4 bg-Azul">
                        <div className="w-full "><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">INFORMACIÓN DE LA CUENTA</button></div>
                        <div className="w-full mt-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">METODOS DE PAGO</button></div>
                        <div className="w-full mt-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">PEDIDOS</button></div>
                        <div className="w-full mt-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">NOTIFICACIONES</button></div>
                        <div className="w-full mt-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">AYUDA</button></div>
                        <div className="w-full p-2 text-white"><button onClick={logout} className="bg-AzulCeleste border-Azul border-4 hover:bg-AzulClaro hover:border-AzulCeleste hover:border-4 font-bold hover:text-black py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">CERRAR SESIÓN</button></div>
                    </div>
                </div>    
            </div>
            <Footer></Footer>
        </div>    
    )
}
export default Perfil;