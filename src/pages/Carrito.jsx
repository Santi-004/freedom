import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "./Store";

function Carrito() {
  const { cart, removeFromCart } = useContext(AppContext);

  const handleRemove = async (id) => {
    try {
      await removeFromCart(id);
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
    }
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
      </main>

      <Footer />
    </div>
  );
}

export default Carrito;