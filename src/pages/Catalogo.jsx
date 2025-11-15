import Header from "../components/Header";
import Footer from "../components/Footer";
import RemeraCatalogo from "../components/RemeraCatalogo";
import { useProductos } from "../hooks/useProductos";

{/* Acá tenemos la estructura del catalogo */}
function Catalogo(){
    const { productos, loading } = useProductos();
    return(
        <div className="bg-AzulClaro">
            <Header></Header>
            <div className="flex flex-wrap gap-4 items-center justify-center p-6">
                {loading ? (
                    <div>Cargando...</div>
                ) : (
                    productos.map((p) => (
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
            <Footer></Footer>
        </div>    
    )
}

export default Catalogo;