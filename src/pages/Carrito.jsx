import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Carrito() {
  const { cart, removeFromCart, updateQuantity } = useContext(AppContext);
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

  // Totales y resumen
  const itemsCount = cart.reduce((n, p) => n + (p.cantidad ?? 1), 0);
  const subtotal = cart.reduce((s, p) => s + (p.precio ?? 0) * (p.cantidad ?? 1), 0);
  const shipping = cart.length > 0 ? 10000 : 0; // placeholder como en el mockup
  const discount = 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        {cart.length === 0 ? (
          <div className="max-w-4xl mx-auto p-6 bg-white border rounded">
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <button
              className="bg-Azul hover:bg-AzulCeleste text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition"
              onClick={() => navigate("/catalogo")}
            >
              Ir al catálogo
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Resumen izquierda */}
            <aside className="lg:col-span-2 bg-Azul/60 rounded-2xl p-5 border-4 border-Azul">
              <h2 className="text-2xl font-extrabold mb-4 text-black">Resumen Compra</h2>
              <div className="space-y-4">
                <div className="bg-white/70 rounded-2xl px-5 py-3 font-semibold">{itemsCount} Producto{itemsCount !== 1 ? 's' : ''}</div>
                <div className="bg-white/70 rounded-2xl px-5 py-3 font-semibold">Precio: ${subtotal.toLocaleString('es-AR')}</div>
                <div className="bg-white/70 rounded-2xl px-5 py-3 font-semibold">Precio Entrega: {shipping.toLocaleString('es-AR')}</div>
                <div className="bg-white/70 rounded-2xl px-5 py-3 font-semibold">Descuento: ${discount.toLocaleString('es-AR')}</div>
                <div className="bg-white/70 rounded-2xl px-5 py-3 font-extrabold">Total ${total.toLocaleString('es-AR')}</div>
              </div>
              <div className="mt-6 flex justify-center">
                <button onClick={handleCheckout} className="bg-white text-black font-bold py-3 px-8 rounded-2xl hover:scale-105 transition">
                  Comprar
                </button>
              </div>
            </aside>

            {/* Lista derecha */}
            <section className="lg:col-span-3 space-y-6">
              {cart.map((producto, index) => (
                <div key={index} className="bg-Azul/60 rounded-2xl p-4 border-4 border-Azul flex gap-4 items-stretch">
                  {/* Imagen */}
                  <div className="bg-AzulClaro rounded-xl border-4 border-black p-2 w-40 h-40 flex items-center justify-center relative">
                    {producto.imagen ? (
                      <img src={producto.imagen} alt={producto.nombre} className="object-contain max-h-full" />
                    ) : (
                      <div className="text-sm text-gray-700">Sin imagen</div>
                    )}
                    <button
                      title="Eliminar"
                      className="absolute top-1 right-1 text-gray-700 hover:text-red-600"
                      onClick={() => removeFromCart(producto.id, producto.talle)}
                    >
                      ✖
                    </button>
                  </div>

                  {/* Datos */}
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <div className="text-black">
                      <div className="font-semibold">{producto.nombre}</div>
                      {producto.talle && <div>Tamaño: {producto.talle}</div>}
                      <div className="mt-1">${(producto.precio ?? 0).toLocaleString('es-AR')}</div>
                    </div>

                    {/* Cantidad selector estilo pill */}
                    <div className="w-56">
                      <label className="sr-only">Cantidad</label>
                      <div className="bg-AzulClaro rounded-full px-5 py-3 flex items-center justify-between">
                        <span className="font-semibold">Cantidad</span>
                        <select
                          className="bg-transparent outline-none cursor-pointer"
                          value={producto.cantidad ?? 1}
                          onChange={(e) => updateQuantity(producto.id, producto.talle, Number(e.target.value))}
                        >
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
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