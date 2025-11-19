import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AltaProducto from "../components/AltaProducto";
import ListaProductos from "../components/ListaProductos";

const ABM = () => {
  const [prod, setProd] = useState(false);

  return (
    <div className="bg-AzulClaro">
      <Header />
      
        {/* Div con toda la page de ABM. */}
        <div className="flex ">
          <div className="flex w-full min-h-[87vh]">

            {/* Div que contiene el menu de las colecciones. */}
              <div className="w-[400px] h-auto p-4 bg-Azul flex flex-col items-center justify-center">
              <div className="w-full p-2"><button  className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Empleados</button></div>
              <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Clientes</button></div>
              <div className="w-full p-2"><button onClick={() => setProd(true)} className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Productos</button></div>
              <div className="w-full p-2"><button className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Categorias</button></div>
            </div>
            <div className="flex flex-col items-center mx-auto w-auto m-10">
                
                {prod && (
                  <div>
                    <div className="flex justify-center"><AltaProducto /></div>
                    <div><ListaProductos /></div>
                  </div>
                )}

            </div>
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default ABM;