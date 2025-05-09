import { Facebook, Instagram } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-baloo font-bold mb-4 text-brand-green">Salahogar</h3>
            <p className="text-gray-300 font-poppins">
              Transformamos muebles con historia en piezas únicas que le dan vida a tu hogar.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-baloo font-bold mb-4 text-brand-green">Contacto</h3>
            <ul className="space-y-2 text-gray-300 font-poppins">
              <li>Pereira, Colombia</li>
              <li>contacto@salahogar.com</li>
              <li>+57 305 444 2883</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-baloo font-bold mb-4 text-brand-green">Síguenos</h3>
            <div className="flex flex-col space-y-2 font-poppins">
              <a href="https://www.instagram.com/salahogarpereira" className="text-white hover:text-brand-green flex items-center" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <Instagram size={18} className="mr-2" />
                @salahogarpereira
              </a>
              <a href="https://www.facebook.com/salahogarcolombia" className="text-white hover:text-brand-green flex items-center" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <Facebook size={18} className="mr-2" />
                Salahogar Pereira
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 font-poppins">
          <p>© {currentYear} Salahogar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}; 