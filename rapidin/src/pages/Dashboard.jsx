import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import "../style/dashboard.css";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState("");
  const [ventasPorMes, setVentasPorMes] = useState({});
  const [ventasPorProducto, setVentasPorProducto] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resumen');

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/historial-ventas");
        setVentas(res.data);
        
        // Procesar datos para gráficas
        procesarDatosPorMes(res.data);
        procesarDatosPorProducto(res.data);
        
        setLoading(false);
      } catch (err) {
        setError("Error al obtener historial de ventas.");
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  // Función para procesar datos por mes
  const procesarDatosPorMes = (datos) => {
    const ventasMes = {};
    
    datos.forEach(venta => {
      // Convertir la fecha al formato YYYY-MM
      const fecha = new Date(venta.fecha);
      const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
      
      // Incrementar contador de ventas para ese mes
      if (!ventasMes[mes]) {
        ventasMes[mes] = { count: 0, total: 0 };
      }
      
      ventasMes[mes].count += 1;
      ventasMes[mes].total += venta.total || 0;
    });
    
    setVentasPorMes(ventasMes);
  };

  // Función para procesar datos por producto
  const procesarDatosPorProducto = (datos) => {
    const productosVendidos = {};
    
    datos.forEach(venta => {
      venta.items.forEach(item => {
        const idProducto = item.id_producto;
        const nombreProducto = item.nombre_producto || `Producto ${idProducto}`;
        
        if (!productosVendidos[nombreProducto]) {
          productosVendidos[nombreProducto] = {
            cantidad: 0,
            ventas: 0
          };
        }
        
        productosVendidos[nombreProducto].cantidad += item.cantidad;
        productosVendidos[nombreProducto].ventas += item.subtotal || (item.precio_unitario * item.cantidad) || 0;
      });
    });
    
    setVentasPorProducto(productosVendidos);
  };

  // Configuración para gráfico de ventas por mes
  const chartDataMeses = {
    labels: Object.keys(ventasPorMes).map(mes => {
      const [year, month] = mes.split('-');
      return `${['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][parseInt(month)-1]} ${year}`;
    }),
    datasets: [
      {
        label: 'Número de Ventas',
        data: Object.values(ventasPorMes).map(v => v.count),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 1,
      },
      {
        label: 'Total Ventas ($)',
        data: Object.values(ventasPorMes).map(v => v.total / 1000), // Dividido por 1000 para escala
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ],
  };

  // Configuración para gráfico de ventas por producto
  const chartDataProductos = {
    labels: Object.keys(ventasPorProducto),
    datasets: [
      {
        label: 'Cantidad Vendida',
        data: Object.values(ventasPorProducto).map(p => p.cantidad),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1,
      },
      {
        label: 'Total Ventas ($)',
        data: Object.values(ventasPorProducto).map(p => p.ventas / 1000), // Dividido por 1000 para escala
        backgroundColor: 'rgba(255, 205, 86, 0.5)',
        borderColor: 'rgb(255, 205, 86)',
        borderWidth: 1,
        yAxisID: 'y1',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventas por Mes',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad'
        }
      },
      y1: {
        beginAtZero: true,
        position: 'right',
        title: {
          display: true,
          text: 'Ventas en miles ($)'
        },
        grid: {
          drawOnChartArea: false,
        },
      }
    }
  };

  const chartOptionsProductos = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        display: true,
        text: 'Ventas por Producto',
      },
    },
  };

  // Calcular totales para el panel de resumen
  const totalVentas = ventas.length;
  const totalIngresos = ventas.reduce((sum, venta) => sum + (venta.total || 0), 0);
  const productoMasVendido = Object.entries(ventasPorProducto)
    .sort((a, b) => b[1].cantidad - a[1].cantidad)[0]?.[0] || "Ninguno";

  return (
    <div className="p-6 max-w-7xl mx-auto dashboard-container">
      <h2 className="text-3xl font-bold mb-6">Dashboard de Ventas</h2>

      {error && <p className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</p>}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2 loading-spinner"></div>
            <p>Cargando datos...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Tabs de navegación */}
          <div className="flex border-b mb-6 dashboard-tabs">
            <button 
              onClick={() => setActiveTab('resumen')}
              className={`dashboard-tab ${activeTab === 'resumen' ? 'active' : ''}`}
            >
              Resumen
            </button>
            <button 
              onClick={() => setActiveTab('graficos')}
              className={`dashboard-tab ${activeTab === 'graficos' ? 'active' : ''}`}
            >
              Gráficos
            </button>
            <button 
              onClick={() => setActiveTab('ventas')}
              className={`dashboard-tab ${activeTab === 'ventas' ? 'active' : ''}`}
            >
              Historial de Ventas
            </button>
          </div>

          {/* Contenido según tab */}
          {activeTab === 'resumen' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 stat-card">
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-1 stat-title">Ventas Totales</h3>
                <div className="text-3xl font-bold counter-value animate">{totalVentas}</div>
                <div className="mt-4 text-green-600 stat-description stat-trend-up">
                  <span className="font-medium">+{Object.values(ventasPorMes)[0]?.count || 0}</span> este mes
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 stat-card">
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-1">Ingresos Totales</h3>
                <div className="text-3xl font-bold">${totalIngresos.toLocaleString()}</div>
                <div className="mt-4 text-green-600">
                  <span className="font-medium">${Object.values(ventasPorMes)[0]?.total.toLocaleString() || 0}</span> este mes
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 stat-card">
                <h3 className="text-gray-500 text-sm font-medium uppercase mb-1">Producto Más Vendido</h3>
                <div className="text-3xl font-bold truncate">{productoMasVendido}</div>
                <div className="mt-4 text-gray-600">
                  {ventasPorProducto[productoMasVendido]?.cantidad || 0} unidades vendidas
                </div>
              </div>
              
              <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Ventas por Mes</h3>
                <div className="overflow-x-auto">
                  <table className="dashboard-table min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mes</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Ventas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Vendido</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(ventasPorMes).map(([mes, datos], index) => {
                        const [year, month] = mes.split('-');
                        const nombreMes = `${['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][parseInt(month)-1]} ${year}`;
                        
                        return (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{nombreMes}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{datos.count}</td>
                            <td className="px-6 py-4 whitespace-nowrap">${datos.total.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'graficos' && (
            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Ventas por Mes</h3>
                <div className="chart-container h-80">
                  <Bar options={chartOptions} data={chartDataMeses} />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <h3 className="font-semibold text-lg mb-4">Ventas por Producto</h3>
                <div className="h-96">
                  <Bar options={chartOptionsProductos} data={chartDataProductos} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ventas' && (
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="font-semibold text-lg mb-4">Historial Detallado de Ventas</h3>
              
              {ventas.length === 0 ? (
                <p className="text-gray-500">No hay ventas registradas.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="bordered-table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Cliente</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Método Pago</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas.map((venta, index) => {
                        const fecha = new Date(venta.fecha);
                        const fechaFormateada = fecha.toLocaleDateString();
                        
                        return (
                          <tr key={index}>
                            <td>{fechaFormateada}</td>
                            <td>
                              <div>{venta.cliente}</div>
                              <div className="text-gray-500 text-sm">{venta.cedula}</div>
                            </td>
                            <td>
                              <table className="product-subtable">
                                <tbody>
                                  {venta.items.map((item, i) => (
                                    <tr key={i}>
                                      <td>
                                        {item.nombre_producto || `Producto ${item.id_producto}`} × {item.cantidad}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </td>
                            <td className="font-medium">
                              ${venta.total?.toLocaleString() || "N/A"}
                            </td>
                            <td>
                              {venta.tipoPago === "efectivo" ? "💵 Efectivo" : 
                               venta.tipoPago === "tarjeta" ? "💳 Tarjeta" : 
                               venta.tipoPago === "transferencia" ? "🏦 Transferencia" : 
                               venta.tipoPago}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}