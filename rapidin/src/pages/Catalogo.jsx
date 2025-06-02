import { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import '../style/catalog.css';

export default function Catalogo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [allProductos, setAllProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarProducto } = useCarrito();

  // Cargar todos los productos una sola vez
  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/productos");
        console.log("Datos de productos:", response.data); // Para inspeccionar los datos
        setAllProductos(response.data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("Error al cargar productos. Por favor, intenta de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  // Extraer el término de búsqueda de la URL y actualizar estado
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search') || '';
    setSearchTerm(searchParam);
  }, [location.search]);

  // Filtrar productos basado en término de búsqueda
  useEffect(() => {
    if (!allProductos.length) return;
    
    if (!searchTerm) {
      setProductos(allProductos);
      return;
    }
    
    const termLower = searchTerm.toLowerCase();
    const filtered = allProductos.filter(producto => 
      (producto.nombre && producto.nombre.toLowerCase().includes(termLower)) || 
      (producto.descripcion && producto.descripcion.toLowerCase().includes(termLower))
    );
    
    setProductos(filtered);
  }, [searchTerm, allProductos]);

  // Función para manejar cambios en el input de búsqueda
  const handleSearchChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    
    // Actualizar la URL con el nuevo término
    const searchParams = new URLSearchParams(location.search);
    if (newTerm) {
      searchParams.set('search', newTerm);
    } else {
      searchParams.delete('search');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  // Función para agregar al carrito
  const handleAgregarAlCarrito = (producto) => {
    agregarProducto(producto, 1);
  };

  return (
    <>
      {/* Aumentar el padding superior de py-8 a py-16 para más separación del navbar */}
      <div className="container mx-auto px-4 py-16 mt-8 min-h-screen">
        <h2 className="text-3xl font-bold mb-10 text-center">Catálogo de Productos</h2>
        
        {/* Contenedor mejorado para el buscador */}
        <div className="mb-8 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-6 py-4 text-lg border-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
          />
        </div>
        
        {isLoading && <p className="text-center">Cargando productos...</p>}
        
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!isLoading && !error && productos.length === 0 && (
          <p className="text-center">No se encontraron productos{searchTerm ? ` para "${searchTerm}"` : ""}</p>
        )}

        {!isLoading && productos.length > 0 && (
          <div className="product-grid">
            {productos.map((p) => (
              <div key={p.id} className="product-card">
                <div className="product-image">
                  {p.imagen ? (
                    <img 
                      src={p.imagen} 
                      alt={p.nombre} 
                      onError={(e) => {
                        console.log("Error cargando imagen:", p.imagen);
                        e.target.onerror = null;
                        
                        // Intentar con URL alternativa
                        if (p.imagen.includes('imagenes/')) {
                          const filename = p.imagen.split('/').pop();
                          const altUrl = `http://localhost:5000/imagenes/${filename}`;
                          console.log("Intentando con URL alternativa:", altUrl);
                          e.target.src = altUrl;
                        } else {
                          // Si todo falla, mostrar placeholder
                          e.target.style.display = 'none';
                          const placeholderDiv = document.createElement('div');
                          placeholderDiv.className = 'placeholder-image';
                          placeholderDiv.textContent = '📦';
                          e.target.parentNode.appendChild(placeholderDiv);
                        }
                      }}
                    />
                  ) : (
                    <div className="placeholder-image">📦</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{p.nombre}</h3>
                  <p className="product-description">{p.descripcion}</p>
                  <p className="product-price">${typeof p.precio === 'number' ? p.precio.toLocaleString() : p.precio}</p>
                  <p className="stock-info">Stock disponible: {p.stock}</p>
                  <button
                    onClick={() => handleAgregarAlCarrito(p)}
                    className="add-to-cart"
                    disabled={p.stock <= 0}
                  >
                    {p.stock > 0 ? "Agregar al carrito" : "Sin stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      

    </>
  );
}