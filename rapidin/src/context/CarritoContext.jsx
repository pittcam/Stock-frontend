import { createContext, useContext, useState } from "react";

// PROGRAMACIÓN REACTIVA: Creación de un contexto que actúa como un "observable" para propagar cambios de estado
// a través del árbol de componentes de manera reactiva
const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
  // PROGRAMACIÓN REACTIVA: Uso de useState para crear un estado reactivo que provocará
  // re-renderizaciones automáticas cuando cambie
  const [carrito, setCarrito] = useState([]);

  // PROGRAMACIÓN FUNCIONAL: Función pura que no modifica directamente el estado
  // sino que genera un nuevo estado basado en el anterior
  const agregarProducto = (producto, cantidad) => {
    // PROGRAMACIÓN REACTIVA: Actualización del estado usando una función de actualización
    // que reacciona al estado anterior (prev)
    setCarrito((prev) => {
      // PROGRAMACIÓN FUNCIONAL: Uso de métodos de orden superior (find) 
      // para buscar elementos sin bucles imperativos
      const existente = prev.find((item) => item.id === producto.id);
      
      if (existente) {
        // PROGRAMACIÓN FUNCIONAL: Transformación inmutable con map que crea un nuevo array
        // en lugar de mutar el existente, aplicando una transformación a cada elemento
        return prev.map((item) =>
          // PROGRAMACIÓN FUNCIONAL: Expresión condicional declarativa en lugar de uso de if/else imperativo
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad } // PROGRAMACIÓN FUNCIONAL: Crea objeto nuevo con spread operator (inmutabilidad)
            : item // Retorna el item sin cambios si no coincide
        );
      }
      // PROGRAMACIÓN FUNCIONAL: Crea un nuevo array usando spread operator, manteniendo inmutabilidad
      // en lugar de modificar el array original con push()
      return [...prev, { ...producto, cantidad }];
    });
  };

  // PROGRAMACIÓN FUNCIONAL: Función pura que simplemente establece el estado a un valor constante
  // sin efectos secundarios más allá de la actualización de estado
  const limpiarCarrito = () => setCarrito([]);

  // PROGRAMACIÓN REACTIVA: El Provider propaga el estado y las funciones reactivamente
  // a todos los componentes que consumen el contexto
  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, limpiarCarrito }}>
      {/* PROGRAMACIÓN REACTIVA: Los children se renderizan dentro del contexto, 
          permitiendo acceso reactivo al estado desde cualquier nivel */}
      {children}
    </CarritoContext.Provider>
  );
};

// PROGRAMACIÓN FUNCIONAL: Hook personalizado que encapsula la lógica de acceder al contexto
// siguiendo el principio de composición de funciones
// PROGRAMACIÓN REACTIVA: Permite a los componentes suscribirse a los cambios en el estado del carrito
export const useCarrito = () => useContext(CarritoContext);