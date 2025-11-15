import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const { cart, removeFromCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [missingProduct, setMissingProduct] = useState(null);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
  };

  {/* Acá tendremos la estructura del producto que esta en el carrito */}
  const handleCheckout = () => {
    const missing = cart.find((p) => !p.talle);
    if (missing) {
      setMissingProduct(missing);
      setShowSizeModal(true);
      return;
    }
    navigate("/checkout"); // Ruta placeholder para el formulario de compra
  };

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        <h1 className="text-3xl font-bold m-4">Carrito</h1>

        {cart.length === 0 ? (
          <p className="m-4 text-2xl">Tu carrito está vacío :(</p>
        ) : (
          <ul className="m-4 space-y-4">
            {cart.map((producto, index) => (
              <li
                key={index}
                className="border p-4 rounded bg-white shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{producto.nombre}</h2>
                  <p>{producto.descripcion}</p>
                  {producto.talle && <p>Talle: {producto.talle}</p>}
                  <p>Precio: ${producto.precio}</p>
                </div>
                <button
                  onClick={() => handleRemove(producto.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Acá tendremos el boton para que realice la compra */}
        {cart.length > 0 && (
          <div className="m-4 flex justify-end">
            <button
              onClick={handleCheckout}
              className="bg-Azul hover:bg-AzulCeleste text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition"
            >
              Realizar compra
            </button>
          </div>
        )}
      </main>

      {/* Acá nos pedira un talle */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-AzulClaro p-6 rounded-lg border-4 border-Azul shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowSizeModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 font-bold"
            >
              ✖
            </button>
            <h2 className="text-lg font-bold mb-4">Seleccioná un talle</h2>
            <p className="mb-6">Hay productos en tu carrito que no tienen un talle seleccionado. Tiene que elegir un talle para continuar con la compra.</p>
            <div className="flex gap-2 justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => setShowSizeModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-Azul hover:bg-AzulCeleste text-white px-4 py-2 rounded"
                onClick={() => {
                  setShowSizeModal(false);
                  if (missingProduct?.id) navigate(`/producto/${missingProduct.id}`);
                }}
              >
                Ir al producto
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Carrito;