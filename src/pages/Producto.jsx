import Header from "../components/Header";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import FormTalle from "../components/FormTalle";
import ButtonDrop from "../components/ButtonDrop";
import { TbTruckDelivery } from "react-icons/tb";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function Producto() {
    const { id } = useParams();
    const { productos, loading } = useProductos();
    const { addToCart } = useContext(AppContext);
    const [talle, setTalle] = useState("");
    const [showAdded, setShowAdded] = useState(false);
    const navigate = useNavigate();

    const producto = productos.find((p) => p.id === id);

    const slideImages = [
        producto?.slide1,
        producto?.slide2,
        producto?.slide3,
        producto?.slide4,
        producto?.slide5,
    ].filter((u) => typeof u === "string" && u.length > 0);

    return (
        <div className="bg-AzulClaro overflow-x-hidden">
            <Header />

            {loading && (
                <div className="flex items-center justify-center p-10">
                    Cargando producto...
                </div>
            )}
            {!loading && !producto && (
                <div className="flex items-center justify-center p-10">
                    Producto no encontrado
                </div>
            )}

            {/* DESKTOP */}
            <div className="hidden lg:flex w-full justify-center">
               <div className="bg-Azul flex border-2 mt-10 rounded-xl max-w-[1300px] w-full mx-auto p-5 gap-16 px-24">

                    {/* FOTOS */}
                    <div className="flex flex-col w-[55%] items-center">
                        <Carousel images={slideImages} />

                        <div className="flex flex-col items-center mt-10 gap-3 w-full">
                            <ButtonDrop textoCerrar="Descripción" textoMostrar="Descripción" />
                            <ButtonDrop textoCerrar="Calidad" textoMostrar="Calidad" />
                            <ButtonDrop textoCerrar="Cuidado de la Ropa" textoMostrar="Cuidado de la Ropa" />
                        </div>
                    </div>

                    {/* CAJA DE TALLES */}
                    <div className="bg-AzulClaro w-full max-w-[450px] border-2 rounded-xl p-10 flex flex-col justify-start">
                        <div className="text-center mb-5">
                            <h1>{producto?.nombre ?? `Producto ${id}`}</h1>
                        </div>

                        <h2 className="text-center mb-5">
                            {producto?.precio ? `$${producto.precio}` : "$Precio"}
                        </h2>

                        <FormTalle value={talle} onChange={setTalle} />

                    {/* Acá veremos info del envio y devolución y podremos concluir la compra y agregar al carrito */}
                        <div className="my-5">
                            <button
                              disabled={!talle}
                              onClick={() => {
                                if (!talle) return;
                                addToCart({ id: producto?.id ?? id, nombre: producto?.nombre ?? `Producto ${id}`, precio: producto?.precio ?? 0, talle, imagen: producto?.imagenCard ?? null });
                                navigate("/checkout");
                              }}
                              className={`font-bold py-2 px-4 rounded-full w-full transition ${!talle ? 'bg-gray-400 cursor-not-allowed' : 'bg-Azul hover:bg-AzulCeleste hover:scale-105'}`}
                            >
                                Comprar Ahora
                            </button>
                        </div>

                        <div className="my-5">
                            <button
                              disabled={!talle}
                              onClick={() => {
                                if (!talle) return;
                                addToCart({ id: producto?.id ?? id, nombre: producto?.nombre ?? `Producto ${id}`, precio: producto?.precio ?? 0, talle, imagen: producto?.imagenCard ?? null });
                                setShowAdded(true);
                                setTimeout(() => setShowAdded(false), 2000);
                              }}
                              className={`font-bold py-2 px-4 rounded-full w-full transition ${!talle ? 'bg-gray-400 cursor-not-allowed' : 'bg-Azul hover:bg-AzulCeleste hover:scale-105'}`}
                            >
                                Agregar al Carrito
                            </button>
                        </div>

                    <div className="flex items-center gap-3 mb-5 mt-5">
                       <TbTruckDelivery className="text-4xl" />
                        <p className="text-lg leading-none">Envío a todo el país</p>
                    </div>

                    <div className="flex items-center gap-3 mb-5 mt-5">
                      <FaArrowRotateLeft className="text-4xl" />
                        <p className="text-lg leading-none">Devolución antes de los 7 días</p>
                    </div>
                    </div>
                </div>
            </div>

            {/* Dispositivo mobile */}
            <div className="lg:hidden">
                <div className="bg-Azul px-4 pb-4">
                    <h1 className="pt-5 text-center">{producto?.nombre ?? `Producto ${id}`}</h1>
                    <h2 className="pb-2 text-center">
                        {producto?.precio ? `$${producto.precio}` : "Precio"}
                    </h2>

                    <div className="w-full">
                        <Carousel images={slideImages} />
                    </div>

                    <div className="flex flex-col items-center gap-3 mt-5">
                        <ButtonDrop textoCerrar="Descripción" textoMostrar="Descripción" />
                        <ButtonDrop textoCerrar="Calidad" textoMostrar="Calidad" />
                        <ButtonDrop textoCerrar="Cuidado de la Ropa" textoMostrar="Cuidado de la Ropa" />
                    </div>
                </div>

                <div className="bg-AzulClaro px-4 pb-10">
                    <div className="max-w-[520px] mx-auto w-full">
                        <FormTalle value={talle} onChange={setTalle} />

                        <div className="my-5">
                            <button
                              disabled={!talle}
                              onClick={() => {
                                if (!talle) return;
                                addToCart({ id: producto?.id ?? id, nombre: producto?.nombre ?? `Producto ${id}`, precio: producto?.precio ?? 0, talle, imagen: producto?.imagenCard ?? null });
                                navigate("/checkout");
                              }}
                              className={`font-bold py-2 px-4 rounded-full w-full max-w-[500px] mx-auto transition ${!talle ? 'bg-gray-400 cursor-not-allowed' : 'bg-Azul hover:bg-AzulCeleste hover:scale-105'}`}
                            >
                                Comprar Ahora
                            </button>
                        </div>

                        <div className="my-5">
                            <button
                              disabled={!talle}
                              onClick={() => {
                                if (!talle) return;
                                addToCart({ id: producto?.id ?? id, nombre: producto?.nombre ?? `Producto ${id}`, precio: producto?.precio ?? 0, talle, imagen: producto?.imagenCard ?? null });
                                setShowAdded(true);
                                setTimeout(() => setShowAdded(false), 2000);
                              }}
                              className={`font-bold py-2 px-4 rounded-full w-full max-w-[500px] mx-auto transition ${!talle ? 'bg-gray-400 cursor-not-allowed' : 'bg-Azul hover:bg-AzulCeleste hover:scale-105'}`}
                            >
                                Agregar al Carrito
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-5 mt-5">
                            <TbTruckDelivery className="h-6" />
                            <p>Envío a todo el país</p>
                        </div>

                        <div className="flex items-center gap-2 mb-5 mt-5">
                            <FaArrowRotateLeft className="h-6" />
                            <p>Devolución antes de los 7 días</p>
                        </div>
                    </div>
                </div>
            </div>

            {showAdded && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow z-50">
                    Producto agregado al carrito
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Producto;
