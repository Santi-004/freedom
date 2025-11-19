import { useState } from "react";
import { useProductos } from "../hooks/useProductos";

{/* Componente que deja agrega un producto */}
export default function AltaProducto() {
  const { agregarProducto } = useProductos();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagenCard, setImagenCard] = useState("");
  const [slide1, setSlide1] = useState("");
  const [slide2, setSlide2] = useState("");
  const [slide3, setSlide3] = useState("");
  const [slide4, setSlide4] = useState("");
  const [slide5, setSlide5] = useState("");
  const [formProducto, setFormProducto] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Alerta
    if (!nombre || !descripcion || !precio || !stock) {
      alert("Todos los campos son obligatorios");
      return;
    }

    {/* Acá agregamos el producto */}
    await agregarProducto({
      nombre,
      descripcion,
      precio: Number(precio),
      stock: Number(stock),
      imagenCard: imagenCard || null,
      slide1: slide1 || null,
      slide2: slide2 || null,
      slide3: slide3 || null,
      slide4: slide4 || null,
      slide5: slide5 || null,
    });

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setStock("");
    setImagenCard("");
    setSlide1("");
    setSlide2("");
    setSlide3("");
    setSlide4("");
    setSlide5("");
    setFormProducto(false); // cerrar popup
  };

  return (
    <div>
      <button
        onClick={() => setFormProducto(true)}
        className="bg-Azul border-Azul border-4 hover:bg-AzulCeleste hover:border-Azul hover:border-4 
                   max-w-[400px] font-bold hover:text-white py-2 px-4 rounded-full w-full 
                   hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        Agregar Producto
      </button>

      {formProducto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Popup */}
          <div className="bg-AzulClaro p-6 rounded-lg border-4 border-Azul shadow-lg max-w-[800px] w-full relative">
            <button
              onClick={() => setFormProducto(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 font-bold"
            >
              ✖
            </button>

            <div className="flex justify-center"><h2 className="text-lg font-bold mb-4">Agregar Producto</h2></div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="flex justify-center gap-8 w-full max-w-[700px]">
                <div className="w-full max-w-[320px]">
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
                </div>

                <div className="w-full max-w-[320px]">
                 {/* Imagen card catálogo */}
                 <div className="mb-3">
                   <label className="block font-medium">Imagen de tarjeta (URL):</label>
                   <input
                     type="url"
                     value={imagenCard}
                     onChange={(e) => setImagenCard(e.target.value)}
                     placeholder="https://..."
                     className="border-4 border-Azul rounded-lg p-2 w-full bg-white"
                   />
                 </div>

                 {/* Slides de producto */}
                 <div className="mb-2 font-semibold">Imágenes del producto (Slides 1 a 5, URLs):</div>
                 <div className="mb-2">
                   <input type="url" placeholder="Slide 1"
                     value={slide1} onChange={(e) => setSlide1(e.target.value)}
                     className="border-4 border-Azul rounded-lg p-2 w-full bg-white" />
                 </div>
                 <div className="mb-2">
                   <input type="url" placeholder="Slide 2"
                     value={slide2} onChange={(e) => setSlide2(e.target.value)}
                     className="border-4 border-Azul rounded-lg p-2 w-full bg-white" />
                 </div>
                 <div className="mb-2">
                   <input type="url" placeholder="Slide 3"
                     value={slide3} onChange={(e) => setSlide3(e.target.value)}
                     className="border-4 border-Azul rounded-lg p-2 w-full bg-white" />
                 </div>
                 <div className="mb-2">
                   <input type="url" placeholder="Slide 4"
                     value={slide4} onChange={(e) => setSlide4(e.target.value)}
                     className="border-4 border-Azul rounded-lg p-2 w-full bg-white" />
                 </div>
                 <div className="mb-4">
                   <input type="url" placeholder="Slide 5"
                     value={slide5} onChange={(e) => setSlide5(e.target.value)}
                     className="border-4 border-Azul rounded-lg p-2 w-full bg-white" />
                 </div>
                </div>
              </div>
              <div className="flex justify-center mt-4 w-full">
                <button
                  onClick={() => setFormProducto(true)}
                  className="bg-Azul border-Azul border-4 hover:bg-AzulCeleste hover:border-Azul hover:border-4 
                            font-bold hover:text-white py-2 px-4 rounded-full w-full max-w-[320px]
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
