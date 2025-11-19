import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaStar } from "react-icons/fa";

function Favoritos() {
  const { favorites, removeFromFavorites } = useContext(AppContext);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((producto, index) => (
              <div key={index} className="bg-Azul/70 border-4 border-black rounded-2xl p-4">
                <div className="relative bg-AzulClaro rounded-xl border-2 border-AzulCeleste h-64 flex items-center justify-center">
                  {producto.imagen ? (
                    <img src={producto.imagen} alt={producto.nombre} className="object-contain max-h-full" />
                  ) : (
                    <div className="text-sm text-gray-700">Sin imagen</div>
                  )}
                  <button
                    className="absolute top-2 right-2 text-yellow-400 hover:scale-110 transition"
                    title="Quitar de favoritos"
                    onClick={() => handleRemove(producto.id)}
                  >
                    <FaStar className="h-7 w-7 drop-shadow" />
                  </button>
                </div>

                <div className="mt-4 bg-AzulClaro rounded-2xl px-4 py-3 text-center">
                  <div className="font-extrabold">
                    ${ (producto.precio ?? 0).toLocaleString('es-AR') }
                  </div>
                  <div className="font-semibold">{producto.nombre}</div>
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