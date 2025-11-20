import Header from "../components/Header";
import Footer from "../components/Footer";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { db } from "../config/firebase";
import { doc, deleteDoc } from "firebase/firestore";

function Notificaciones() {
  const { notifications, unreadCount, markAllNotificationsRead, user } = useContext(AppContext);

  const handleDeleteAll = async () => {
    try {
      if (!user?.uid || notifications.length === 0) return;
      const ok = window.confirm('¿Eliminar todas las notificaciones?');
      if (!ok) return;
      await Promise.all(
        notifications.map((n) => deleteDoc(doc(db, 'users', user.uid, 'notifications', n.id)))
      );
    } catch (e) {
      try { console.warn('[Noti] Error eliminando notificaciones', e); } catch {}
    }
  };

  const handleDeleteOne = async (id) => {
    try {
      if (!user?.uid || !id) return;
      await deleteDoc(doc(db, 'users', user.uid, 'notifications', id));
    } catch (e) {
      try { console.warn('[Noti] Error eliminando notificación', e); } catch {}
    }
  };

  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Notificaciones</h1>
            <div className="flex gap-2">
              <button
                disabled={unreadCount === 0}
                onClick={markAllNotificationsRead}
                className={`rounded-full px-4 py-2 font-bold border-4 ${unreadCount === 0 ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-200' : 'border-Azul bg-AzulClaro hover:bg-AzulCeleste hover:border-AzulClaro hover:text-white transition'}`}
              >
                Marcar como leídas ({unreadCount})
              </button>
              <button
                disabled={notifications.length === 0}
                onClick={handleDeleteAll}
                className={`rounded-full px-4 py-2 font-bold border-4 ${notifications.length === 0 ? 'opacity-50 cursor-not-allowed border-gray-300 bg-gray-200' : 'border-red-700 bg-red-600 text-white hover:bg-red-700 hover:border-red-800 transition'}`}
              >
                Eliminar todas
              </button>
            </div>
          </div>

          {notifications.length === 0 ? (
            <div className="bg-Azul rounded-2xl p-4 text-white">No tenés notificaciones.</div>
          ) : (
            <ul className="space-y-3">
              {notifications.map((n) => (
                <li key={n.id} className={`rounded-2xl border-4 ${n.read ? 'border-Azul' : 'border-AzulCeleste'} bg-Azul px-4 py-3`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-white font-semibold">
                      {n.type === 'login' && 'Inicio de sesión'}
                      {n.type === 'order' && 'Compra realizada'}
                      {!n.type && 'Notificación'}
                    </div>
                    <button
                      onClick={() => handleDeleteOne(n.id)}
                      className="shrink-0 rounded-full px-3 py-1 text-sm font-bold border-2 border-red-700 bg-red-600 text-white hover:bg-red-700 hover:border-red-800 transition"
                      title="Eliminar"
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="text-AzulClaro font-bold">{n.message ?? ''}</div>
                  <div className="text-white text-sm opacity-80">
                    {n.createdAt?.toDate ? n.createdAt.toDate().toLocaleString() : ''}
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

export default Notificaciones;
