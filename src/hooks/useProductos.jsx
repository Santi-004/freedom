// src/hooks/useProductos.js
import { useState, useEffect } from "react";
import { db } from "../config/firebase"; 
import {collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot} from "firebase/firestore";

export const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Traer productos en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "productos"), (snapshot) => {
      const productosData = snapshot.docs.map((doc) => ({ //Convierte los documentos en objetos
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData);
      setLoading(false);
    });

    return () => unsubscribe(); // limpiar el listener
  }, []);

  // Agregar producto
  const agregarProducto = async (nuevoProducto) => {
    try {
      await addDoc(collection(db, "productos"), nuevoProducto);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  // Editar producto
  const editarProducto = async (id, datosActualizados) => {
    try {
      const productoRef = doc(db, "productos", id);
      await updateDoc(productoRef, datosActualizados);
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  };

  return { productos, loading, agregarProducto, eliminarProducto, editarProducto,};
};
