import { useState, useEffect } from "react";
import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/pago.css"; // Asegúrate de que este archivo exista

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
  const [comprobante, setComprobante] = useState(null);

  // Función para calcular el total del carrito
  const calcularTotalCarrito = () => {
    return carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  };

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
      // Generar un ID único para la venta
      const ventaId = `VNT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Preparar items con toda la información de productos
      const itemsDetallados = carrito.map((item) => ({
        id_producto: item.id,
        nombre_producto: item.nombre,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad,
      }));

      // Usar la función local para calcular el total
      const total = calcularTotalCarrito();

      // Payload completo con toda la información
      const payload = {
        id_venta: ventaId,
        fecha: new Date().toISOString(),
        cliente: formData.nombreCompleto,
        cedula: formData.cedula,
        tipoPago: formData.tipoPago,
        items: itemsDetallados,
        total: total,
      };

      const response = await axios.post(
        "http://localhost:5000/registrar-venta",
        payload
      );

      // Guardar el comprobante
      setComprobante({
        id: ventaId,
        cliente: formData.nombreCompleto,
        cedula: formData.cedula,
        tipoPago: formData.tipoPago,
        items: itemsDetallados,
        total: total,
        mensaje: response.data.comprobante,
      });

      setMensaje(`✅ Venta registrada exitosamente`);
      setCompraExitosa(true);
      limpiarCarrito();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMensaje(`❌ Error: ${error.response.data.error}`);
      } else {
        setMensaje("❌ Error al procesar el pago. Por favor intenta de nuevo.");
        console.error(error);
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
    <div className="pago-container">
      <h2 className="pago-titulo">
        <span className="pago-icono">💳</span>
        Formulario de Pago
      </h2>

      {compraExitosa && comprobante ? (
        <div className="text-center">
          <div className="comprobante">
            <h3 className="comprobante-titulo">✅ Compra Exitosa</h3>
            <div className="comprobante-detalle">
              <p className="comprobante-item">
                <span className="comprobante-label">Comprobante:</span> {comprobante.id}
              </p>
              <p className="comprobante-item">
                <span className="comprobante-label">Cliente:</span> {comprobante.cliente}
              </p>
              <p className="comprobante-item">
                <span className="comprobante-label">Cédula:</span> {comprobante.cedula}
              </p>
              <p className="comprobante-item">
                <span className="comprobante-label">Método de pago:</span>{" "}
                {tiposDePago.find((t) => t.value === comprobante.tipoPago)?.label}
              </p>
              <div className="separador"></div>
              <p className="font-bold">Productos:</p>
              <ul className="lista-productos">
                {comprobante.items.map((item, i) => (
                  <li key={i}>
                    {item.nombre_producto} x {item.cantidad} = $
                    {item.subtotal.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="total">
                Total: ${comprobante.total.toLocaleString()}
              </p>
              <div className="separador"></div>
              <p className="mensaje-adicional">{comprobante.mensaje}</p>
            </div>
          </div>
          <button
            onClick={volverACatalogo}
            className="btn btn-primario"
          >
            Volver al Catálogo
          </button>
        </div>
      ) : (
        <>
          <div className="form-group">
            <label className="form-label">
              Nombre Completo:
            </label>
            <input
              type="text"
              name="nombreCompleto"
              placeholder="Ej: Juan Pérez González"
              value={formData.nombreCompleto}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Número de Cédula:
            </label>
            <input
              type="text"
              name="cedula"
              placeholder="Ej: 1234567890"
              value={formData.cedula}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Método de Pago:
            </label>
            <select
              name="tipoPago"
              value={formData.tipoPago}
              onChange={handleInputChange}
              className="form-select"
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
              className={`mensaje ${
                mensaje.startsWith("❌")
                  ? "mensaje-error"
                  : "mensaje-exito"
              }`}
            >
              {mensaje}
            </div>
          )}

          <div className="botones-container">
            <button
              onClick={() => navigate("/carrito")}
              className="btn btn-secundario"
            >
              Volver al Carrito
            </button>
            <button
              onClick={handlePagar}
              disabled={loading}
              className="btn btn-primario"
            >
              {loading ? "Procesando..." : "Confirmar Pago"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}