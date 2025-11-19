import Header from "../components/Header";
import Footer from "../components/Footer";
import RemeraCatalogo from "../components/RemeraCatalogo";
import { useProductos } from "../hooks/useProductos";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function Catalogo(){
    const { productos, loading } = useProductos();
    const [busqueda, setBusqueda] = useState("");
    const [orden, setOrden] = useState("none");
    const [ordenAbierto, setOrdenAbierto] = useState(false);

    const productosFiltrados = productos.filter((p) => {
        const termino = busqueda.toLowerCase();
        return (
            p.nombre?.toLowerCase().includes(termino) ||
            p.descripcion?.toLowerCase().includes(termino)
        );
    });

    const productosOrdenados = [...productosFiltrados].sort((a, b) => {
        switch (orden) {
            case "name-asc":
                return a.nombre.localeCompare(b.nombre);
            case "name-desc":
                return b.nombre.localeCompare(a.nombre);
            case "price-asc":
                return (a.precio || 0) - (b.precio || 0);
            case "price-desc":
                return (b.precio || 0) - (a.precio || 0);
            default:
                return 0;
        }
    });
    return(
        <div className="bg-AzulClaro">
            <Header></Header>
            <div className="p-4 min-h-[90vh]">
                <h1 className="text-3xl font-bold mb-6 mt-4 ml-4">Catalogo</h1>
                <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6 gap-4">
                        <div className="relative w-full md:max-w-[280px] ml-4">
                            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-Azul">
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                placeholder="Buscar productos..."
                                className="w-full bg-AzulClaro border-Azul border-4 rounded-full pl-10 pr-4 py-2 font-semibold placeholder:text-Azul focus:outline-none focus:ring-4 focus:ring-AzulClaro"
                            />
                        </div>

                        <div className="relative w-full md:max-w-[280px] mr-4">
                            <button
                                type="button"
                                onClick={() => setOrdenAbierto((prev) => !prev)}
                                className="w-full bg-AzulClaro border-Azul border-4 rounded-full px-4 py-2 text-left font-bold flex items-center justify-between hover:bg-AzulCeleste hover:border-AzulClaro hover:text-white hover:scale-105 transition-transform duration-300 ease-in-out"
                            >
                                <span>
                                    {orden === "none" && "Sin orden"}
                                    {orden === "name-asc" && "Nombre A - Z"}
                                    {orden === "name-desc" && "Nombre Z - A"}
                                    {orden === "price-asc" && "Precio menor a mayor"}
                                    {orden === "price-desc" && "Precio mayor a menor"}
                                </span>
                                <span className="ml-2">▾</span>
                            </button>

                            {ordenAbierto && (
                                <div className="absolute z-50 mt-2 w-full bg-white border-4 border-Azul rounded-2xl shadow-lg overflow-hidden">
                                    {[
                                        { value: "none", label: "Sin orden" },
                                        { value: "name-asc", label: "Nombre A - Z" },
                                        { value: "name-desc", label: "Nombre Z - A" },
                                        { value: "price-asc", label: "Precio menor a mayor" },
                                        { value: "price-desc", label: "Precio mayor a menor" },
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                setOrden(opt.value);
                                                setOrdenAbierto(false);
                                            }}
                                            className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200 
                                                ${orden === opt.value
                                                    ? "bg-Azul text-white"
                                                    : "bg-AzulClaro text-Azul hover:bg-AzulClaro"}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                <div className="flex flex-wrap justify-center gap-4 p-6">
                    
                    {loading ? (
                        <div>Cargando...</div>
                    ) : (
                        productosOrdenados.map((p) => (
                            <RemeraCatalogo
                                key={p.id}
                                id={p.id}
                                nombre={p.nombre}
                                descripcion={p.descripcion}
                                precio={p.precio}
                                imagen={p.imagenCard}
                            />
                        ))
                    )}
                </div>
            </div>
            <Footer></Footer>
        </div>    
    )
}

export default Catalogo;