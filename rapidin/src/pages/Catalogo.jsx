import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useProductos } from '../hooks/useProductos';
import CantidadModal from '../components/CantidadModal';

export default function Catalogo() {
  const { productos, isLoading, error } = useProductos();
  const { agregarProducto, carrito } = useCarrito();
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openCantidadModal = (producto) => {
    setSelectedProduct(producto);
  };

  const handleConfirmCantidad = (cantidad) => {
    if (selectedProduct) {
      agregarProducto(selectedProduct, cantidad);
      setSelectedProduct(null);
    }
  };

  // Filter products based on search term
  const filteredProducts = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productosDisponibles = productos.filter(p => p.stock > 0);
  const totalProductos = productos.reduce((total, p) => total + p.stock, 0);

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Catálogo de Productos</h2>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {isLoading && <p className="text-center">Cargando productos...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!isLoading && !error && productos.length === 0 && (
        <p className="text-center">No hay productos disponibles</p>
      )}

      {!isLoading && productos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow-md bg-white hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800">{p.nombre}</h3>
              <p className="text-gray-700 font-bold text-xl mt-2">${p.precio}</p>
              <p className="text-gray-700 mt-1">Stock: {p.stock}</p>
              <button
                onClick={() => agregarProducto(p, 1)}
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                disabled={p.stock <= 0}
              >
                {p.stock > 0 ? "Agregar al carrito" : "Sin stock"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Cart button - position it where appropriate in your UI */}
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

    {selectedProduct && (
      <CantidadModal 
        producto={selectedProduct}
        onConfirm={handleConfirmCantidad}
        onCancel={() => setSelectedProduct(null)}
      />
    )}
    </>
  );
}