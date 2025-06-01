import { useCarrito } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import '../style/carrito.css';

export default function Carrito() {
  const { carrito, agregarProducto, eliminarProducto } = useCarrito();
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

  const handleVenta = () => {
    navigate("/pago");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="cart-container">
        <h1 className="cart-title">Tu Carrito</h1>
        
        <div className="cart-grid">
          {/* Carrito principal */}
          <div className="cart-items">
            {carrito.length === 0 ? (
              <div className="empty-cart">
                <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                <button 
                  onClick={() => navigate("/catalogo")} 
                  className="empty-cart-button"
                >
                  Ir al Catálogo
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="cart-header">
                  <div className="cart-header-product">PRODUCTO</div>
                  <div className="cart-header-price">PRECIO</div>
                  <div className="cart-header-quantity">CANTIDAD</div>
                  <div className="cart-header-subtotal">SUBTOTAL</div>
                </div>
                
                {/* Items */}
                {carrito.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-product">
                      <div className="cart-remove" onClick={() => handleRemoveItem(item)}>
                        ✕
                      </div>
                      <div className="cart-product-image">
                        <img 
                          src={item.imagen} 
                          alt={item.nombre}
                          onError={(e) => {
                            console.log("Error cargando imagen:", item.imagen);
                            e.target.onerror = null;
                            
                            // Intentar con URL alternativa
                            if (item.imagen && item.imagen.includes('imagenes/')) {
                              const filename = item.imagen.split('/').pop();
                              const altUrl = `http://localhost:5000/imagenes/${filename}`;
                              console.log("Intentando con URL alternativa:", altUrl);
                              e.target.src = altUrl;
                            } else {
                              // Si todo falla, mostrar placeholder
                              e.target.style.display = 'none';
                              const placeholderDiv = document.createElement('div');
                              placeholderDiv.className = 'placeholder-image';
                              placeholderDiv.textContent = '📦';
                              e.target.parentNode.appendChild(placeholderDiv);
                            }
                          }}
                        />
                      </div>
                      <div className="cart-product-name">
                        {item.nombre}
                      </div>
                    </div>
                    <div className="cart-price">
                      $ {item.precio.toLocaleString()}
                    </div>
                    <div className="cart-quantity">
                      <div className="quantity-control">
                        <button 
                          className="quantity-btn"
                          onClick={() => handleDecreaseQuantity(item)}
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <div className="quantity-input">
                          {item.cantidad}
                        </div>
                        <button 
                          className="quantity-btn"
                          onClick={() => handleIncreaseQuantity(item)}
                          disabled={item.cantidad >= item.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-subtotal">
                      $ {(item.precio * item.cantidad).toLocaleString()}
                    </div>
                  </div>
                ))}
              </>
            )}
            
            {/* Cupón */}
            <div className="cart-coupon">
              <input 
                type="text" 
                placeholder="Código de cupón"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button className="coupon-button">
                APLICAR CUPÓN
              </button>
            </div>
          </div>
          
          {/* Resumen de orden */}
          {carrito.length > 0 && (
            <div className="cart-summary">
              <div className="summary-header">
                <h2 className="summary-title">TOTALES DE CARRITO</h2>
              </div>
              
              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="font-medium">$ {subtotal.toLocaleString()}</span>
                </div>
                
                <div className="summary-row">
                  <span>Envío</span>
                  <div className="text-right">
                    <p className="summary-shipping">Envío gratuito</p>
                    <p className="summary-location">Enviar a Cundinamarca.</p>
                    <button className="change-address">
                      Cambiar dirección
                    </button>
                  </div>
                </div>
                
                <div className="summary-total">
                  <span>Total</span>
                  <span>$ {total.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={handleVenta}
                  className="checkout-button"
                >
                  FINALIZAR COMPRA
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal de confirmación */}
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