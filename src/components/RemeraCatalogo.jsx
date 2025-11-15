import { useContext } from "react";
import remera_referencia from "../assets/img/remera_referencia.jpg";
import { FaShoppingCart, FaStar, FaCheckCircle, FaCartPlus } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function RemeraCatalogo({ id, nombre, descripcion, precio, imagen }) {
  const { addToCart, addToFavorites, removeFromFavorites, favorites, cart } = useContext(AppContext);
  const navigate = useNavigate();

  const producto = {
    id: id ?? "remera-1",
    nombre: nombre ?? "Remera básica",
    descripcion: descripcion ?? "Remera de algodón",
    precio: precio ?? 10000,
    imagen: imagen ?? remera_referencia,
  };

  const isFavorite = favorites?.some((f) => f.id === producto.id);
  const inCart = cart?.some((i) => i.id === producto.id);

  return (
    <div
      className="flex flex-col p-2 w-60 h-70 border-4 rounded-lg border-black bg-Azul items-center cursor-pointer"
      onClick={() => navigate(`/producto/${producto.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="flex w-full">
        <button onClick={(e) => { e.stopPropagation(); if (!inCart) addToCart(producto); }}>
          {inCart ? (
            <FaCheckCircle className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
          ) : (
            <FaCartPlus className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
          )}
          <span className="text-sm"></span>
        </button>

        <button className="ml-auto" onClick={(e) => {
          e.stopPropagation();
          if (isFavorite) {
            removeFromFavorites(producto.id);
          } else {
            addToFavorites(producto);
          }
        }}>
          {isFavorite ? (
            <FaStar className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
          ) : (
            <FaRegStar className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
          )}
          <span className="text-sm"></span>
        </button>
      </div>

      <div
        className="p-2 w-full h-full"
      >
        <img className="w-full h-full" src={producto.imagen} alt="" />
      </div>

      <div>
        <p>Precio: ${producto.precio}</p>
        <p>{producto.nombre}</p>
      </div>
    </div>
  );
}

export default RemeraCatalogo;