import { ContactForm } from "./ContactForm";

export const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 font-baloo">
            Contáctanos
          </h2>
          <p className="text-gray-600 text-center mb-12 font-poppins">
            ¿Tienes alguna pregunta o necesitas más información? No dudes en contactarnos.
          </p>
          <ContactForm context="contact" />
        </div>
      </div>
    </section>
  );
}; 