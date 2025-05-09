import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  quote: string;
  author: string;
  location: string;
}

const TestimonialCard = ({ quote, author, location }: TestimonialProps) => (
  <Card className="h-full">
    <CardContent className="pt-6 relative">
      <Quote className="text-primary/20 absolute top-4 left-4 w-8 h-8" />
      <div className="space-y-4">
        <blockquote className="text-gray-700 italic relative z-10 pt-4">
          "{quote}"
        </blockquote>
        <footer className="text-sm">
          <strong className="font-medium">— {author}</strong>
          <span className="text-muted-foreground ml-1">{location}</span>
        </footer>
      </div>
    </CardContent>
  </Card>
);

interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeText: string;
  afterText: string;
}

const BeforeAfterComparison = ({ beforeImage, afterImage, beforeText, afterText }: BeforeAfterProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-muted/30 p-6 rounded-lg">
    <div className="space-y-3">
      <div className="relative">
        <img 
          src={beforeImage} 
          alt="Antes" 
          className="w-full h-64 object-cover rounded-md" 
        />
        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 text-sm rounded">
          ANTES
        </div>
      </div>
      <p className="text-sm text-gray-600">{beforeText}</p>
    </div>
    
    <div className="space-y-3">
      <div className="relative">
        <img 
          src={afterImage} 
          alt="Después" 
          className="w-full h-64 object-cover rounded-md" 
        />
        <div className="absolute top-4 left-4 bg-primary/70 text-white px-2 py-1 text-sm rounded">
          DESPUÉS
        </div>
      </div>
      <p className="text-sm text-gray-600">{afterText}</p>
    </div>
    
    <div className="md:hidden mx-auto text-primary">
      {/* Compare icon replaced with a simple separator for compatibility */}
      <div className="h-8 w-8 border-t-2 border-primary mx-auto my-2"></div>
    </div>
  </div>
);

export const Testimonials = () => {
  return (
    <section id="testimonios" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Historias que inspiran</h2>
          <p className="text-lg text-gray-700">
            Cada mueble tiene una historia. Estas son algunas de las transformaciones que han hecho felices a nuestros clientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <TestimonialCard 
            quote="Pensé que mi sala ya no tenía salvación. Salahogar no solo la restauró, la transformó. ¡Quedó mejor que nueva!"
            author="Andrea G."
            location="Bogotá"
          />
          <TestimonialCard 
            quote="Ese comedor era de mi abuela. Hoy es parte de nuestra historia familiar renovada."
            author="Julián M."
            location="Pereira"
          />
          <TestimonialCard 
            quote="Los muebles tenían valor sentimental y Salahogar lo entendió. El proceso fue rápido, claro y el resultado… increíble."
            author="Laura C."
            location="Manizales"
          />
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Antes y Después</h3>
          <p className="text-lg text-gray-700">
            Mira cómo transformamos muebles con historia en piezas únicas que dan vida a tu hogar.
          </p>
        </div>
        
        <div className="space-y-16">
          <BeforeAfterComparison 
            beforeImage="https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000" 
            afterImage="https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1000"
            beforeText="Silla dañada con estructura debilitada y tapicería deteriorada"
            afterText="Estructura reforzada y retapizada con tela premium"
          />
          
          <BeforeAfterComparison 
            beforeImage="https://images.unsplash.com/photo-1721322800607-8c38375eef04?q=80&w=1000" 
            afterImage="https://images.unsplash.com/photo-1582562124811-c09040d0a901?q=80&w=1000"
            beforeText="Comedor con superficies desgastadas y manchas"
            afterText="Restaurado con acabados protectores y color renovado"
          />
        </div>
      </div>
    </section>
  );
}; 