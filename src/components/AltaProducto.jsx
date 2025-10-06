import { useState } from "react";
import { useProductos } from "../hooks/useProductos";

export default function AltaProducto() {
  const { agregarProducto } = useProductos();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [formProducto, setFormProducto] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Alertas
    if (!nombre || !descripcion || !precio || !stock) {
      alert("Todos los campos son obligatorios");
      return;
    }

    await agregarProducto({
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
    });

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setFormProducto(false); // cerrar popup
  };

  return (
    <div>
      <button
        onClick={() => setFormProducto(true)}
        className="bg-Azul hover:bg-AzulCeleste hover:border-Azul hover:border-4 
                   max-w-[400px] font-bold py-2 px-4 rounded-full w-full 
                   hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Agregar Producto
      </button>

      {formProducto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Popup */}
          <div className="bg-AzulClaro p-6 rounded-lg border-4 border-Azul shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setFormProducto(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 font-bold"
            >
              ✖
            </button>

            <h2 className="text-lg font-bold mb-4">Agregar Producto</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="font-medium ">Nombre:</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="border-4 border-Azul rounded-lg p-2 w-full bg-white"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium">Descripción:</label>
                <input
                  type="text"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="border-4 border-Azul rounded-lg p-2 w-full bg-white"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium">Precio:</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="border-4 border-Azul rounded-lg p-2 w-full bg-white"
                />
              </div>

              <div className="mb-3">
                <label className="block font-medium">Stock:</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="border-4 border-Azul rounded-lg p-2 w-full bg-white"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                type="submit"
                className="bg-Azul hover:bg-AzulCeleste hover:border-Azul hover:border-4 
                   max-w-[400px] font-bold py-2 px-4 rounded-full w-full 
                   hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
