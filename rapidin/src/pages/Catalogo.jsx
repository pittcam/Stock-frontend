import { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useProductos } from '../hooks/useProductos';
import '../style/catalog.css';

export default function Catalogo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Obtenemos el parámetro de búsqueda de la URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  // Usar el hook con el término de búsqueda
  const { productos, isLoading, error, buscarProductos } = useProductos(searchTerm);
  const { agregarProducto, carrito } = useCarrito();

  // Cuando cambia el término de búsqueda, actualizar productos
  useEffect(() => {
    buscarProductos(searchTerm);
  }, [searchTerm, buscarProductos]);

  // Función para agregar directamente al carrito
  const handleAgregarAlCarrito = (producto) => {
    agregarProducto(producto, 1); // Agregar 1 unidad directamente
  };

  // Manejo del cambio en la búsqueda local
  const handleSearchChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    
    // Actualizar la URL para reflejar la búsqueda
    const searchParams = new URLSearchParams(location.search);
    if (newTerm) {
      searchParams.set('search', newTerm);
    } else {
      searchParams.delete('search');
    }
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-center">Catálogo de Productos</h2>
        
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    <img src={p.imagen} alt={p.nombre} />
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

      <button 
        onClick={() => navigate("/carrito")}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center"
      >
        🛒 
        {carrito.length > 0 && (
          <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {carrito.length}
          </span>
        )}
      </button>
    </>
  );
}