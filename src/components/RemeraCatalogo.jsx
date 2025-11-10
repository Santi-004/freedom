import { useContext } from "react";
import remera_referencia from "../assets/img/remera_referencia.jpg";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { AppContext } from "../pages/Store";

function RemeraCatalogo() {
  const { addToCart, addToFavorites } = useContext(AppContext);

  const producto = {
    id: "remera-1",
    nombre: "Remera básica",
    descripcion: "Remera de algodón",
    precio: 10000,
    imagen: remera_referencia,
  };

  return (
    <div className="flex flex-col p-2 w-60 h-60 border-4 rounded-lg border-black bg-Azul items-center">
      <div className="flex w-full">
        <button onClick={() => addToCart(producto)}>
          <FaShoppingCart className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
          <span className="text-sm"></span>
        </button>

        <button className="ml-auto" onClick={() => addToFavorites(producto)}>
          <FaRegStar className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
          <span className="text-sm"></span>
        </button>
      </div>

      <div className="p-2 w-full h-full">
        <img className="w-full h-full" src={remera_referencia} alt="" />
      </div>

      <div>
        <p>Precio: ${producto.precio}</p>
        <p>{producto.nombre}</p>
      </div>
    </div>
  );
}

export default RemeraCatalogo;