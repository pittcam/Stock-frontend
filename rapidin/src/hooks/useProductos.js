import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

export function useProductos(initialSearchTerm = '') {
  const [allProductos, setAllProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Cargar todos los productos una sola vez
  useEffect(() => {
    const fetchAllProductos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/productos');
        
        // Modificar las URLs de las imágenes para apuntar correctamente al backend
        const productosConImagenesCorrectas = response.data.map(producto => {
          if (!producto.imagen) return producto;
          
          // Si la ruta comienza con "imagenes/" pero sin la / inicial
          if (producto.imagen.startsWith('imagenes/')) {
            return {
              ...producto,
              imagen: `http://localhost:5000/${producto.imagen}`
            };
          }
          
          return producto;
        });
        
        console.log("Productos con imágenes corregidas:", productosConImagenesCorrectas);
        setAllProductos(productosConImagenesCorrectas);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar productos. Por favor, intenta de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProductos();
  }, []);
  
  // Función para buscar productos (filtrando en el cliente)
  const buscarProductos = useCallback((term) => {
    if (!term || term.trim() === '') {
      setProductos(allProductos);
      return;
    }
    
    const termLower = term.toLowerCase();
    const filtered = allProductos.filter(producto => 
      (producto.nombre && producto.nombre.toLowerCase().includes(termLower)) || 
      (producto.descripcion && producto.descripcion.toLowerCase().includes(termLower))
    );
    
    setProductos(filtered);
  }, [allProductos]);
  
  // Realizar la búsqueda inicial cuando se cargan los datos
  useEffect(() => {
    if (allProductos.length > 0) {
      buscarProductos(initialSearchTerm);
    }
  }, [initialSearchTerm, allProductos, buscarProductos]);
  
  return { 
    productos, 
    isLoading, 
    error, 
    buscarProductos,
    totalProductos: allProductos.length 
  };
}
