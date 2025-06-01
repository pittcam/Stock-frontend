import { useState, useEffect } from 'react';
import { obtenerProductos } from "../api/producto";

export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, isLoading, error };
}
