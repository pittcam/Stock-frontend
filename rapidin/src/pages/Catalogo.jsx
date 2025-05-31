import { useEffect, useState } from "react";
import { obtenerProductos } from "../api/producto";
import { useCarrito } from "../context/CarritoContext";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    const fetchProductos = async () => {
      setIsLoading(true);
      try {
        const data = await obtenerProductos();
        console.log("Productos obtenidos:", data); // Debug log
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleAgregar = (producto) => {
    const cantidad = prompt(`¿Cuántas unidades de ${producto.nombre}?`);
    if (cantidad && !isNaN(cantidad)) {
      agregarProducto(producto, parseInt(cantidad));
      alert("Producto agregado al carrito ✔️");
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Catálogo de Productos</h2>
      
      {isLoading && <p className="text-center">Cargando productos...</p>}
      
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!isLoading && !error && productos.length === 0 && (
        <p className="text-center">No hay productos disponibles</p>
      )}

      {!isLoading && productos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((p) => (
            <div key={p.id} className="border p-4 rounded shadow-md bg-white">
              <h3 className="font-semibold text-lg text-gray-800">{p.nombre}</h3>
              <p className="text-gray-700">Precio: ${p.precio}</p>
              <p className="text-gray-700">Stock: {p.stock}</p>
              <button
                onClick={() => handleAgregar(p)}
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
    </>
  );
}