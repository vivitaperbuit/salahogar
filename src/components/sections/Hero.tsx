
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export const Hero = () => {
  const whatsappDirectLink = "https://wa.me/573002654145?text=Hola%2C%20estoy%20interesado(a)%20en%20cotizar%20la%20restauraci%C3%B3n%20de%20un%20mueble%20con%20Salahogar.%20%C2%BFPodemos%20agendar%20una%20cita%3F%20Gracias%20%F0%9F%98%8A";
  
  return (
    <section id="inicio" className="relative flex items-start justify-center min-h-screen bg-white">
      <div 
        className="absolute inset-0 z-0 bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/c97c3b94-0e46-4293-8f4b-6b14681f0998.png')",
          backgroundSize: "80%",
          backgroundPosition: "center",
          backgroundColor: "rgba(255,255,255,1)", // Cambiado a fondo blanco
        }}
      />
      <div className="container relative z-13 px-14 pt-4 pb-5 mx-auto"> {/* Aumentado el padding top (pt) */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-8 text-5xl font-bold text-brand-blue md:text-6xl font-baloo">
            Creamos espacios felices
          </h2>
          <p className="mb-10 text-xl text-brand-text md:text-2xl font-poppins md:leading-relaxed">
            Transformamos muebles con historia en piezas únicas que le dan vida a tu hogar.
          </p>
          <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
            <Button 
              className="w-full sm:w-auto bg-brand-blue text-white hover:bg-blue-700 text-lg px-8 py-6 font-baloo font-semibold"
              asChild
            >
              <a href="#catalogo">
                Ver catálogo <ArrowRight className="ml-2 h-15 w-5" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto bg-transparent border-brand-blue text-brand-blue hover:bg-brand-blue/10 text-lg px-8 py-6 font-baloo font-semibold"
              asChild
            >
              <a href={whatsappDirectLink} target="_blank" rel="noopener noreferrer">
                Agenda tu cita <Calendar className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
