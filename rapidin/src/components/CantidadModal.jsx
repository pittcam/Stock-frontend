import { useState } from 'react';


//recibe props y retorna JSX
export default function CantidadModal({ producto, onConfirm, onCancel }) {
  const [cantidad, setCantidad] = useState(1);
  
  // Funciones puras que calculan el nuevo estado basado en el estado anterior
  const handleIncrement = () => {
    if (cantidad < producto.stock) {
      setCantidad(prev => prev + 1);
    }
  };

  // Lógica condicional expresada declarativamente
  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(prev => prev - 1);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-blue-600 text-white py-3 px-4">
          <h3 className="text-lg font-bold">Cantidad para {producto.nombre}</h3>
        </div>
        
        <div className="p-5">
          <div className="mb-4">
            <div className="border rounded-md overflow-hidden flex items-center mb-2">
              <button 
                onClick={handleDecrement}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl"
              >
                −
              </button>
              <input 
                type="number" 
                min="1" 
                max={producto.stock}
                value={cantidad} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val) && val >= 1 && val <= producto.stock) {
                    setCantidad(val);
                  }
                }}
                className="border-0 text-center flex-1 py-2 text-lg font-medium"
              />
              <button 
                onClick={handleIncrement}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xl"
              >
                +
              </button>
            </div>
            <div className="text-sm text-gray-600">Stock disponible: {producto.stock} unidades</div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <div className="flex justify-between text-sm">
              <span>Precio unitario:</span>
              <span className="font-medium">${producto.precio}</span>
            </div>
            <div className="flex justify-between text-lg font-bold mt-1">
              <span>Total:</span>
              <span>${(producto.precio * cantidad).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-5">
            <button 
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition duration-150"
            >
              Cancelar
            </button>
            <button 
              onClick={() => onConfirm(cantidad)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-150"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}