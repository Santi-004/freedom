// src/components/ListaUsuarios.jsx
import React, { useState } from "react";
import { useUsuarios } from "../hooks/useUsuarios";

// tipo: "admins" | "clientes"
const ListaUsuarios = ({ tipo, searchTerm = "", sort = "none" }) => {
  const { usuarios, loading, eliminarUsuario, editarUsuario } = useUsuarios();

  const [usuarioEditando, setUsuarioEditando] = useState(null); // id del usuario
  const [rolSeleccionado, setRolSeleccionado] = useState("cliente");

  if (loading) return <p>Cargando usuarios...</p>;

  const admins = usuarios.filter((u) => (u.rol ?? "cliente").toString().trim().toLowerCase() === "admin");
  const clientes = usuarios.filter((u) => (u.rol ?? "cliente").toString().trim().toLowerCase() !== "admin");

  let listaBase = tipo === "admins" ? admins : clientes;

  // Filtro por búsqueda (nombre o email)
  const term = searchTerm.toString().trim().toLowerCase();
  let lista = listaBase.filter((u) => {
    if (!term) return true;
    const nombre = (u.nombre ?? "").toString().toLowerCase();
    const email = (u.email ?? "").toString().toLowerCase();
    return nombre.includes(term) || email.includes(term);
  });

  const compareText = (a = "", b = "") => a.localeCompare(b, "es", { sensitivity: "base" });

  // Solo aplicamos orden alfabético aquí (name-asc / name-desc)
  lista = [...lista].sort((a, b) => {
    switch (sort) {
      case "name-asc":
        return compareText(a.nombre ?? a.email, b.nombre ?? b.email);
      case "name-desc":
        return compareText(b.nombre ?? b.email, a.nombre ?? a.email);
      default:
        return 0;
    }
  });
  const titulo = tipo === "admins" ? "Administradores" : "Clientes";

  const handleEditClick = (user) => {
    setUsuarioEditando(user.id);
    setRolSeleccionado((user.rol ?? "cliente").toString().trim().toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioEditando) return;

    await editarUsuario(usuarioEditando, { rol: rolSeleccionado });
    setUsuarioEditando(null);
  };

  return (
    <div className="w-full h-full p-4">
      <h2 className="text-2xl font-bold mb-4">{titulo}</h2>
      {lista.length === 0 ? (
        <p>No hay usuarios en esta categoría</p>
      ) : (
        <div className="overflow-x-auto w-full h-full">
          <table className="table-auto border-collapse border-2 border-AzulClaro w-full h-full">
            <thead>
              <tr className="bg-Azul">
                <th className="border-2 border-AzulCeleste px-4 py-2">Nombre</th>
                <th className="border-2 border-AzulCeleste px-4 py-2">Email</th>
                <th className="border-2 border-AzulCeleste px-4 py-2">Rol</th>
                <th className="border-2 border-AzulCeleste px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((user) => (
                <tr key={user.id}>
                  <td className="border-2 border-AzulCeleste px-4 py-2 max-w-[200px] break-words whitespace-normal">{user.nombre ?? "-"}</td>
                  <td className="border-2 border-AzulCeleste px-4 py-2 max-w-[300px] break-words whitespace-normal">{user.email ?? "-"}</td>
                  <td className="border-2 border-AzulCeleste px-4 py-2">{(user.rol ?? "cliente").toString().trim().toLowerCase()}</td>
                  <td className="border-2 border-AzulCeleste px-4 py-2">
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                    >
                      Modificar rol
                    </button>
                    <button
                      onClick={() => eliminarUsuario(user.id)}
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

      {/* Popup Modificar Rol */}
      {usuarioEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-AzulClaro p-6 rounded-lg border-4 border-Azul shadow-lg max-w-[500px] w-full relative overflow-y-auto">
            <div className="flex justify-center">
              <h2 className="text-lg font-bold mb-4">Modificar rol de usuario</h2>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center">
              <div className="w-full max-w-[320px] mb-4 rounded-lg p-4 border-4 border-Azul">
                <div className="mb-2">
                  <label className="font-semibold">Rol:</label>
                </div>
                <div className="flex gap-2">
                  {/* Botón Admin */}
                  <button
                    type="button"
                    onClick={() => setRolSeleccionado("admin")}
                    className={`flex-1 font-bold py-2 px-4 rounded-full border-4 
                      ${rolSeleccionado === "admin"
                        ? "bg-Azul text-white border-AzulClaro"
                        : "bg-AzulClaro text-black border-Azul"}
                      hover:scale-105 transition-transform duration-300 ease-in-out`}
                  >
                    Admin
                  </button>

                  {/* Botón Cliente */}
                  <button
                    type="button"
                    onClick={() => setRolSeleccionado("cliente")}
                    className={`flex-1 font-bold py-2 px-4 rounded-full border-4 
                      ${rolSeleccionado === "cliente"
                        ? "bg-Azul text-white border-AzulClaro"
                        : "bg-AzulClaro text-black border-Azul"}
                      hover:scale-105 transition-transform duration-300 ease-in-out`}
                  >
                    Cliente
                  </button>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-2 w-full max-w-[400px]">
                <button
                  type="button"
                  onClick={() => setUsuarioEditando(null)}
                  className="bg-gray-500 border-AzulClaro border-4 hover:bg-gray-600 hover:border-Azul hover:border-4 
                             font-bold py-2 px-4 rounded-full w-full 
                             hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-Azul border-AzulClaro border-4 hover:bg-AzulCeleste hover:border-Azul hover:border-4 
                             font-bold py-2 px-4 rounded-full w-full 
                             hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaUsuarios;
