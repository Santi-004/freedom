import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel"
import FormTalle from "../components/FormTalle";
import ButtonDrop from "../components/ButtonDrop";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowRotateLeft } from "react-icons/fa6";

function Producto(){
    return(
        <body class="bg-AzulClaro">
            <div>
                <Header></Header>

                {/* Pantallas Grandes */}
                <div className="hidden DropDownMenu:flex flex items-center justify-center">
                    <div className="bg-Azul flex border-2 mt-10 rounded-xl min-h-screen">
                        <div className="flex flex-col mb-10">
                            <Carousel></Carousel>
                            <div className="flex flex-col items-center justify-center w-full">
                                <ButtonDrop textoCerrar="Descripción" textoMostrar="Descripción" 
                                contenido="">
                                </ButtonDrop>
                                <ButtonDrop textoCerrar="Calidad" textoMostrar="Calidad"
                                contenido=""
                                ></ButtonDrop>
                                <ButtonDrop textoCerrar="Cuidado de la Ropa" textoMostrar="Cuidado de la Ropa"
                                contenido=""
                                ></ButtonDrop>
                            </div>
                        </div>

                        <div className="w-1/4 bg-AzulClaro min-w-[250px] w-full items-center justify-center m-10 ml-0 border-2 rounded-xl p-10">
                            <div className="text-center mb-5"><h1>Producto</h1></div>
                            <div><h2>$Precio</h2></div>
                            <FormTalle></FormTalle>
                            <div className="ml-12 mr-12 mb-5 mt-5"><button className="bg-Azul hover:bg-AzulCeleste font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Comprar Ahora</button></div>
                            <div className="ml-12 mr-12 mb-5 mt-5"><button className="bg-Azul hover:bg-AzulCeleste font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Agregar al Carrito</button></div>
                            <div className='flex items-center gap-2 mb-5 mt-5'>
                                <TbTruckDelivery className='h-6 w-auto'/>
                                <div className='p-1'><p className='text-left'>Envío a todo el país</p></div>
                            </div>
                            <div className='flex items-center gap-2 mb-5 mt-5'>
                                <FaArrowRotateLeft className='h-6 w-auto'/>
                                <div className='p-1'><p className='text-left'>Devolución antes de los 7 días</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pantallas Pequeñas */}
                <div className="DropDownMenu:hidden">
                    <div className="bg-Azul">
                        <div><h1 className="p-5 ">Producto</h1></div>
                        <div><h2 className="pl-5 ">Precio</h2></div>
                        <Carousel></Carousel>
                        <div className="flex flex-col items-center justify-center w-full">
                            <ButtonDrop textoCerrar="Descripción" textoMostrar="Descripción"></ButtonDrop>
                            <ButtonDrop textoCerrar="Calidad" textoMostrar="Calidad"></ButtonDrop>
                            <ButtonDrop textoCerrar="Cuidado de la Ropa" textoMostrar="Cuidado de la Ropa"></ButtonDrop>
                        </div>
                    </div>
                    <div className="bg-AzulClaro">
                        <FormTalle></FormTalle>
                        <div className="ml-12 mr-12 mb-5 mt-5 items-center justify-center flex"><button className="bg-Azul hover:bg-AzulCeleste max-w-[400px] font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Comprar Ahora</button></div>
                        <div className="ml-12 mr-12 mb-5 mt-5 items-center justify-center flex"><button className="bg-Azul hover:bg-AzulCeleste max-w-[400px] font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Agregar al Carrito</button></div>
                        <div className='flex items-center gap-2 ml-12 mr-12 mb-5 mt-5'>
                            <TbTruckDelivery className='h-6 w-auto '/>
                            <div className='p-1'><p className='text-left'>Envío a todo el país</p></div>
                        </div>
                        <div className='flex items-center gap-2 ml-12 mr-12 mb-5 mt-5'>
                            <FaArrowRotateLeft className='h-6 w-auto'/>
                            <div className='p-1'><p className='text-left'>Devolución antes de los 7 días</p></div>
                        </div>
                    </div>
                </div>  
                
                <Footer></Footer>
            </div>    
        </body>
        
    )
}

export default Producto;