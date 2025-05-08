
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/70d5e515-c731-4a2d-b156-75206b9d0f84.png" 
              alt="Salahogar Logo" 
              className="h-12"
            />
            <h1 className="text-xl font-baloo font-bold text-brand-green hidden sm:block">Salahogar</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 font-poppins">
          <a href="#inicio" className="text-gray-600 hover:text-brand-blue">Inicio</a>
          <a href="#catalogo" className="text-gray-600 hover:text-brand-blue">Catálogo</a>
          <a href="#servicios" className="text-gray-600 hover:text-brand-blue">Servicios</a>
          <a href="#nosotros" className="text-gray-600 hover:text-brand-blue">Nosotros</a>
          <a href="#testimonios" className="text-gray-600 hover:text-brand-blue">Testimonios</a>
          <a href="#contacto" className="text-gray-600 hover:text-brand-blue">Contacto</a>
        </div>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            className="text-brand-blue"
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4 font-poppins">
            <a href="#inicio" className="text-gray-600 hover:text-brand-blue py-2" onClick={() => setIsMenuOpen(false)}>Inicio</a>
            <a href="#catalogo" className="text-gray-600 hover:text-brand-blue py-2" onClick={() => setIsMenuOpen(false)}>Catálogo</a>
            <a href="#servicios" className="text-gray-600 hover:text-brand-blue py-2" onClick={() => setIsMenuOpen(false)}>Servicios</a>
            <a href="#nosotros" className="text-gray-600 hover:text-brand-blue py-2" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
            <a href="#testimonios" className="text-gray-600 hover:text-brand-blue py-2" onClick={() => setIsMenuOpen(false)}>Testimonios</a>
            <a href="#contacto" className="text-gray-600 hover:text-brand-blue py-2" onClick={() => setIsMenuOpen(false)}>Contacto</a>
          </div>
        </div>
      )}
    </nav>
  );
};
