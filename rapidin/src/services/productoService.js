import { API_URL } from '../config';

// Función para obtener todos los productos con búsqueda opcional
export async function fetchProductos(searchTerm = '') {
  try {
    let url = `${API_URL}/productos`;
    
    // Si hay un término de búsqueda, añadirlo como parámetro
    if (searchTerm) {
      url += `?q=${encodeURIComponent(searchTerm)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
}

// Función para obtener un producto específico
export async function fetchProducto(id) {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching producto ${id}:`, error);
    throw error;
  }
}