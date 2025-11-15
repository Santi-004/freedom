import { useContext } from "react";
import { AppContext } from "../pages/Store";

import remera_referencia from "../assets/img/remera_referencia.jpg";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

function RemeraCatalogo() {
  const { addToCart, addToFavorites } = useContext(AppContext);

  const producto = {
    id: 1,
    nombre: "Remera Azul",
    descripcion: "Remera de algodón premium",
    precio: 19999,
    imagen: remera_referencia,
  };

  return (
    <div className="flex flex-col p-2 w-60 h-60 border-4 rounded-lg border-black bg-Azul items-center">
      
      <div className="flex w-full">
        {/* Botón agregar al carrito */}
        <button onClick={() => addToCart(producto)}>
          <FaShoppingCart className="h-6 w-auto text-white m-2 transition-transform duration-300" />
        </button>

        {/* Botón agregar a favoritos */}
        <button className="ml-auto" onClick={() => addToFavorites(producto)}>
          <FaRegStar className="h-6 w-auto text-white m-2 transition-transform duration-300" />
        </button>
      </div>

      <div className="p-2 w-full h-full">
        <img className="w-full h-full object-cover" src={producto.imagen} alt={producto.nombre} />
      </div>

      <div>
        <p>${producto.precio}</p>
        <p>{producto.nombre}</p>
      </div>

    </div>
  );
}

export default RemeraCatalogo;
