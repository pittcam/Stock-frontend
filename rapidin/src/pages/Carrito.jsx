import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { carrito, agregarProducto } = useCarrito();
  const navigate = useNavigate();

  const handleCambiarCantidad = (producto) => {
    const nuevaCantidad = prompt(`Nueva cantidad para ${producto.nombre}:`, producto.cantidad);
    if (nuevaCantidad && !isNaN(nuevaCantidad)) {
      agregarProducto(producto, parseInt(nuevaCantidad) - producto.cantidad);
    }
  };

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <Rouuter>
    <Navbar />
    <div>
      <h2 className="text-2xl font-bold mb-4">🛒 Tu Carrito</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          <ul className="space-y-3">
            {carrito.map((item) => (
              <li key={item.id} className="border p-3 rounded shadow flex justify-between">
                <div>
                  <strong>{item.nombre}</strong> — ${item.precio} x {item.cantidad}
                </div>
                <button
                  onClick={() => handleCambiarCantidad(item)}
                  className="text-sm bg-yellow-400 px-2 py-1 rounded"
                >
                  Cambiar Cantidad
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-xl font-semibold">
            Total: ${total.toFixed(2)}
          </div>

          <button
            onClick={() => navigate("/pago")}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
    </Rouuter>
  );
}