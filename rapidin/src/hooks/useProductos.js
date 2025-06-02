import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';

// PROGRAMACIÓN FUNCIONAL: Hook personalizado que encapsula toda la lógica relacionada con productos
// siguiendo el principio de separación de responsabilidades (SRP)
export function useProductos(initialSearchTerm = '') {
  // PROGRAMACIÓN REACTIVA: Estados que activarán re-renderizaciones cuando cambien
  const [allProductos, setAllProductos] = useState([]);  // Almacena todos los productos sin filtrar
  const [productos, setProductos] = useState([]);        // Almacena productos filtrados (vista actual)
  const [isLoading, setIsLoading] = useState(true);      // Estado de carga para actualizaciones reactivas de UI
  const [error, setError] = useState(null);              // Manejo de errores reactivos
  
  // PROGRAMACIÓN REACTIVA: useEffect como suscripción que se ejecuta al montar el componente
  // Actúa como un "observable" que inicia el flujo de datos
  useEffect(() => {
    // PROGRAMACIÓN FUNCIONAL: Función asíncrona pura que no tiene efectos secundarios más allá de las llamadas a setters
    const fetchAllProductos = async () => {
      setIsLoading(true);
      try {
        // PROGRAMACIÓN REACTIVA: Llamada asíncrona que alimentará el flujo de datos reactivo
        const response = await axios.get('http://localhost:5000/productos');
        
        // PROGRAMACIÓN FUNCIONAL: Transformación inmutable de datos usando map
        // en lugar de modificar cada objeto del array original
        const productosConImagenesCorrectas = response.data.map(producto => {
          if (!producto.imagen) return producto;
          
          // PROGRAMACIÓN FUNCIONAL: Expresión condicional declarativa
          if (producto.imagen.startsWith('imagenes/')) {
            // PROGRAMACIÓN FUNCIONAL: Crea un nuevo objeto con spread operator manteniendo inmutabilidad
            return {
              ...producto,
              imagen: `http://localhost:5000/${producto.imagen}`
            };
          }
          
          return producto;
        });
        
        console.log("Productos con imágenes corregidas:", productosConImagenesCorrectas);
        // PROGRAMACIÓN REACTIVA: Actualiza el estado, desencadenando actualizaciones en UI
        setAllProductos(productosConImagenesCorrectas);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        // PROGRAMACIÓN REACTIVA: El error se propaga a través del estado, provocando UI reactiva
        setError("Error al cargar productos. Por favor, intenta de nuevo.");
      } finally {
        // PROGRAMACIÓN REACTIVA: Finaliza el estado de carga, provocando cambios en UI
        setIsLoading(false);
      }
    };

    fetchAllProductos();
  }, []); // PROGRAMACIÓN REACTIVA: Dependencias vacías indican ejecución única al montar
  
  // PROGRAMACIÓN FUNCIONAL: useCallback memoriza la función evitando recreaciones innecesarias
  // PROGRAMACIÓN REACTIVA: La función se recreará reactivamente cuando allProductos cambie
  const buscarProductos = useCallback((term) => {
    // PROGRAMACIÓN FUNCIONAL: Lógica condicional declarativa
    if (!term || term.trim() === '') {
      setProductos(allProductos);
      return;
    }
    
    const termLower = term.toLowerCase();
    // PROGRAMACIÓN FUNCIONAL: Uso de filter como función de orden superior que crea un nuevo array
    // en lugar de modificar el existente, siguiendo el paradigma de inmutabilidad
    const filtered = allProductos.filter(producto => 
      // PROGRAMACIÓN FUNCIONAL: Expresión lógica declarativa en lugar de if/else
      (producto.nombre && producto.nombre.toLowerCase().includes(termLower)) || 
      (producto.descripcion && producto.descripcion.toLowerCase().includes(termLower))
    );
    
    // PROGRAMACIÓN REACTIVA: La actualización de estado desencadenará cambios en la UI
    setProductos(filtered);
  }, [allProductos]);
  
  // PROGRAMACIÓN REACTIVA: Efecto que reacciona a cambios en dependencias establecidas
  // y actúa como una suscripción al flujo de datos
  useEffect(() => {
    // PROGRAMACIÓN FUNCIONAL: Evaluación condicional declarativa
    if (allProductos.length > 0) {
      buscarProductos(initialSearchTerm);
    }
  }, [initialSearchTerm, allProductos, buscarProductos]); // PROGRAMACIÓN REACTIVA: Lista de dependencias
  
  // PROGRAMACIÓN FUNCIONAL: Retorna un objeto inmutable con los valores y funciones necesarias
  // Patrón de revelación de módulo que expone solo lo necesario
  return { 
    productos,           // PROGRAMACIÓN REACTIVA: Estado actual de productos filtrados 
    isLoading,           // PROGRAMACIÓN REACTIVA: Estado de carga para UI reactiva
    error,               // PROGRAMACIÓN REACTIVA: Manejo de errores reactivo
    buscarProductos,     // PROGRAMACIÓN FUNCIONAL: Función para filtrar productos
    totalProductos: allProductos.length  // PROGRAMACIÓN FUNCIONAL: Valor derivado calculado
  };
}
