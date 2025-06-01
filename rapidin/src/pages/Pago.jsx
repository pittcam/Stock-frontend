import { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Pago() {
  const { carrito, limpiarCarrito } = useCarrito();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    cedula: "",
    tipoPago: "efectivo",
  });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [compraExitosa, setCompraExitosa] = useState(false);

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (carrito.length === 0 && !compraExitosa) {
      navigate("/catalogo");
    }
  }, [carrito, compraExitosa, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePagar = async () => {
    // Validación de campos
    if (!formData.nombreCompleto.trim()) {
      setMensaje("❌ Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!formData.cedula.trim()) {
      setMensaje("❌ Por favor, ingresa tu número de cédula.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const payload = {
        cliente: formData.nombreCompleto,
        cedula: formData.cedula,
        tipoPago: formData.tipoPago,
        items: carrito.map((item) => ({
          id_producto: item.id,
          cantidad: item.cantidad,
        })),
      };

      const response = await axios.post(
        "http://localhost:5000/registrar-venta",
        payload
      );
      setMensaje(`✅ Venta registrada exitosamente`);
      setCompraExitosa(true);
      limpiarCarrito();

      // Mostrar más información del comprobante
      setTimeout(() => {
        setMensaje((prevMensaje) => `${prevMensaje}\n\nComprobante #${Date.now().toString().slice(-6)}\nCliente: ${formData.nombreCompleto}\nCédula: ${formData.cedula}\nMétodo: ${formData.tipoPago}\n\n${response.data.comprobante}`);
      }, 500);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMensaje(`❌ Error: ${error.response.data.error}`);
      } else {
        setMensaje("❌ Error al procesar el pago. Por favor intenta de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const volverACatalogo = () => {
    navigate("/catalogo");
  };

  // Opciones de pago
  const tiposDePago = [
    { value: "efectivo", label: "Efectivo" },
    { value: "tarjeta_credito", label: "Tarjeta de Crédito" },
    { value: "tarjeta_debito", label: "Tarjeta de Débito" },
    { value: "transferencia", label: "Transferencia Bancaria" },
    { value: "nequi", label: "Nequi" },
    { value: "daviplata", label: "Daviplata" },
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        💳 Finalizar Compra
      </h2>

      {compraExitosa ? (
        <div className="text-center">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
            <p className="text-green-700 whitespace-pre-line">{mensaje}</p>
          </div>
          <button
            onClick={volverACatalogo}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
          >
            Volver al Catálogo
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre Completo:
            </label>
            <input
              type="text"
              name="nombreCompleto"
              placeholder="Ej: Juan Pérez González"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Número de Cédula:
            </label>
            <input
              type="text"
              name="cedula"
              placeholder="Ej: 1234567890"
              value={formData.cedula}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Método de Pago:
            </label>
            <select
              name="tipoPago"
              value={formData.tipoPago}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {tiposDePago.map((tipo) => (
                <option key={tipo.value} value={tipo.value}>
                  {tipo.label}
                </option>
              ))}
            </select>
          </div>

          {mensaje && (
            <div
              className={`p-3 mb-4 rounded ${
                mensaje.startsWith("❌")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {mensaje}
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={() => navigate("/carrito")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
            >
              Volver al Carrito
            </button>
            <button
              onClick={handlePagar}
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Procesando..." : "Confirmar Pago"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}