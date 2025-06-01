import React from 'react';
import { Link } from 'react-router-dom';
import '../style/principal.css';

export default function Principal() {
  return (
    <div className="principal-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Rapidin Vegano</h1>
          <p className="hero-description">
            Sistema de caja registradora para tu supermercado de productos veganos, sostenibles y conscientes
          </p>
        </div>
      </section>
      
      {/* Propósito Section */}
      <section className="purpose-section">
        <div className="purpose-container">
          <h2 className="section-title">Propósito del Software</h2>
          
          <p className="purpose-text">
            Este software de caja registradora está diseñado específicamente para "Rapidin Vegano", 
            un supermercado especializado en productos veganos y sostenibles. Descubre cómo nuestro sistema
            transforma la experiencia de compra.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gestión de Inventario" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Gestión de Inventario</h3>
                <p className="feature-description">
                  Control completo del stock de productos veganos, alertas de bajo inventario y actualización automática.
                </p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1605973029521-8154da591bd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Procesamiento de Ventas" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Procesamiento de Ventas</h3>
                <p className="feature-description">
                  Interfaz intuitiva para agregar productos al carrito, aplicar descuentos y procesar pagos rápidamente.
                </p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Análisis de Datos" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Análisis de Datos</h3>
                <p className="feature-description">
                  Dashboard con estadísticas de ventas, productos más populares y tendencias de consumo.
                </p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-image">
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Experiencia del Cliente" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Experiencia del Cliente</h3>
                <p className="feature-description">
                  Sistema de fidelización, recibos digitales y gestión de devoluciones eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Productos Destacados */}
      <section className="featured-products">
        <div className="products-container">
          <h2 className="section-title">Productos Destacados</h2>
          
          <div className="products-grid">
            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chicharrines Veganos" />
                <div className="product-badge">Popular</div>
              </div>
              <div className="product-details">
                <h3 className="product-name">Chicharrines Veganos</h3>
                <p className="product-price">$4.500</p>
                <button className="product-btn">Ver Detalles</button>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Ensalada Premium" />
              </div>
              <div className="product-details">
                <h3 className="product-name">Empanadas Veganas</h3>
                <p className="product-price">$15.900</p>
                <button className="product-btn">Ver Detalles</button>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Tofu Orgánico" />
                <div className="product-badge">Nuevo</div>
              </div>
              <div className="product-details">
                <h3 className="product-name">Tofu Orgánico 450g</h3>
                <p className="product-price">$15.200</p>
                <button className="product-btn">Ver Detalles</button>
              </div>
            </div>
            
            <div className="product-card">
              <div className="product-image">
                <img src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Gluten Desmechado" />
              </div>
              <div className="product-details">
                <h3 className="product-name">Gluten Desmechado</h3>
                <p className="product-price">$17.700</p>
                <button className="product-btn">Ver Detalles</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cómo Usar el Sistema */}
      <section className="steps-section">
        <h2 className="section-title">Cómo Usar el Sistema</h2>
        
        <div className="steps-container">
          <div className="step-card">
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1629995015867-a4581aeed080?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Explorar Catálogo" />
            </div>
            <div className="step-content">
              <div className="step-number">
                <div className="step-circle">1</div>
                <h3 className="step-title">Explorar el Catálogo</h3>
              </div>
              <p className="step-description">
                Navega por nuestro amplio catálogo de productos veganos. Puedes filtrar por categorías, 
                verificar precios y disponibilidad en tiempo real.
              </p>
            </div>
          </div>
          
          <div className="step-card">
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Agregar al Carrito" />
            </div>
            <div className="step-content">
              <div className="step-number">
                <div className="step-circle">2</div>
                <h3 className="step-title">Agregar Productos al Carrito</h3>
              </div>
              <p className="step-description">
                Selecciona productos y especifica la cantidad deseada. El sistema verificará automáticamente 
                la disponibilidad en stock y calculará los subtotales.
              </p>
            </div>
          </div>
          
          <div className="step-card">
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1601598851547-4302969d0614?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Finalizar Compra" />
            </div>
            <div className="step-content">
              <div className="step-number">
                <div className="step-circle">3</div>
                <h3 className="step-title">Finalizar la Compra</h3>
              </div>
              <p className="step-description">
                Revisa los productos en el carrito, ajusta cantidades si es necesario y procede al pago. 
                El sistema generará un recibo y actualizará el inventario automáticamente.
              </p>
            </div>
          </div>
          
          <div className="step-card">
            <div className="step-image">
              <img src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Consultar Dashboard" />
            </div>
            <div className="step-content">
              <div className="step-number">
                <div className="step-circle">4</div>
                <h3 className="step-title">Consultar el Dashboard</h3>
              </div>
              <p className="step-description">
                Accede al dashboard de ventas para analizar el rendimiento del negocio, identificar tendencias 
                y tomar decisiones informadas sobre inventario y estrategias de venta.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonios */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Rapidin Vegano ha revolucionado la forma en que manejo mi tienda de productos orgánicos. El control de inventario es preciso y el proceso de venta es súper ágil."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="María González" />
                </div>
                <div className="author-info">
                  <h4>María González</h4>
                  <p>Dueña de Eco Market</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Como cliente, me encanta la rapidez con la que procesan mis compras y la claridad de los recibos digitales. Además, el sistema de fidelización es genial."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Rodríguez" />
                </div>
                <div className="author-info">
                  <h4>Carlos Rodríguez</h4>
                  <p>Cliente Frecuente</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Como gerente, el dashboard de análisis me ha permitido tomar decisiones estratégicas que han aumentado nuestras ventas en un 30% en los últimos 3 meses."
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Laura Méndez" />
                </div>
                <div className="author-info">
                  <h4>Laura Méndez</h4>
                  <p>Gerente de Veggie Store</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">¿Listo para comenzar?</h2>
          <p className="cta-description">
            Descubre todos nuestros productos veganos o visita el dashboard para ver estadísticas en tiempo real.
          </p>
          <div className="cta-buttons">
            <Link to="/catalogo" className="cta-btn cta-btn-primary">
              Ver Catálogo
            </Link>
            <Link to="/dashboard" className="cta-btn cta-btn-secondary">
              Ir al Dashboard
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <h3>Rapidin Vegano</h3>
            <ul className="footer-links">
              <li><a href="#">Sobre Nosotros</a></li>
              <li><a href="#">Nuestra Misión</a></li>
              <li><a href="#">Sustentabilidad</a></li>
              <li><a href="#">Prensa</a></li>
              <li><a href="#">Trabaja con Nosotros</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Productos</h3>
            <ul className="footer-links">
              <li><a href="#">Frescos</a></li>
              <li><a href="#">Refrigerados</a></li>
              <li><a href="#">Congelados</a></li>
              <li><a href="#">Despensa</a></li>
              <li><a href="#">Higiene</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Soporte</h3>
            <ul className="footer-links">
              <li><a href="#">Centro de Ayuda</a></li>
              <li><a href="#">Envíos</a></li>
              <li><a href="#">Devoluciones</a></li>
              <li><a href="#">Estado de Pedidos</a></li>
              <li><a href="#">Contacto</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Síguenos</h3>
            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-pinterest"></i></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2025 Rapidin Vegano - Sistema de Caja Registradora. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}