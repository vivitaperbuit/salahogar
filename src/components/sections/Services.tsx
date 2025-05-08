
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const Services = () => {
  const whatsappDirectLink = "https://wa.me/573002654145?text=Hola%2C%20estoy%20interesado(a)%20en%20cotizar%20la%20restauraci%C3%B3n%20de%20un%20mueble%20con%20Salahogar.%20%C2%BFPodemos%20agendar%20una%20cita%3F%20Gracias%20%F0%9F%98%8A";
  
  return (
    <section id="servicios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1581428982868-e410dd047a90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Restauración de muebles"
                className="rounded-lg shadow-lg w-full h-[500px] object-cover"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-baloo font-bold mb-6 text-brand-blue">Cirugía para tus muebles</h2>
              <p className="text-lg text-gray-700 mb-6 font-poppins">
                ¿Tienes un mueble que amas pero necesita una segunda oportunidad?
              </p>
              <p className="text-lg text-gray-700 mb-8 font-poppins">
                En Salahogar restauramos lo que tiene valor emocional: retapizado, reestructuración, 
                renovación total.
              </p>
              <Button 
                size="lg" 
                className="bg-brand-green hover:bg-green-600 text-lg px-8 py-6 font-baloo font-semibold"
                asChild
              >
                <a href={whatsappDirectLink} target="_blank" rel="noopener noreferrer">
                  Agenda tu cita en WhatsApp
                  <MessageSquare className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
