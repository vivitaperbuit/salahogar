import React, { useState } from 'react';
import { useCart } from '@/store/CartContext';
import { useNavigate } from 'react-router-dom';
import { Stepper } from '@/components/ui/stepper';

const PDF_TERMINOS = 'https://www.afpcrecer.com.sv/wp-content/uploads/2019/07/Terminos-y-condiciones.pdf';
const PDF_DATOS = 'https://www.une.edu.pe/wp-content/uploads/2021/09/Politica-de-Tratamiento-de-Datos-Personales.pdf';

const initialForm = {
  nombres: 'Juan',
  apellidos: 'Pérez',
  tipoDocumento: 'CC',
  numeroDocumento: '1234567890',
  telefono: '3001234567',
  email: 'juan@correo.com',
  direccion: 'Calle 123 #45-67',
  ciudad: 'Bogota, d.c.',
};

const tiposDocumento = [
  { value: '', label: 'Selecciona...' },
  { value: 'CC', label: 'Cédula de ciudadanía' },
  { value: 'CE', label: 'Cédula de extranjería' },
  { value: 'TI', label: 'Tarjeta de identidad' },
  { value: 'NIT', label: 'NIT' },
  { value: 'PAS', label: 'Pasaporte' },
];

const departamentos = [
  { value: '', label: 'Selecciona departamento' },
  { value: 'Cundinamarca', label: 'Cundinamarca' },
  { value: 'Antioquia', label: 'Antioquia' },
  { value: 'Valle del Cauca', label: 'Valle del Cauca' },
  { value: 'Atlántico', label: 'Atlántico' },
  // ...otros departamentos
];

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

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const [acepta, setAcepta] = useState(true);
  const navigate = useNavigate();
  const [contact, setContact] = useState({ email: 'juan@correo.com', celular: '3001234567', pais: 'CO', promociones: true });
  const [contactTouched, setContactTouched] = useState<{ [k: string]: boolean }>({});
  const [departamento, setDepartamento] = useState('Cundinamarca');
  const [barrio, setBarrio] = useState('Chapinero');

  const ciudadesOptions = ciudades[departamento] || [{ value: '', label: 'Selecciona ciudad' }];

  // Validaciones
  const errors = {
    nombres: !form.nombres ? 'Requerido' : '',
    apellidos: !form.apellidos ? 'Requerido' : '',
    tipoDocumento: !form.tipoDocumento ? 'Requerido' : '',
    numeroDocumento: !form.numeroDocumento ? 'Requerido' : '',
    telefono: !/^\d{7,15}$/.test(form.telefono) ? 'Teléfono inválido' : '',
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? 'Email inválido' : '',
    direccion: !form.direccion ? 'Requerido' : '',
    ciudad: !form.ciudad ? 'Requerido' : '',
  };
  const isValid = Object.values(errors).every(e => !e) && acepta;

  // Validaciones contacto
  const contactErrors = {
    email: !/^\S+@\S+\.\S+$/.test(contact.email) ? 'Email inválido' : '',
    celular:
      contact.pais === 'CO'
        ? !/^3\d{9}$/.test(contact.celular)
          ? 'Celular colombiano inválido'
          : ''
        : !/^\d{7,15}$/.test(contact.celular)
        ? 'Celular inválido'
        : '',
  };
  const isContactValid = Object.values(contactErrors).every(e => !e);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    navigate('/pago');
  };

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="container mx-auto px-4 py-12 min-h-screen flex flex-col md:flex-row items-start justify-start gap-8 mt-24">
        {/* Columna izquierda: formulario de facturación */}
        <div className="w-full md:max-w-2xl flex flex-col gap-6 md:h-[calc(100vh-8rem)] md:overflow-y-auto md:pr-4 ocultar-scrollbar">
          {/* Stepper de progreso */}
          <div className="flex justify-center w-full mb-2 mt-0"><Stepper steps={['Carrito', 'Envío', 'CheckOut', 'Pago']} currentStep={2} /></div>
          {/* Card de contacto */}
          <div className="bg-white rounded-lg shadow p-4 mb-2">
            <h2 className="text-2xl font-bold mb-2 font-poppins text-brand-blue">Registra tus datos de contacto</h2>
            <p className="text-sm text-gray-600 mb-5">Necesitamos tu información de contacto para poder enviarte información del estado de tu pedido, y otra información de interés para ti.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <input name="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} onBlur={() => setContactTouched(t => ({ ...t, email: true }))}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition"
                  placeholder="Ej: correo@dominio.com" />
                {contactTouched.email && contact.email && !/^([a-zA-Z0-9_\-.+]+)@([a-zA-Z0-9\-.]+)\.([a-zA-Z]{2,})$/.test(contact.email) && (
                  <span className="text-red-500 text-xs">Por favor ingresa un correo válido.</span>
                )}
                {contactTouched.email && !contact.email && (
                  <span className="text-red-500 text-xs">El correo es obligatorio.</span>
                )}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Celular</label>
                <div className="flex w-full">
                  <select value={contact.pais} onChange={e => setContact({ ...contact, pais: e.target.value })} className="rounded-l border border-gray-300 px-2 py-2 bg-gray-50 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition w-28 min-w-[90px]">
                    <option value="CO">🇨🇴 +57</option>
                    <option value="US">🇺🇸 +1</option>
                    <option value="EC">🇪🇨 +593</option>
                  </select>
                  <input name="celular" value={contact.celular} onChange={e => setContact({ ...contact, celular: e.target.value.replace(/\D/g, '') })} onBlur={() => setContactTouched(t => ({ ...t, celular: true }))}
                    className="flex-1 rounded-r border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition"
                    placeholder={contact.pais === 'CO' ? 'Ej: 3XXXXXXXXX' : 'Ej: número'} maxLength={contact.pais === 'CO' ? 10 : 15} />
                </div>
                {contactTouched.celular && contactErrors.celular && <span className="text-red-500 text-xs">{contactErrors.celular}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 justify-start">
              <input type="checkbox" id="promociones" checked={contact.promociones} onChange={e => setContact({ ...contact, promociones: e.target.checked })} />
              <label htmlFor="promociones" className="text-xs text-gray-500 cursor-pointer">Me interesa recibir información de promociones, descuentos y el estado de mi pedido</label>
            </div>
          </div>
          {/* Formulario de facturación */}
          <form className="bg-white rounded-lg shadow p-4 flex-1 w-full" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4 font-poppins">Datos para facturación</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Nombres</label>
                <input name="nombres" value={form.nombres} onChange={handleChange} onBlur={handleBlur} 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition" 
                  placeholder="Ej: Juan Carlos" />
                {touched.nombres && errors.nombres && <span className="text-red-500 text-xs">{errors.nombres}</span>}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Apellidos</label>
                <input name="apellidos" value={form.apellidos} onChange={handleChange} onBlur={handleBlur} 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition" 
                  placeholder="Ej: Rodríguez Pérez" />
                {touched.apellidos && errors.apellidos && <span className="text-red-500 text-xs">{errors.apellidos}</span>}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Tipo de documento</label>
                <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} onBlur={handleBlur} 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                  {tiposDocumento.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {touched.tipoDocumento && errors.tipoDocumento && <span className="text-red-500 text-xs">{errors.tipoDocumento}</span>}
              </div>
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Número de documento</label>
                <input name="numeroDocumento" value={form.numeroDocumento} onChange={handleChange} onBlur={handleBlur} 
                  className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition" 
                  placeholder="Ej: 1234567890" />
                {touched.numeroDocumento && errors.numeroDocumento && <span className="text-red-500 text-xs">{errors.numeroDocumento}</span>}
              </div>
              {/* Departamento */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Departamento</label>
                <select name="departamento" value={departamento} onChange={e => setDepartamento(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                  {departamentos.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              {/* Ciudad */}
              <div className="w-full">
                <label className="block text-sm font-medium mb-1">Ciudad</label>
                <select name="ciudad" value={form.ciudad} onChange={handleChange} onBlur={handleBlur}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                  {ciudadesOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
                {touched.ciudad && errors.ciudad && <span className="text-red-500 text-xs">{errors.ciudad}</span>}
              </div>
              {/* Barrio */}
              <div className="md:col-span-2 w-full">
                <label className="block text-sm font-medium mb-1">Barrio</label>
                <select name="barrio" value={barrio} onChange={e => setBarrio(e.target.value)} className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-brand-green transition">
                  <option value="">Selecciona barrio</option>
                  {(barrios[form.ciudad] || []).map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="md:col-span-2 w-full mt-2 flex items-center">
                <input type="checkbox" id="acepta" checked={acepta} onChange={e => setAcepta(e.target.checked)} className="mr-2" />
                <label htmlFor="acepta" className="text-xs">
                  Acepto <a href={PDF_TERMINOS} target="_blank" rel="noopener noreferrer" className="underline text-brand-blue">términos y condiciones</a> y autorizo el <a href={PDF_DATOS} target="_blank" rel="noopener noreferrer" className="underline text-brand-blue">tratamiento de datos personales</a>.
                </label>
              </div>
              <button type="submit" className="w-full bg-brand-green text-white py-2 rounded font-poppins font-semibold text-base hover:bg-brand-green/90 transition mt-4 md:col-span-2" disabled={!isValid}>
                Pagar
              </button>
            </div>
          </form>
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
          <div className="flex justify-between items-center text-base font-bold">
            <span>Total:</span>
            <span className="text-brand-green">${total.toLocaleString()}</span>
          </div>
          {/* Medios de pago (solo RefácilPay por ahora) */}
          <div className="mt-6">
            <h3 className="font-semibold mb-1">Medios de pago</h3>
            <div className="flex items-center gap-2">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="RefácilPay" className="w-7 h-7" />
              <span className="font-poppins text-sm">RefácilPay</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 