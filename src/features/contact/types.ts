export type ContactContext = 'services' | 'contact';

export interface ContactReason {
  id: string;
  label: string;
  description?: string;
}

export const SERVICE_REASONS: ContactReason[] = [
  { id: 'restauracion', label: 'Restauración de mueble' },
  { id: 'retapizado', label: 'Retapizado' },
  { id: 'reestructuracion', label: 'Reestructuración' },
  { id: 'renovacion', label: 'Renovación total' },
  { id: 'otro_servicio', label: 'Otro servicio' },
];

export const CONTACT_REASONS: ContactReason[] = [
  { id: 'whatsapp', label: 'Contáctame por WhatsApp', description: 'Respuesta inmediata' },
  { id: 'catalogo', label: 'Envíame el catálogo digital', description: 'Recibe nuestro catálogo completo' },
  { id: 'pedido', label: 'No me ha llegado el pedido', description: 'Seguimiento de envío' },
  { id: 'soporte', label: 'Necesito soporte con un producto', description: 'Ayuda con tu compra' },
  { id: 'sugerencia', label: 'Tengo una queja o sugerencia', description: 'Tu opinión es importante' },
];

export interface ContactFormValues {
  nombre: string;
  correo: string;
  celular: string;
  mensaje: string;
  motivo: string;
} 