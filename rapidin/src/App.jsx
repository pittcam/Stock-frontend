import './App.css'
import Catalogo from './pages/Catalogo';
import { Routes, Route } from 'react-router-dom'
import Carrito from './pages/Carrito';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Pago from './pages/Pago';
import Principal from './pages/Principal';

function App() {
  return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Principal />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/pago" element={<Pago />} />
           
          </Routes>
        </main>
      </div>
  );
}

export default App;