import { useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

function ButtonDrop({textoMostrar , textoCerrar, contenido}){
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="w-full p-10 pb-5 pt-0">
      <button
        onClick={() => setMostrar(!mostrar)}
        className="border text-white text-xl bg-Azul hover:bg-AzulCeleste justify-end font-bold py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <div className="relative w-full text-center">
            {mostrar ? textoCerrar : textoMostrar}
            <IoIosArrowUp className={`absolute right-4 top-1/2 -translate-y-1/2 ${mostrar ? 'block' : 'hidden'}`} />
            <IoIosArrowDown className={`absolute right-4 top-1/2 -translate-y-1/2 ${mostrar ? 'hidden' : 'block'}`} />
        </div>


      </button>

      {mostrar && (
        <div className="m-1 w-full bg-Azul flex-col items-center dropdownmenuanimacion">
          <div className="max-w-[700px] pl-10 pr-10">
            {contenido}
          </div>
        </div>
      )}
    </div>
  );
}

export default ButtonDrop;
