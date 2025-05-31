import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from "axios";

export default function Principal() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rapidin Vegano</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Sistema de caja registradora para tu supermercado de productos veganos
          </p>
        </div>
      </section>
      
      {/* Propósito Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Propósito del Software</h2>
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <p className="text-lg text-gray-700 mb-6">
              Este software de caja registradora está diseñado específicamente para "Rapidin Vegano", 
              un supermercado especializado en productos veganos y sostenibles. Nuestro sistema permite:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2 text-green-700">Gestión de Inventario</h3>
                <p className="text-gray-700">Control completo del stock de productos veganos, alertas de bajo inventario y actualización automática.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2 text-green-700">Procesamiento de Ventas</h3>
                <p className="text-gray-700">Interfaz intuitiva para agregar productos al carrito, aplicar descuentos y procesar pagos rápidamente.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2 text-green-700">Análisis de Datos</h3>
                <p className="text-gray-700">Dashboard con estadísticas de ventas, productos más populares y tendencias de consumo.</p>
              </div>
              <div className="bg-green-50 p-4 rounded-md">
                <h3 className="text-xl font-semibold mb-2 text-green-700">Experiencia del Cliente</h3>
                <p className="text-gray-700">Sistema de fidelización, recibos digitales y gestión de devoluciones eficiente.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to Use Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Cómo Usar el Sistema</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">1</div>
                <h3 className="text-xl font-semibold">Explorar el Catálogo</h3>
              </div>
              <p className="text-gray-700 ml-11">
                Navega por nuestro amplio catálogo de productos veganos. Puedes filtrar por categorías, 
                verificar precios y disponibilidad en tiempo real.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">2</div>
                <h3 className="text-xl font-semibold">Agregar Productos al Carrito</h3>
              </div>
              <p className="text-gray-700 ml-11">
                Selecciona productos y especifica la cantidad deseada. El sistema verificará automáticamente 
                la disponibilidad en stock y calculará los subtotales.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">3</div>
                <h3 className="text-xl font-semibold">Finalizar la Compra</h3>
              </div>
              <p className="text-gray-700 ml-11">
                Revisa los productos en el carrito, ajusta cantidades si es necesario y procede al pago. 
                El sistema generará un recibo y actualizará el inventario automáticamente.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 font-bold">4</div>
                <h3 className="text-xl font-semibold">Consultar el Dashboard</h3>
              </div>
              <p className="text-gray-700 ml-11">
                Accede al dashboard de ventas para analizar el rendimiento del negocio, identificar tendencias 
                y tomar decisiones informadas sobre inventario y estrategias de venta.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">¿Listo para comenzar?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/catalogo" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Ver Catálogo
            </Link>
            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Ir al Dashboard
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Rapidin Vegano - Sistema de Caja Registradora</p>
        </div>
      </footer>
    </div>
  );
}