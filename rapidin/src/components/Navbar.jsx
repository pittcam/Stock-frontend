import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import '../style/navbar.css';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito } = useCarrito();
  
  // Modificar esta línea para contar productos diferentes, no cantidades
  const totalItems = carrito.length; // Antes: carrito.reduce((sum, item) => sum + item.cantidad, 0);
  
  const [searchTerm, setSearchTerm] = useState('');

  // Recuperar el término de búsqueda de la URL si estamos en la página de catálogo
  useEffect(() => {
    if (location.pathname === '/catalogo') {
      const params = new URLSearchParams(location.search);
      const searchParam = params.get('search');
      if (searchParam) {
        setSearchTerm(searchParam);
      }
    }
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/catalogo${searchTerm ? `?search=${encodeURIComponent(searchTerm.trim())}` : ''}`);
  };

  // Definición del componente NavLink
  const NavLink = ({ to, current, children }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
        ${current 
          ? 'bg-blue-900 text-white' 
          : 'text-white hover:bg-blue-700'
        }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="navbar-container fixed top-0 left-0 w-full z-50 shadow-md bg-blue-800 text-white" role="navigation" aria-label="Main navigation">
      <div className="px-6 py-2 flex items-center justify-between h-16">
        {/* Logo a la izquierda */}
        <Link to="/" className="flex items-center text-xl font-bold space-x-2 text-white" aria-label="Inicio">
          <span role="img" aria-label="logo">🏪</span>
          <span>Rapidin</span>
        </Link>

        {/* Contenedor derecho - todos los elementos alineados horizontalmente */}
        <div className="flex items-center space-x-6">
          {/* Enlaces */}
          <div className="flex space-x-4 text-sm">
            <NavLink to="/catalogo" current={location.pathname === "/catalogo"}>Catálogo</NavLink>
            <NavLink to="/dashboard" current={location.pathname === "/dashboard"}>Dashboard</NavLink>
          </div>

          {/* Buscador */}
          <form onSubmit={handleSearch} className="flex max-w-xs" role="search">
            <div className="flex bg-white rounded overflow-hidden shadow-sm">
              <input 
                type="text"
                className="w-full px-3 py-1 text-black"
                placeholder="¿Qué buscas hoy?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Buscar productos"
              />
              <button type="submit" className="px-3 text-blue-600" aria-label="Buscar">
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Íconos de usuario y carrito */}
          <div className="flex items-center space-x-4 text-white">
            <Link to="/cuenta" aria-label="Mi cuenta">
              <FaUserCircle size={22} />
            </Link>
            <Link to="/carrito" className="relative" aria-label="Mi carrito">
              <FaShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
