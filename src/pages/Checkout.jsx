import Header from "../components/Header";
import Footer from "../components/Footer";
import FormularioPago from "../components/FormularioPago";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";

function Checkout() {
  const { cart, user, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Preparar los ítems a pagar antes de los guards
  const singleRaw = typeof window !== 'undefined' ? sessionStorage.getItem('checkoutSingle') : null;
  let singleItems = [];
  try { singleItems = singleRaw ? JSON.parse(singleRaw) : []; } catch {}
  const itemsForCheckout = (singleItems && singleItems.length > 0) ? singleItems : cart;

  // Permitir acceso solo si venimos desde Carrito/Producto (marca de sesión)
  useEffect(() => {
    const allowed = sessionStorage.getItem('checkoutAllowed') === '1';
    const justPurchased = sessionStorage.getItem('justPurchased') === '1';
    if (!allowed) {
      navigate('/carrito', { replace: true });
      return;
    }

    // Bloquear volver atrás manteniendo al usuario en Checkout
    const onPopState = () => {
      try {
        if (window.location.pathname === '/checkout') {
          window.history.pushState(null, '', window.location.href);
        }
      } catch {}
    };
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', onPopState);

    // Si venimos con permiso pero aún no llegaron los ítems a pagar, dar un pequeño margen.
    if (!justPurchased && itemsForCheckout.length === 0) {
      const t = setTimeout(() => {
        const stillAllowed = sessionStorage.getItem('checkoutAllowed') === '1';
        const stillJustPurchased = sessionStorage.getItem('justPurchased') === '1';
        if (!stillJustPurchased && stillAllowed && itemsForCheckout.length === 0) {
          navigate('/carrito', { replace: true });
        }
      }, 300);
      return () => {
        clearTimeout(t);
        window.removeEventListener('popstate', onPopState);
      };
    }

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [itemsForCheckout.length, navigate]);

  const subtotal = itemsForCheckout.reduce((sum, p) => sum + (p.precio ?? 0) * (p.cantidad ?? 1), 0);
  const shipping = itemsForCheckout.length > 0 ? 10000 : 0; // mismo placeholder que en Carrito
  const discount = 0;
  const total = subtotal + shipping - discount;

  const handleSubmit = async (payload) => {
    try {
      const items = itemsForCheckout.map((p) => ({ id: p.id, nombre: p.nombre, precio: p.precio, talle: p.talle ?? null, cantidad: p.cantidad ?? 1, imagen: p.imagen ?? null }));
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
      // Guardar pedido en Firestore bajo el usuario
      if (!user?.uid) throw new Error("Usuario no autenticado");
      await addDoc(collection(db, 'users', user.uid, 'orders'), {
        ...order,
        createdAt: serverTimestamp(),
      });
      // Notificación de compra
      await addDoc(collection(db, 'users', user.uid, 'notifications'), {
        type: 'order',
        message: `Compra realizada por $${total.toLocaleString('es-AR')}`,
        createdAt: serverTimestamp(),
        read: false,
      });
      // Primero navegar a compra realizada para evitar que el guard redirija al carrito
      try { sessionStorage.setItem('justPurchased', '1'); } catch {}
      navigate('/compra-realizada', { replace: true });
      // Reintento defensivo por si algún efecto ajeno interfiere
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/compra-realizada') {
          navigate('/compra-realizada', { replace: true });
        }
      }, 50);
      // Luego limpiar flags de sesión de forma asíncrona
      setTimeout(() => {
        try {
          // Si es compra desde el carrito (no single), vaciar carrito
          if (!singleItems || singleItems.length === 0) {
            try { clearCart(); } catch {}
          }
          sessionStorage.removeItem('checkoutAllowed');
          sessionStorage.removeItem('checkoutSingle');
          sessionStorage.removeItem('justPurchased');
        } catch {}
      }, 0);
    } catch (e) {
      console.error("Error en el pago", e);
      alert("Ocurrió un error al procesar el pago");
      // Aún así, navegar a compra realizada para no quedar trabado en checkout
      try { sessionStorage.setItem('justPurchased', '1'); } catch {}
      navigate('/compra-realizada', { replace: true });
      setTimeout(() => {
        if (typeof window !== 'undefined' && window.location.pathname !== '/compra-realizada') {
          navigate('/compra-realizada', { replace: true });
        }
      }, 50);
      setTimeout(() => {
        try {
          sessionStorage.removeItem('checkoutAllowed');
          sessionStorage.removeItem('checkoutSingle');
          sessionStorage.removeItem('justPurchased');
        } catch {}
      }, 0);
    }
  };

  // Si el acceso es válido pero aún no hay items (estado en tránsito), mostrar una espera breve
  const allowed = typeof window !== 'undefined' && sessionStorage.getItem('checkoutAllowed') === '1';
  if (allowed && itemsForCheckout.length === 0) {
    return (
      <div className="bg-AzulClaro min-h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Resumen */}
          <section className="lg:col-span-2 bg-Azul border-4 border-AzulCeleste rounded-2xl overflow-hidden h-fit">
            <div className="bg-AzulCeleste text-white px-4 py-2 text-sm font-bold">Resumen de compra</div>
            <div className="p-4 text-black">
              <ul className="space-y-3">
                {itemsForCheckout.map((p, idx) => (
                  <li key={idx} className="flex justify-between text-sm border-b pb-2">
                    <div>
                      <p className="font-semibold">{p.nombre}</p>
                      {p.talle && <p className="text-black">Talle: {p.talle}</p>}
                      <p className="text-black">Cantidad: {p.cantidad ?? 1}</p>
                    </div>
                    <div className="text-right">
                      <div>${((p.precio ?? 0) * (p.cantidad ?? 1)).toLocaleString('es-AR')}</div>
                      <div className="text-xs text-black">(${(p.precio ?? 0).toLocaleString('es-AR')} c/u)</div>
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
            </div>
          </section>

          {/* Formulario de pago */}
          <section className="lg:col-span-3 bg-Azul border-4 border-AzulCeleste rounded-2xl overflow-hidden">
            <div className="bg-AzulCeleste text-white px-4 py-2 text-sm font-bold">Datos de pago</div>
            <div className="p-4 text-black">
              <FormularioPago total={total} onSubmit={handleSubmit} />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
