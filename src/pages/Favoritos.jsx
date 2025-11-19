import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favorites, removeFromFavorites } = useContext(AppContext);
  const navigate = useNavigate();

  // Función para manejar el click async sin bloquear el UI (puedes mejorar con estados de carga)
  const handleRemove = async (id) => {
    try {
      await removeFromFavorites(id);
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>

        {favorites.length === 0 ? (
          <p className="text-2xl">No tienes favoritos</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {favorites.map((producto, index) => (
              <div
                key={index}
                className="flex flex-col p-2 h-[500px] border-4 rounded-lg border-AzulCeleste bg-Azul items-center cursor-pointer mt-4 mb-4 
                           w-full sm:w-[320px] md:basis-1/3 lg:basis-1/4 min-w-[400px] max-w-[400px]
                           hover:bg-AzulCeleste hover:border-Azul hover:text-white
                           transition-colors duration-300 ease-in-out hover:scale-105 transition-transform duration-300 ease-in-out aparecer"
                onClick={() => navigate(`/producto/${producto.id}`)}
                role="button"
                tabIndex={0}
              >
                <div className="flex w-full justify-end">
                  <button
                    className="ml-auto text-yellow-400 hover:scale-110 transition"
                    title="Quitar de favoritos"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(producto.id);
                    }}
                  >
                    <FaStar className="h-7 w-7 drop-shadow" />
                  </button>
                </div>

                <div className="p-2 max-w-[330px] w-full h-full">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="text-sm text-gray-200 bg-AzulClaro rounded-lg p-4 text-center">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="bg-AzulClaro p-2 w-[315px] rounded-lg text-center">
                  <p className="text-md font-semibold mb-0">
                    Precio: ${ (producto.precio ?? 0).toLocaleString('es-AR') }
                  </p>
                  <p className="text-xl font-bold mb-0">{producto.nombre}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Favoritos;