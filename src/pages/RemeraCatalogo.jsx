import remera_referencia from "../assets/img/remera_referencia.jpg";
import { FaShoppingCart, FaStar} from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

function RemeraCatalogo() {
    return(
        <div className="flex flex-col p-2 w-60 h-60 border-4 rounded-lg border-black bg-Azul items-center">
  <div className="flex w-full">
    <button>
        <FaShoppingCart className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out" />
        <span className="text-sm"></span>
    </button>

    <button className="ml-auto">
        <FaRegStar className="h-6 w-auto text-white m-2 animacion-escala transition-transform duration-300 ease-in-out"/>

        <span className="text-sm"></span>
    </button>
  </div>

  <div className="p-2 w-full h-full">
    <img className="w-full h-full" src={remera_referencia} alt="" />
  </div>

  <div>
    <p>Precio</p>
    <p>NOMBRE</p>
  </div>
</div>

    );
}

export default RemeraCatalogo;