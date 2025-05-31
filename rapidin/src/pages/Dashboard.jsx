import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await axios.get("http://localhost:5000/historial-ventas");
        setVentas(res.data);
      } catch (err) {
        setError("Error al obtener historial de ventas.");
      }
    };

    fetchHistorial();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📋 Historial de Ventas</h2>

      {error && <p className="text-red-500">{error}</p>}

      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <div className="space-y-4">
          {ventas.map((venta, index) => (
            <div key={index} className="border p-4 rounded shadow">
              <h3 className="font-semibold text-lg">🧍 Cliente: {venta.cliente}</h3>
              <ul className="list-disc list-inside mt-2">
                {venta.items.map((item, i) => (
                  <li key={i}>
                    Producto ID {item.id_producto} — Cantidad: {item.cantidad}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}