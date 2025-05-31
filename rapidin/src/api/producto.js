import axios from "axios";

const API_BASE = "http://localhost:5000"; // Cambia esto si usas otro puerto o dominio

export const obtenerProductos = async () => {
  const response = await axios.get(`${API_BASE}/productos`);
  return response.data;
};