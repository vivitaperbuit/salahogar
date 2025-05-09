import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ContactContext, 
  ContactFormValues, 
  ContactReason, 
  CONTACT_REASONS, 
  SERVICE_REASONS 
} from "./types";

interface ContactFormProps {
  context: ContactContext;
  tipoMueble?: string;
  onSuccess?: () => void;
  className?: string;
  isWhatsAppAvailable?: boolean;
}

export const ContactForm = ({ 
  context, 
  tipoMueble, 
  onSuccess, 
  className = "",
  isWhatsAppAvailable = true 
}: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    defaultValues: {
      nombre: "",
      correo: "",
      celular: "",
      mensaje: "",
      motivo: context === 'contact' ? 'whatsapp' : 'restauracion'
    }
  });

  const reasons = context === 'contact' ? CONTACT_REASONS : SERVICE_REASONS;
  const selectedReason = reasons.find(r => r.id === form.watch('motivo'));

  const handleWhatsAppClick = () => {
    const mensaje = `Hola, estoy interesado(a) en ${selectedReason?.label.toLowerCase()} con Salahogar. ¿Podemos agendar una cita? Gracias 😊`;
    const whatsappLink = `https://wa.me/573002654145?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      // Simulamos el envío del formulario
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("¡Gracias por contactarnos! Te responderemos pronto.");
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins">Motivo de contacto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full font-poppins">
                    <SelectValue placeholder="Selecciona el motivo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {reasons.map((reason) => (
                    <SelectItem 
                      key={reason.id} 
                      value={reason.id}
                      className="font-poppins"
                    >
                      <div>
                        <div>{reason.label}</div>
                        {reason.description && (
                          <div className="text-sm text-gray-500">{reason.description}</div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins">Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Tu nombre" {...field} className="font-poppins" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="correo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins">Correo</FormLabel>
              <FormControl>
                <Input type="email" placeholder="tucorreo@ejemplo.com" {...field} className="font-poppins" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="celular"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins">Celular</FormLabel>
              <FormControl>
                <Input placeholder="Tu número de celular" {...field} className="font-poppins" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins">Mensaje</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder={tipoMueble 
                    ? `Hola, estoy interesado(a) en cotizar la restauración de un ${tipoMueble} con Salahogar. ¿Podemos agendar una cita?`
                    : "Cuéntanos qué necesitas..."
                  } 
                  {...field} 
                  className="font-poppins min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit"
          size="lg" 
          className="w-full bg-brand-green hover:bg-green-600 text-lg px-8 py-6 font-baloo font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          <Mail className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </Form>
  );

  // Si estamos en el contexto de contacto y WhatsApp está disponible, mostramos el botón de WhatsApp
  if (context === 'contact' && isWhatsAppAvailable && form.watch('motivo') === 'whatsapp') {
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-poppins">Motivo de contacto</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full font-poppins">
                    <SelectValue placeholder="Selecciona el motivo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {reasons.map((reason) => (
                    <SelectItem 
                      key={reason.id} 
                      value={reason.id}
                      className="font-poppins"
                    >
                      <div>
                        <div>{reason.label}</div>
                        {reason.description && (
                          <div className="text-sm text-gray-500">{reason.description}</div>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          size="lg" 
          className="w-full bg-brand-green hover:bg-green-600 text-lg px-8 py-6 font-baloo font-semibold"
          onClick={handleWhatsAppClick}
        >
          Contactar por WhatsApp
          <MessageSquare className="ml-2 h-5 w-5" />
        </Button>
      </div>
    );
  }

  return renderForm();
}; 