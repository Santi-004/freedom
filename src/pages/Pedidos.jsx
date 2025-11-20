import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { db } from "../config/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function Pedidos() {
  const { user } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    const q = query(collection(db, "users", user.uid, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(list);
      setLoading(false);
    }, () => setLoading(false));
    return () => unsub();
  }, [user?.uid]);

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

          {loading && (
            <div className="bg-Azul rounded-2xl p-4 text-white">Cargando pedidos...</div>
          )}

          {!loading && orders.length === 0 && (
            <div className="bg-Azul rounded-2xl p-4 text-white">Todavía no tenés pedidos.</div>
          )}

          {!loading && orders.length > 0 && (
            <ul className="space-y-4">
              {orders.map((o) => (
                <li key={o.id} className="bg-Azul border-4 border-AzulCeleste rounded-2xl overflow-hidden">
                  <div className="bg-AzulCeleste text-white px-4 py-2 text-sm font-bold flex justify-between">
                    <span>Pedido #{o.id.slice(-6)}</span>
                    <span>{o.createdAt?.toDate ? o.createdAt.toDate().toLocaleString() : (o.createdAt || "-")}</span>
                  </div>
                  <div className="p-4 text-black bg-AzulClaro">
                    <div className="flex justify-between mb-2 font-semibold">
                      <span>Total</span>
                      <span>${(o.total ?? 0).toLocaleString('es-AR')}</span>
                    </div>
                    <ul className="space-y-2">
                      {(o.items ?? []).map((it, idx) => (
                        <li key={idx} className="flex justify-between text-sm border-b pb-1">
                          <div>
                            <div className="font-semibold">{it.nombre}</div>
                            {it.talle && <div className="text-black">Talle: {it.talle}</div>}
                            <div className="text-black">Cantidad: {it.cantidad ?? 1}</div>
                          </div>
                          <div className="text-right">
                            <div>${((it.precio ?? 0) * (it.cantidad ?? 1)).toLocaleString('es-AR')}</div>
                            <div className="text-xs text-black">(${(it.precio ?? 0).toLocaleString('es-AR')} c/u)</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Pedidos;
