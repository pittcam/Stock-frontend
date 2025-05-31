import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <Link to="/" className="text-xl font-bold">
            Rapidin
          </Link>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            to="/catalogo" 
            className={`hover:text-blue-200 transition ${
              location.pathname === '/catalogo' ? 'font-bold underline' : ''
            }`}
          >
            Catálogo de Productos
          </Link>
          <Link 
            to="/dashboard" 
            className={`hover:text-blue-200 transition ${
              location.pathname === '/dashboard' ? 'font-bold underline' : ''
            }`}
          >
            Dashboard de Ventas
          </Link>
        </div>
      </div>
    </nav>
  );
}