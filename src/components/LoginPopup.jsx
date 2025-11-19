import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FcGoogle } from "react-icons/fc";
import LogoFreedom from "../assets/img/freedom.png";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-Azul p-6 rounded-lg border-4 border-AzulCeleste shadow-lg max-w-[500px] w-full relative">
        <div className="flex justify-center">
          <img src={LogoFreedom} alt="Logo Freedom" className="h-[150px] w-[300px] p-3"/>
        </div>
        <div className="flex justify-center">
          <h2 className="text-lg font-bold mb-2">Iniciar Sesión</h2>
        </div>
        <p className="text-sm text-gray-700 mb-4 text-center">
          Para continuar, iniciá sesión o registrate.
        </p>

        <div className="flex flex-col items-center gap-3 w-full">
          <button
            onClick={handleLogin}
            className="bg-AzulClaro border-Azul border-4 hover:bg-Azul hover:border-AzulClaro hover:border-4 
                       font-bold hover:text-white py-2 px-4 rounded-full w-full max-w-[320px]
                       hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center gap-2"
          >
            <FcGoogle size={28} />
            Continuar con Google
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 border-Azul border-4 hover:bg-gray-600 hover:border-AzulCeleste hover:border-4 
                       hover:text-white font-bold py-2 px-4 rounded-full w-full max-w-[320px]
                       hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPopup;