import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AltaProducto from "../components/AltaProducto";
import ListaProductos from "../components/ListaProductos";
import ListaUsuarios from "../components/ListaUsuarios";

const ABM = () => {
  const [vista, setVista] = useState("productos"); // "productos" | "empleados" | "clientes"
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("none"); // "none" | "name-asc" | "name-desc" | "price-asc" | "price-desc" | "stock-asc" | "stock-desc"
  const [ordenAbierto, setOrdenAbierto] = useState(false);

  return (
    <div className="bg-AzulClaro">
      <Header />
      
        {/* Div con toda la page de ABM. */}
        <div className="flex ">
          <div className="flex w-full min-h-[87vh]">

            {/* Div que contiene el menu de las colecciones. */}
              <div className="w-[400px] h-auto p-4 bg-Azul flex flex-col items-center justify-center">
              <div className="w-full p-2"><button  onClick={() => setVista("empleados")} className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Empleados</button></div>
              <div className="w-full p-2"><button onClick={() => setVista("clientes")} className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Clientes</button></div>
              <div className="w-full p-2"><button onClick={() => setVista("productos")} className="bg-AzulClaro border-Azul border-4 hover:bg-AzulCeleste hover:border-AzulClaro hover:border-4 max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full hover:scale-105 transition-transform duration-300 ease-in-out">Productos</button></div>
            </div>

            <div className="flex flex-col items-center mx-auto w-auto m-10">
              {/* Barra de filtros y búsqueda, justo encima del contenido actual */}
              <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[900px] mb-6 gap-4 px-4">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar ..."
                  className="w-full md:max-w-[280px] bg-AzulClaro border-Azul border-4 rounded-full px-4 py-2 font-semibold placeholder:text-Azul focus:outline-none focus:ring-4 focus:ring-AzulClaro"
                />

                {/* Select custom para orden */}
                <div className="relative w-full md:max-w-[280px]">
                  <button
                    type="button"
                    onClick={() => setOrdenAbierto((prev) => !prev)}
                    className="w-full bg-AzulClaro border-Azul border-4 rounded-full px-4 py-2 text-left font-bold flex items-center justify-between hover:bg-AzulCeleste hover:border-AzulClaro hover:text-white hover:scale-105 transition-transform duration-300 ease-in-out"
                  >
                    <span>
                      {orden === "none" && "Sin orden"}
                      {orden === "name-asc" && "Nombre A - Z"}
                      {orden === "name-desc" && "Nombre Z - A"}
                      {orden === "price-asc" && "Precio menor a mayor"}
                      {orden === "price-desc" && "Precio mayor a menor"}
                      {orden === "stock-asc" && "Stock menor a mayor"}
                      {orden === "stock-desc" && "Stock mayor a menor"}
                    </span>
                    <span className="ml-2">▾</span>
                  </button>

                  {ordenAbierto && (
                    <div className="absolute z-50 mt-2 w-full bg-white border-4 border-Azul rounded-2xl shadow-lg overflow-hidden">
                      {[
                        { value: "none", label: "Sin orden" },
                        { value: "name-asc", label: "Nombre A - Z" },
                        { value: "name-desc", label: "Nombre Z - A" },
                        { value: "price-asc", label: "Precio menor a mayor" },
                        { value: "price-desc", label: "Precio mayor a menor" },
                        { value: "stock-asc", label: "Stock menor a mayor" },
                        { value: "stock-desc", label: "Stock mayor a menor" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setOrden(opt.value);
                            setOrdenAbierto(false);
                          }}
                          className={`w-full text-left px-4 py-2 font-semibold transition-colors duration-200
                            ${orden === opt.value
                              ? "bg-Azul text-white"
                              : "bg-AzulClaro text-Azul hover:bg-AzulClaro"}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

                
                {vista === "productos" && (
                  <div>
                    <div className="flex justify-center"><AltaProducto /></div>
                    <div><ListaProductos searchTerm={busqueda} sort={orden} /></div>
                  </div>
                )}

                {vista === "empleados" && (
                  <div className="w-full">
                    <ListaUsuarios tipo="admins" searchTerm={busqueda} sort={orden} />
                  </div>
                )}

                {vista === "clientes" && (
                  <div className="w-full">
                    <ListaUsuarios tipo="clientes" searchTerm={busqueda} sort={orden} />
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