import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function CompraRealizada() {
  const navigate = useNavigate();
  return (
    <div className="bg-AzulClaro min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow p-6">
        <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-8 text-center">
          <h1 className="text-3xl font-extrabold mb-4">¡Su compra se realizó con éxito!</h1>
          <p className="text-gray-700 mb-8">
            Ya registramos tu compra en el apartado <strong>Pedidos</strong> de tu perfil.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/perfil")}
              className="bg-Azul hover:bg-AzulCeleste text-white font-bold py-2 px-6 rounded-full hover:scale-105 transition"
            >
              Ver mis pedidos
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-white border border-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full hover:scale-105 transition"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CompraRealizada;

