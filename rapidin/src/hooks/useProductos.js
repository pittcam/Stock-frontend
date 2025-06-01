import { useState, useEffect, useCallback } from 'react';
import { fetchProductos } from '../services/productoService';

export function useProductos(initialSearchTerm = '') {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Función para buscar productos (puede usar API o filtrar localmente)
  const buscarProductos = useCallback(async (searchTerm = '') => {
    try {
      setIsLoading(true);
      
      // Hacer la solicitud al backend incluyendo el término de búsqueda
      const data = await fetchProductos(searchTerm);
      
      if (data && Array.isArray(data)) {
        setProductos(data);
      } else {
        setProductos([]);
        if (!data) setError("No se pudieron obtener los productos");
      }
    } catch (err) {
      console.error('Error al buscar productos:', err);
      setError('Error al cargar los productos. Por favor, intenta de nuevo más tarde.');
      setProductos([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Efecto inicial para cargar los productos
  useEffect(() => {
    buscarProductos(initialSearchTerm);
  }, [initialSearchTerm, buscarProductos]);

  return { productos, isLoading, error, buscarProductos };
}
