import Header from "../components/Header";
import Footer from "../components/Footer";
import FormularioPago from "../components/FormularioPago";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, p) => sum + (p.precio ?? 0) * (p.cantidad ?? 1), 0);
  const shipping = cart.length > 0 ? 10000 : 0; // mismo placeholder que en Carrito
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleSubmit = (payload) => {
    try {
      const items = cart.map((p) => ({ id: p.id, nombre: p.nombre, precio: p.precio, talle: p.talle ?? null, cantidad: p.cantidad ?? 1, imagen: p.imagen ?? null }));
      const order = {
        id: Date.now().toString(),
        items,
        total,
        pago: {
          tipoTarjeta: payload.tipoTarjeta,
          ultimos4: payload.numero.slice(-4),
          expiracion: payload.expiracion,
        },
        direccion: payload.direccion,
        contacto: payload.contacto,
        createdAt: new Date().toISOString(),
      };
      const prev = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([order, ...prev]));
      navigate('/compra-realizada');
    } catch (e) {
      console.error("Error en el pago", e);
      alert("Ocurrió un error al procesar el pago");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-AzulClaro min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-4">
          <div className="max-w-4xl mx-auto bg-white border rounded p-6">
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <button
              className="bg-Azul hover:bg-AzulCeleste text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition"
              onClick={() => navigate("/catalogo")}
            >
              Ir al catálogo
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Resumen */}
          <section className="lg:col-span-2 bg-white border rounded p-4 h-fit">
            <h2 className="text-xl font-bold mb-4">Resumen de compra</h2>
            <ul className="space-y-3">
              {cart.map((p, idx) => (
                <li key={idx} className="flex justify-between text-sm border-b pb-2">
                  <div>
                    <p className="font-semibold">{p.nombre}</p>
                    {p.talle && <p className="text-gray-600">Talle: {p.talle}</p>}
                    <p className="text-gray-600">Cantidad: {p.cantidad ?? 1}</p>
                  </div>
                  <div className="text-right">
                    <div>${((p.precio ?? 0) * (p.cantidad ?? 1)).toLocaleString('es-AR')}</div>
                    <div className="text-xs text-gray-500">(${(p.precio ?? 0).toLocaleString('es-AR')} c/u)</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString('es-AR')}</span></div>
              <div className="flex justify-between"><span>Envío</span><span>${shipping.toLocaleString('es-AR')}</span></div>
              <div className="flex justify-between"><span>Descuento</span><span>${discount.toLocaleString('es-AR')}</span></div>
            </div>
            <div className="flex justify-between mt-2 text-lg font-bold">
              <span>Total</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>
          </section>

          {/* Formulario de pago */}
          <section className="lg:col-span-3 bg-white border rounded p-4">
            <h2 className="text-xl font-bold mb-4">Datos de pago</h2>
            <FormularioPago total={total} onSubmit={handleSubmit} />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
