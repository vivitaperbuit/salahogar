import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CheckCircle, Calendar } from 'lucide-react';
import { useCart } from '@/store/CartContext';
import { Stepper } from '@/components/ui/stepper';

const departamentos = [
  { value: '', label: 'Selecciona departamento' },
  { value: 'Cundinamarca', label: 'Cundinamarca' },
  { value: 'Antioquia', label: 'Antioquia' },
  { value: 'Valle del Cauca', label: 'Valle del Cauca' },
  { value: 'Atlántico', label: 'Atlántico' },
  // ...otros departamentos
];

const ciudades = {
  'Cundinamarca': [
    { value: '', label: 'Selecciona ciudad' },
    { value: 'Bogota, d.c.', label: 'Bogotá, D.C.' },
    { value: 'Soacha', label: 'Soacha' },
    { value: 'Chía', label: 'Chía' },
  ],
  'Antioquia': [
    { value: '', label: 'Selecciona ciudad' },
    { value: 'Medellín', label: 'Medellín' },
    { value: 'Envigado', label: 'Envigado' },
  ],
  'Valle del Cauca': [
    { value: '', label: 'Selecciona ciudad' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Palmira', label: 'Palmira' },
  ],
  'Atlántico': [
    { value: '', label: 'Selecciona ciudad' },
    { value: 'Barranquilla', label: 'Barranquilla' },
    { value: 'Soledad', label: 'Soledad' },
  ],
};

const barrios = {
  'Bogota, d.c.': [
    { value: '', label: 'Selecciona barrio' },
    { value: 'Chapinero', label: 'Chapinero' },
    { value: 'Usaquén', label: 'Usaquén' },
    { value: 'Teusaquillo', label: 'Teusaquillo' },
  ],
  'Medellín': [
    { value: '', label: 'Selecciona barrio' },
    { value: 'El Poblado', label: 'El Poblado' },
    { value: 'Laureles', label: 'Laureles' },
  ],
  'Cali': [
    { value: '', label: 'Selecciona barrio' },
    { value: 'San Fernando', label: 'San Fernando' },
    { value: 'Granada', label: 'Granada' },
  ],
  // ...otros barrios
};

export default function Envio() {
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [barrio, setBarrio] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const navigate = useNavigate();
  const { cart } = useCart();

  const ciudadesOptions = ciudades[departamento] || [{ value: '', label: 'Selecciona ciudad' }];
  const barriosOptions = barrios[ciudad] || [{ value: '', label: 'Selecciona barrio' }];

  // Calcular la fecha mínima (hoy + 20 días)
  const today = new Date();
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20)
    .toISOString().split('T')[0];

  const isComplete = departamento && ciudad && barrio && fechaEntrega;

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isComplete) {
      navigate('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col md:flex-row items-start justify-start gap-8 mt-24">
      {/* Columna izquierda: formularios con scroll propio */}
      <div className="w-full md:max-w-2xl flex flex-col gap-6 md:h-[calc(100vh-8rem)] md:overflow-y-auto md:pr-4 ocultar-scrollbar">
        {/* Stepper de progreso */}
        <div className="flex justify-center w-full mb-2 mt-0"><Stepper steps={['Carrito', 'Envío', 'CheckOut', 'Pago']} currentStep={1} /></div>
        {/* Card de lugar de envío */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2 font-poppins">Elige el lugar de envío</h2>
          <p className="text-gray-600 mb-6 text-sm">Selecciona el departamento, ciudad y barrio donde quieres que llegue tu pedido</p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div>
              <label htmlFor="departamento" className="block text-sm font-medium mb-1">Departamento</label>
              <select id="departamento" value={departamento} onChange={e => { setDepartamento(e.target.value); setCiudad(''); setBarrio(''); }} required className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                {departamentos.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ciudad" className="block text-sm font-medium mb-1">Ciudad</label>
              <select id="ciudad" value={ciudad} onChange={e => { setCiudad(e.target.value); setBarrio(''); }} required disabled={!departamento} className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                {ciudadesOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="barrio" className="block text-sm font-medium mb-1">Barrio</label>
              <select id="barrio" value={barrio} onChange={e => setBarrio(e.target.value)} required disabled={!ciudad} className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                {barriosOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </form>
          {isComplete && (
            <div className="flex items-center justify-between bg-gray-50 rounded-full px-6 py-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="relative">
                  <Truck className="h-8 w-8 text-gray-500" />
                  <CheckCircle className="h-5 w-5 text-brand-green absolute -top-2 -left-2 bg-white rounded-full" />
                </span>
                <span className="text-gray-700 text-base">El envío a <b>{ciudad}, {departamento}</b> tiene un costo de:</span>
              </div>
              <span className="bg-white border border-gray-200 rounded-full px-8 py-2 text-lg font-bold text-brand-green">Gratis</span>
            </div>
          )}
        </div>

        {/* Card de fecha de entrega */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-2 font-poppins">Elige la fecha de entrega</h2>
          <p className="text-gray-600 mb-6 text-sm">Selecciona la fecha en la que deseas recibir tu pedido</p>
          <div className="mb-8">
            <label htmlFor="fechaEntrega" className="block text-sm font-medium mb-1">Fecha de entrega</label>
            <input
              id="fechaEntrega"
              type="date"
              min={minDate}
              value={fechaEntrega}
              onChange={e => setFechaEntrega(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition"
            />
            <p className="text-xs text-gray-500 mt-2">*Asegúrate de que el día que selecciones este una persona en el lugar. La fecha de despacho de tu pedido será posterior a 20 días después de realizada tu compra</p>
          </div>
          {fechaEntrega && (
            <div className="flex items-center justify-between bg-gray-50 rounded-full px-6 py-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="relative">
                  <Calendar className="h-8 w-8 text-gray-500" />
                  <CheckCircle className="h-5 w-5 text-brand-green absolute -top-2 -left-2 bg-white rounded-full" />
                </span>
                <span className="text-gray-700 text-base">Tu pedido llegará el <b>{new Date(fechaEntrega).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</b></span>
              </div>
            </div>
          )}
        </div>

        {/* Botón de continuar */}
        <button 
          type="submit" 
          onClick={handleSubmit} 
          disabled={!isComplete} 
          className="w-full bg-brand-green text-white py-3 rounded font-poppins font-semibold text-base hover:bg-brand-green/90 transition disabled:opacity-60 mb-6"
        >
          Ir a facturar
        </button>
      </div>

      {/* Columna derecha: resumen de la orden y medio de pago con scroll propio */}
      <div className="bg-white rounded-lg shadow p-4 flex-1 max-w-md w-full md:h-[calc(100vh-8rem)] md:overflow-y-auto md:sticky md:top-24 ocultar-scrollbar mt-0">
        <h2 className="text-xl font-bold mb-4 font-poppins">Resumen de la orden</h2>
        {cart.items.length === 0 ? (
          <div className="text-gray-500">No hay productos en el carrito.</div>
        ) : (
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.items.map(item => (
              <li key={item.productId} className="flex items-center gap-3 py-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold text-brand-blue text-sm">{item.name}</div>
                  <div className="text-xs text-gray-500">{item.quantity} x ${item.price.toLocaleString()}</div>
                </div>
                <div className="font-semibold text-sm">${(item.price * item.quantity).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
        <div className="flex justify-between items-center text-base font-bold mb-4">
          <span>Total:</span>
          <span className="text-brand-green">${total.toLocaleString()}</span>
        </div>
        {/* Medios de pago (solo RefácilPay por ahora) */}
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Medios de pago</h3>
          <div className="flex items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="RefácilPay" className="w-7 h-7" />
            <span className="font-poppins text-sm">RefácilPay</span>
          </div>
        </div>
      </div>
    </div>
  );
} 