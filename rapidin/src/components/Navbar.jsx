import { Link, useLocation } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

export default function Navbar() {
  const location = useLocation();
  const { carrito } = useCarrito();
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  
  return (
    <nav className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl mr-2">🏪</span>
              <span className="font-bold text-xl">RapiCaja</span>
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <NavLink to="/" current={location.pathname === "/"}>
              Catálogo
            </NavLink>
            <NavLink to="/carrito" current={location.pathname === "/carrito"}>
              <div className="flex items-center">
                <span>Carrito</span>
                {totalItems > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, current, children }) {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
        ${current 
          ? 'bg-blue-900 text-white' 
          : 'text-blue-100 hover:bg-blue-700'
        }`}
    >
      {children}
    </Link>
  );
}