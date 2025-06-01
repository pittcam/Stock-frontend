import { useState, useEffect } from 'react';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { obtenerProductos } from "../api/producto";
import { from, of } from 'rxjs';

// Create a stream of search queries
export const searchQuery$ = new BehaviorSubject('');

// Create a stream of products
export function useReactiveProductos() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = searchQuery$.pipe(
      debounceTime(300),
      switchMap(query => {
        setIsLoading(true);
        return from(obtenerProductos(query)).pipe(
          catchError(err => {
            setError("Error al cargar productos");
            return of([]);
          })
        );
      })
    ).subscribe(data => {
      setProductos(data);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { productos, isLoading, error };
}