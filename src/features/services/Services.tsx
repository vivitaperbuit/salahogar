import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ContactForm } from "@/features/contact/ContactForm";

const FURNITURE_TYPES = [
  { id: "silla", label: "Silla" },
  { id: "mesa", label: "Mesa" },
  { id: "sofa", label: "Sofá" },
  { id: "armario", label: "Armario" },
  { id: "otro", label: "Otro" }
];

export const Services = () => {
  const [selectedFurniture, setSelectedFurniture] = useState<string>("");
  const [isWhatsAppAvailable, setIsWhatsAppAvailable] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Simular disponibilidad de WhatsApp (para pruebas)
  useEffect(() => {
    const checkWhatsAppAvailability = async () => {
      try {
        // Simulamos una llamada a una API que verifica WhatsApp
        const response = await fetch('https://api.whatsapp.com/status');
        setIsWhatsAppAvailable(response.ok);
      } catch (error) {
        // Si hay error, asumimos que WhatsApp no está disponible
        setIsWhatsAppAvailable(false);
      }
    };

    checkWhatsAppAvailability();
  }, []);
  
  // Limpiar el estado cuando el componente se desmonte
  useEffect(() => {
    return () => {
      setSelectedFurniture("");
    };
  }, []);

  // Limpiar el select cuando la sección entre en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelectedFurniture("");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleWhatsAppClick = () => {
    const mensaje = `Hola, estoy interesado(a) en cotizar la restauración de un ${selectedFurniture} con Salahogar. ¿Podemos agendar una cita? Gracias 😊`;
    const whatsappLink = `https://wa.me/573002654145?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
  };
  
  return (
    <section ref={sectionRef} id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 font-baloo">
            Nuestros Servicios
          </h2>
          <p className="text-gray-600 text-center mb-12 font-poppins">
            Ofrecemos una amplia gama de servicios de restauración y diseño de muebles.
          </p>

          <div className="space-y-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 font-baloo">Restauración de Muebles</h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Devuelve la vida a tus muebles antiguos con nuestro servicio profesional de restauración.
              </p>
              
              <div className="space-y-4">
                <Select
                  value={selectedFurniture}
                  onValueChange={setSelectedFurniture}
                >
                  <SelectTrigger className="w-full font-poppins">
                    <SelectValue placeholder="Selecciona el tipo de mueble" />
                  </SelectTrigger>
                  <SelectContent>
                    {FURNITURE_TYPES.map((type) => (
                      <SelectItem 
                        key={type.id} 
                        value={type.id}
                        className="font-poppins"
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isWhatsAppAvailable ? (
                  <Button 
                    size="lg" 
                    className="w-full bg-brand-green hover:bg-green-600 text-lg px-8 py-6 font-baloo font-semibold"
                    onClick={handleWhatsAppClick}
                    disabled={!selectedFurniture}
                  >
                    Contactar por WhatsApp
                    <MessageSquare className="ml-2 h-5 w-5" />
                  </Button>
                ) : (
                  <ContactForm 
                    context="services" 
                    tipoMueble={selectedFurniture}
                    onSuccess={() => setSelectedFurniture("")}
                  />
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 font-baloo">Diseño Personalizado</h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Creamos muebles únicos y personalizados que se adaptan a tus necesidades y estilo.
              </p>
              <ContactForm context="services" />
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold mb-4 font-baloo">Asesoría en Decoración</h3>
              <p className="text-gray-600 mb-6 font-poppins">
                Te ayudamos a elegir los muebles perfectos para tu espacio y estilo de vida.
              </p>
              <ContactForm context="services" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 