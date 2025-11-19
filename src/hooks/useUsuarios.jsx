// src/hooks/useUsuarios.jsx
import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from "firebase/firestore";

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer usuarios en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usuariosData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setUsuarios(usuariosData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Agregar usuario (por si querés crear usuarios manualmente desde el ABM)
  const agregarUsuario = async (nuevoUsuario) => {
    try {
      await addDoc(collection(db, "users"), nuevoUsuario);
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Editar usuario (por ejemplo para cambiar rol o datos básicos)
  const editarUsuario = async (id, datosActualizados) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, datosActualizados);
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  return { usuarios, loading, agregarUsuario, eliminarUsuario, editarUsuario };
};
