import { useState, useEffect } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { obtenerProductos } from "../api/producto";
import { from, of } from 'rxjs';

// PROGRAMACIÓN REACTIVA: Creación de un BehaviorSubject que actúa como flujo de datos (stream)
// para las búsquedas. A diferencia de Subject, BehaviorSubject mantiene el último valor emitido
// y lo proporciona a los nuevos suscriptores. El valor inicial es una cadena vacía.
export const searchQuery$ = new BehaviorSubject('');

// PROGRAMACIÓN REACTIVA: Hook personalizado que implementa un flujo reactivo completo
// usando RxJS integrado con el sistema de hooks de React
export function useReactiveProductos() {
  // PROGRAMACIÓN REACTIVA: Estados de React que reaccionarán a las emisiones del stream
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // PROGRAMACIÓN REACTIVA: useEffect implementa la suscripción al flujo de datos
  useEffect(() => {
    // PROGRAMACIÓN REACTIVA: Configuración del pipeline de transformación del stream
    const subscription = searchQuery$.pipe(
      // PROGRAMACIÓN REACTIVA: Operador que espera hasta que el usuario deje de escribir
      // para evitar múltiples solicitudes mientras se escribe (anti-rebote)
      debounceTime(300),
      // PROGRAMACIÓN REACTIVA: switchMap cancela solicitudes anteriores si llega una nueva búsqueda
      // creando un nuevo observable para cada emisión y suscribiéndose automáticamente
      switchMap(query => {
        // PROGRAMACIÓN REACTIVA: Actualiza el estado de carga de manera reactiva
        setIsLoading(true);
        // PROGRAMACIÓN REACTIVA: Convierte la promesa de la API en un observable
        // para integrarla en el flujo reactivo
        return from(obtenerProductos(query)).pipe(
          // PROGRAMACIÓN REACTIVA: Manejo de errores en el flujo, evitando que la cadena
          // de observables se rompa incluso cuando hay errores
          catchError(err => {
            // PROGRAMACIÓN REACTIVA: Actualización del estado de error
            setError("Error al cargar productos");
            // PROGRAMACIÓN REACTIVA: Retorna un observable con array vacío para mantener el flujo
            return of([]);
          })
        );
      })
      // PROGRAMACIÓN REACTIVA: El subscribe ejecuta efectos secundarios cuando el observable emite valores
    ).subscribe(data => {
      // PROGRAMACIÓN REACTIVA: Actualización reactiva del estado con los datos recibidos
      setProductos(data);
      // PROGRAMACIÓN REACTIVA: Fin del estado de carga
      setIsLoading(false);
    });

    // PROGRAMACIÓN REACTIVA Y FUNCIONAL: Limpieza al desmontar el componente
    // evitando memory leaks y cancelando suscripciones activas
    return () => subscription.unsubscribe();
  }, []); // Dependencias vacías: se ejecuta solo al montar

  // PROGRAMACIÓN FUNCIONAL: Retorno de objeto inmutable con los estados derivados del flujo
  return { productos, isLoading, error };
}