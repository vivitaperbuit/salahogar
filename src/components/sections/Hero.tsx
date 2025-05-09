import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=2070&auto=format&fit=crop",
    alt: "Mueble vintage restaurado",
    frase: "Creamos espacios felices"
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop",
    alt: "Sala de estar con muebles restaurados",
    frase: "Renueva tu hogar con piezas únicas"
  },
  {
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2070&auto=format&fit=crop",
    alt: "Detalle de mueble restaurado",
    frase: "Dale vida a tus muebles con historia"
  },
  {
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    alt: "Mueble restaurado color madera",
    frase: "Transformamos tu espacio con amor y diseño"
  }
];

export const Hero = () => {
  const whatsappDirectLink = "https://wa.me/573002654145?text=Hola%2C%20estoy%20interesado(a)%20en%20cotizar%20la%20restauraci%C3%B3n%20de%20un%20mueble%20con%20Salahogar.%20%C2%BFPodemos%20agendar%20una%20cita%3F%20Gracias%20%F0%9F%98%8A";
  const carouselApi = useRef<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  // Actualiza el índice del slide actual cuando cambia el carrusel
  useEffect(() => {
    if (!carouselApi.current) return;
    const onSelect = () => {
      setCurrent(carouselApi.current?.selectedScrollSnap() ?? 0);
    };
    carouselApi.current.on("select", onSelect);
    return () => {
      carouselApi.current && carouselApi.current.off("select", onSelect);
    };
  }, []);

  // Autoplay effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApi.current) {
        carouselApi.current.scrollNext();
      }
    }, 10000); // Cambia de slide cada 10 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative w-full h-screen">
      <Carousel
        opts={{ loop: true }}
        setApi={(api) => { carouselApi.current = api; }}
        className="w-full h-full"
      >
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-screen">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white/70" />
                {/* Frase personalizada para cada slide */}
                {current === index && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                    <h2 className="mb-6 text-4xl font-bold text-brand-blue sm:text-5xl md:text-6xl font-baloo drop-shadow-lg">
                      {image.frase || "Frase por defecto"}
                    </h2>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="!z-20 absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
        <CarouselNext className="!z-20 absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
      </Carousel>

      <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none pb-24">
        <div className="container px-4 mx-auto text-center sm:px-6 lg:px-8 pointer-events-auto">
          <div className="max-w-3xl mx-auto">
            <p className="mb-8 text-lg text-brand-text sm:text-xl md:text-2xl font-poppins leading-relaxed">
              Transformamos muebles con historia en piezas únicas que le dan vida a tu hogar.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 sm:flex-row">
              <Button 
                className="w-full sm:w-auto bg-brand-blue text-white hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-baloo font-semibold transition-all duration-300"
                asChild
              >
                <a href="#catalogo">
                  Ver catálogo <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto bg-transparent border-brand-blue text-brand-blue hover:bg-brand-blue/10 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-baloo font-semibold transition-all duration-300"
                asChild
              >
                <a href={whatsappDirectLink} target="_blank" rel="noopener noreferrer">
                  Agenda tu cita <Calendar className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
