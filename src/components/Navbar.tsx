import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-md' : 'bg-white/80'
    } backdrop-blur-md border-b border-gray-100`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/Logo-Sala-hogar.png" 
                alt="Salahogar Logo" 
                className="h-10 sm:h-12 transition-all duration-300"
              />
              <h1 className="text-lg sm:text-xl font-baloo font-bold text-brand-green hidden sm:block">Salahogar</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 font-poppins">
            <a href="#inicio" className="text-gray-600 hover:text-brand-blue transition-colors duration-300">Inicio</a>
            <a href="#catalogo" className="text-gray-600 hover:text-brand-blue transition-colors duration-300">Catálogo</a>
            <a href="#servicios" className="text-gray-600 hover:text-brand-blue transition-colors duration-300">Servicios</a>
            <a href="#nosotros" className="text-gray-600 hover:text-brand-blue transition-colors duration-300">Nosotros</a>
            <a href="#testimonios" className="text-gray-600 hover:text-brand-blue transition-colors duration-300">Testimonios</a>
            <a href="#contacto" className="text-gray-600 hover:text-brand-blue transition-colors duration-300">Contacto</a>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              className="text-brand-blue hover:bg-brand-blue/10"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3 font-poppins">
            <a 
              href="#inicio" 
              className="text-gray-600 hover:text-brand-blue py-2 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Inicio
            </a>
            <a 
              href="#catalogo" 
              className="text-gray-600 hover:text-brand-blue py-2 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Catálogo
            </a>
            <a 
              href="#servicios" 
              className="text-gray-600 hover:text-brand-blue py-2 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Servicios
            </a>
            <a 
              href="#nosotros" 
              className="text-gray-600 hover:text-brand-blue py-2 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Nosotros
            </a>
            <a 
              href="#testimonios" 
              className="text-gray-600 hover:text-brand-blue py-2 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonios
            </a>
            <a 
              href="#contacto" 
              className="text-gray-600 hover:text-brand-blue py-2 transition-colors duration-300" 
              onClick={() => setIsMenuOpen(false)}
            >
              Contacto
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
