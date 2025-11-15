import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function LoginPopup({ onClose, onSuccess }) {
  const { loginWithGoogle } = useContext(AppContext); //inicia sesión con Google

  const handleLogin = async () => {
    try {
      await loginWithGoogle(); //inicia sesión con Google
      if (onSuccess) onSuccess(); //si hay exito, ejecuta onSuccess
      if (onClose) onClose(); //si hay exito, ejecuta onClose
    } catch (e) {
      
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
        <h2 className="text-xl font-bold mb-2">Iniciar sesión</h2>
        <p className="text-sm text-gray-600 mb-4">
          Para continuar, iniciá sesión o registrate.
        </p>
        <div className="space-y-3">
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Continuar con Google
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;