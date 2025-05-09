import { Phone, Search, Wrench, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  imageSrc: string;
  isLast?: boolean;
}

const ProcessStep = ({ icon, title, description, step, imageSrc, isLast = false }: ProcessStepProps) => (
  <div className="flex flex-col md:flex-row items-start gap-6 mb-12">
    <div className="relative flex flex-col items-center mr-6">
      <div className="bg-primary/10 p-4 rounded-full">
        {icon}
      </div>
      {!isLast && (
        <div className="h-full w-0.5 bg-primary/20 absolute top-16 bottom-0 left-1/2 -translate-x-1/2 hidden md:block" />
      )}
    </div>
    
    <div className="flex-1">
      <div className="text-sm font-medium text-primary/70 mb-1">Paso {step}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <div className="w-full md:max-w-xs overflow-hidden rounded-lg shadow-md">
        <AspectRatio ratio={4/3}>
          <img 
            src={imageSrc} 
            alt={`Paso ${step}: ${title}`}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </AspectRatio>
      </div>
    </div>
  </div>
);

export const WorkProcess = () => {
  const processSteps = [
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: "Nos contactas",
      description: "Escríbenos por WhatsApp o a través del formulario y cuéntanos sobre tu mueble.",
      step: 1,
      imageSrc: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Search className="h-6 w-6 text-primary" />,
      title: "Evaluamos",
      description: "Recibimos fotos, medimos el daño y te damos una cotización personalizada.",
      step: 2,
      imageSrc: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Wrench className="h-6 w-6 text-primary" />,
      title: "Restauramos",
      description: "Nuestro equipo trabaja en tu mueble como si fuera propio: con detalle, técnica y cariño.",
      step: 3,
      imageSrc: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Entregamos como nuevo",
      description: "Coordinamos la entrega en perfecto estado, listo para seguir siendo parte de tu historia.",
      step: 4,
      imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section id="proceso" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Tu mueble, nuestra misión</h2>
          <p className="text-lg text-gray-700">
            Cada restauración es única, pero nuestro proceso siempre es claro y cuidadoso. Así trabajamos en Salahogar:
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={step.step}
              imageSrc={step.imageSrc}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 