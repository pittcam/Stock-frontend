import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Carrito() {
  const { carrito, agregarProducto } = useCarrito();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [couponCode, setCouponCode] = useState("");

  const handleRemoveItem = (producto) => {
    setProductToRemove(producto);
    setShowConfirm(true);
  };

  const confirmRemove = () => {
    if (productToRemove) {
      agregarProducto(productToRemove, -productToRemove.cantidad);
      setShowConfirm(false);
      setProductToRemove(null);
    }
  };

  const cancelRemove = () => {
    setShowConfirm(false);
    setProductToRemove(null);
  };

  const handleIncreaseQuantity = (producto) => {
    if (producto.cantidad < producto.stock) {
      agregarProducto(producto, 1);
    }
  };

  const handleDecreaseQuantity = (producto) => {
    if (producto.cantidad > 1) {
      agregarProducto(producto, -1);
    }
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const shipping = 0; // Envío gratuito
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Tu Carrito</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main cart content */}
          <div className="bg-white rounded-lg border shadow-sm lg:w-2/3 overflow-hidden">
            {carrito.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <button 
                  onClick={() => navigate("/")} 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Ir al Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b font-medium text-gray-600 bg-gray-50">
                  <div className="col-span-6">PRODUCTO</div>
                  <div className="col-span-2 text-right">PRECIO</div>
                  <div className="col-span-2 text-center">CANTIDAD</div>
                  <div className="col-span-2 text-right">SUBTOTAL</div>
                </div>
                
                {/* Cart Items */}
                <div>
                  {carrito.map(item => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 border-b items-center">
                      <div className="col-span-6 flex items-center gap-4">
                        <button 
                          onClick={() => handleRemoveItem(item)} 
                          className="text-gray-400 hover:text-gray-600"
                        >
                          ✕
                        </button>
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {item.imagen ? (
                            <img src={item.imagen} alt={item.nombre} className="w-10 h-10 object-cover rounded-full" />
                          ) : (
                            <span className="text-2xl">🛍️</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                        </div>
                      </div>
                      <div className="col-span-2 text-right">
                        $ {item.precio.toLocaleString()}
                      </div>
                      <div className="col-span-2 flex items-center justify-center">
                        <div className="flex border rounded">
                          <button 
                            onClick={() => handleDecreaseQuantity(item)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                            disabled={item.cantidad <= 1}
                          >
                            -
                          </button>
                          <div className="w-10 h-8 flex items-center justify-center border-x">
                            {item.cantidad}
                          </div>
                          <button 
                            onClick={() => handleIncreaseQuantity(item)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                            disabled={item.cantidad >= item.stock}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-span-2 text-right font-medium">
                        $ {(item.precio * item.cantidad).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            
            {/* Coupon Section */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Código de cupón"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
                />
                <button 
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  APLICAR CUPÓN
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          {carrito.length > 0 && (
            <div className="lg:w-1/3 bg-white border rounded-lg shadow-sm self-start sticky top-4">
              <div className="p-4 border-b">
                <h2 className="text-lg font-bold">TOTALES DE CARRITO</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">$ {subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Envío</span>
                  <div className="text-right">
                    <p className="text-gray-500">Envío gratuito</p>
                    <p className="text-sm text-gray-500">Enviar a Cundinamarca.</p>
                    <button className="text-blue-600 text-sm underline">
                      Cambiar dirección
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t text-lg font-bold">
                  <span>Total</span>
                  <span className="text-xl">$ {total.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={() => navigate("/pago")}
                  className="w-full py-3 bg-green-800 text-white rounded text-center font-medium hover:bg-green-900 transition mt-4"
                >
                  FINALIZAR COMPRA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirm && productToRemove && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-3">Confirmar eliminación</h3>
            <p className="mb-4">¿Eliminar {productToRemove.nombre} del carrito?</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={cancelRemove}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmRemove}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}