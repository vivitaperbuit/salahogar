import React, { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';
import { useCart } from '@/store/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const paymentMethods = [
  {
    name: 'RefácilPay',
    value: 'refacilpay',
    logo: '/images/refacilpay-logo.png',
    description: 'Paga fácil y seguro con RefácilPay, nuestro aliado para pagos digitales inmediatos.',
    details: 'Después de hacer clic en "Pagar ahora", serás redirigido a RefácilPay para completar tu compra de forma segura.'
  },
  {
    name: 'Addi',
    value: 'addi',
    logo: '/images/addi-logo.png',
    description: 'Financia tu compra y paga en cuotas con Addi, rápido y sin papeleo.',
    details: 'Después de hacer clic en "Pagar ahora", serás redirigido a Addi para completar tu compra de forma segura.'
  },
  {
    name: 'Sistecrédito',
    value: 'sistecredito',
    logo: '/images/sistecredito-logo.png',
    description: 'Compra ahora y paga después con Sistecrédito, fácil y flexible.',
    details: 'Después de hacer clic en "Pagar ahora", serás redirigido a Sistecrédito para completar tu compra de forma segura.'
  },
];

export default function Pago() {
  const [selected, setSelected] = useState('refacilpay');
  const { cart } = useCart();
  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showTransition, setShowTransition] = useState(false);

  const handlePay = () => {
    setShowTransition(true);
    setTimeout(() => {
      // Aquí puedes poner la lógica real de redirección
      setShowTransition(false);
      // window.location.href = 'https://url-del-pago.com';
    }, 2000);
  };

  const selectedMethod = paymentMethods.find(m => m.value === selected);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col md:flex-row items-start justify-start gap-8 mt-24">
      {/* Overlay de transición */}
      {showTransition && (
        <div className="fixed inset-0 z-50 flex flex-col min-h-screen w-full bg-white">
          <Navbar />
          <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-12 min-h-screen">
            <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-4 w-full max-w-lg">
              {/* Spinner */}
              <svg className="animate-spin h-10 w-10 text-brand-green mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              <div className="text-lg font-semibold text-brand-blue text-center">
                Estamos redireccionando a <span className="text-brand-green">{selectedMethod?.name}</span> para que realices el pago de tu pedido
              </div>
            </div>
          </main>
          <Footer />
        </div>
      )}
      <div className="w-full md:max-w-2xl flex flex-col gap-6">
        {/* Stepper */}
        <div className="flex justify-center w-full mb-2 mt-0">
          <Stepper steps={['Carrito', 'Envío', 'CheckOut', 'Pago']} currentStep={3} />
        </div>
        {/* Título y mensaje */}
        <h2 className="text-2xl font-bold mb-2 font-poppins text-brand-blue">Medios de Pago</h2>
        <p className="text-sm text-gray-600 mb-6">Ofrecemos diferentes medios de pago que se acomodan a tus necesidades</p>
        {/* Cards de medios de pago tipo radio */}
        <div className="flex flex-col gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.value}
              className={`relative flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all bg-white shadow-sm
                ${selected === method.value ? 'border-brand-green' : 'border-gray-200 hover:border-brand-green/60'}`}
              htmlFor={method.value}
            >
              <input
                type="radio"
                id={method.value}
                name="paymentMethod"
                value={method.value}
                checked={selected === method.value}
                onChange={() => setSelected(method.value)}
                className="hidden"
              />
              <span className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${selected === method.value ? 'border-brand-green bg-brand-green' : 'border-gray-300 bg-white'}`}> 
                {selected === method.value && <span className="block w-3 h-3 bg-white rounded-full mx-auto" />}
              </span>
              <img src={method.logo} alt={method.name} className={`object-contain ${method.value === 'refacilpay' ? 'w-20 h-12' : 'w-12 h-12'}`} />
              <div className="flex-1 text-left">
                <div className="text-sm text-gray-600">{method.description}</div>
              </div>
            </label>
          ))}
        </div>
        {/* Detalles del método seleccionado */}
        <div className="mt-8 bg-white rounded-lg border border-brand-green/30 p-6 flex flex-col items-center">
          <button onClick={handlePay} className="w-full bg-brand-green text-white py-2 rounded font-poppins font-semibold text-base hover:bg-brand-green/90 transition max-w-xs">Pagar ahora</button>
        </div>
      </div>
      {/* Columna derecha: resumen de la orden */}
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
        <div className="flex justify-between items-center text-base font-bold">
          <span>Total:</span>
          <span className="text-brand-green">${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
} 