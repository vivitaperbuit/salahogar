
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormValues {
  nombre: string;
  correo: string;
  celular: string;
  mensaje: string;
}

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      nombre: "",
      correo: "",
      celular: "",
      mensaje: ""
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulando el envío del formulario
    console.log("Datos del formulario:", data);

    // Simulando un retraso de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("¡Gracias por contactarnos! Te responderemos pronto.");
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-baloo font-bold mb-4 text-brand-blue">¿Hablamos?</h2>
            <p className="text-lg text-gray-700 font-poppins">
              Déjanos tus datos y cuéntanos qué necesitas.
              Estaremos felices de ayudarte a crear o recuperar el mueble perfecto para tu hogar.
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        placeholder="Cuéntanos qué necesitas..." 
                        className="min-h-[120px] font-poppins" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full py-6 bg-brand-green hover:bg-green-600 font-baloo font-semibold" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : "Enviar mensaje"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
