import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import axios from "axios";

export default function Pago() {
  const { carrito, limpiarCarrito } = useCarrito();
  const [cliente, setCliente] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handlePagar = async () => {
    if (!cliente) {
      alert("Por favor, ingresa el nombre del cliente.");
      return;
    }

    try {
      const payload = {
        cliente,
        items: carrito.map((item) => ({
          id_producto: item.id,
          cantidad: item.cantidad,
        })),
      };

      const response = await axios.post("http://localhost:5000/registrar-venta", payload);
      setMensaje(`✅ Venta registrada: ${response.data.comprobante}`);
      limpiarCarrito();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMensaje(`❌ Error: ${error.response.data.error}`);
      } else {
        setMensaje("❌ Error al procesar el pago.");
      }
    }
  };

  return (
    <div>
    <Navbar />
      <h2 className="text-2xl font-bold mb-4">💳 Pago</h2>
      <input
        type="text"
        placeholder="Nombre del cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handlePagar}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Confirmar Pago
      </button>
      {mensaje && <p className="mt-4">{mensaje}</p>}
    </div>
  );
}