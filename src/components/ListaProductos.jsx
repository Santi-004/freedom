// src/components/ListaProductos.jsx
import React, { useState } from "react";
import { useProductos } from "../hooks/useProductos";

const ListaProductos = () => {
  const { productos, loading, eliminarProducto, editarProducto } = useProductos();
  const [productoEditando, setProductoEditando] = useState(null);
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

  if (loading) return <p>Cargando productos...</p>;

  const handleEditClick = (prod) => {
    setProductoEditando(prod.id);
    setNombre(prod.nombre);
    setDescripcion(prod.descripcion);
    setPrecio(prod.precio);
    setStock(prod.stock);
    setImagenCard(prod.imagenCard ?? "");
    setSlide1(prod.slide1 ?? "");
    setSlide2(prod.slide2 ?? "");
    setSlide3(prod.slide3 ?? "");
    setSlide4(prod.slide4 ?? "");
    setSlide5(prod.slide5 ?? "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio || !stock) {
      alert("Todos los campos son obligatorios");
      return;
    }

    await editarProducto(productoEditando, {
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

    // cerrar modal
    setProductoEditando(null);
  };

{/* Tabla de productos */}
  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>

      {productos.length === 0 ? (
        <p>No hay productos registrados</p>
      ) : (
        <div className="overflow-x-auto w-full h-full">
          <table className="table-auto border-collapse border border-gray-300 w-full h-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Nombre</th>
                <th className="border border-gray-300 px-4 py-2">Descripción</th>
                <th className="border border-gray-300 px-4 py-2">Precio</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.id}>
                  <td className="border border-gray-300 px-4 py-2">{prod.nombre}</td>
                  <td className="border border-gray-300 px-4 py-2">{prod.descripcion}</td>
                  <td className="border border-gray-300 px-4 py-2">${prod.precio}</td>
                  <td className="border border-gray-300 px-4 py-2">{prod.stock}</td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(prod)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded"
                    >
                      Modificar
                    </button>

                    <button
                      onClick={() => eliminarProducto(prod.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Popup Boton Editar*/}
      {productoEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Popup */}
          <div className="bg-AzulClaro p-6 rounded-lg border-4 border-Azul shadow-lg max-w-md w-full relative max-h-[90vh] overflow-y-auto">

            {/* Titulo */}
            <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
            
            {/* Formulario */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="font-medium">Nombre:</label>
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

              {/* Modificación de imagenes */}
              <div className="mb-3">
                <label className="block font-medium">Imagen de tarjeta (URL):</label>
                <input
                  type="url"
                  value={imagenCard}
                  onChange={(e) => setImagenCard(e.target.value)}
                  className="border-4 border-Azul rounded-lg p-2 w-full bg-white"
                />
              </div>
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
                {/* Boton Cancelar */}
                <div className="flex gap-2 justify-end">
                <button
                type="button"
                onClick={() => setProductoEditando(null)}
                className="bg-gray-500 hover:bg-gray-600 hover:border-Azul hover:border-4 
                max-w-[400px] font-bold py-2 px-4 rounded-full w-full 
                hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                Cancelar
                </button>

                {/* Boton Guardar Cambios */}
                <button
                type="submit"
                className="bg-Azul hover:bg-AzulCeleste hover:border-Azul hover:border-4 
                max-w-[400px] font-bold py-2 px-4 rounded-full w-full 
                hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaProductos;
