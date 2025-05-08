import { Sofa } from "lucide-react";

export const About = () => {
  return (
    <section id="nosotros" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-baloo font-bold mb-8 text-brand-blue">�Qui�nes somos?</h2>
          <div className="space-y-6 text-lg text-brand-text font-poppins">
            <p>
              Salahogar nace con el prop�sito de honrar la historia de los espacios.
            </p>
            <p>
              Valoramos cada mueble por lo que representa y lo convertimos en algo nuevo, 
              sin que pierda su esencia.
            </p>
            <p>
              Somos un emprendimiento colombiano, con manos que restauran y un coraz�n que dise�a.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-12">
            <Sofa className="text-brand-blue h-6 w-6" />
            <h2 className="text-3xl font-baloo font-bold text-center text-brand-blue">
              Nuestra Misi�n
            </h2>
            <Sofa className="text-brand-blue h-6 w-6" />
          </div>
          
          <div className="space-y-6 text-lg text-brand-text font-poppins">
            <p>
              Nuestra misi�n es dar nueva vida a los muebles con historia, preservando su esencia
              mientras los adaptamos a espacios contempor�neos.
            </p>
            <p>
              Creemos que cada pieza tiene una historia que contar y merece una segunda oportunidad.
            </p>
            <p>
              A trav�s de nuestro trabajo artesanal, mantenemos vivos recuerdos 
              y creamos nuevos espacios llenos de car�cter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
