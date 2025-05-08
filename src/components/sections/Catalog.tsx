
import { ProductCard } from "@/components/ProductCard";

const products = [
  {
    id: 1,
    name: "Sofá Vintage",
    description: "Sofá de 3 puestos en madera y tapizado en lino",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "Mesa de Comedor Rústica",
    description: "Mesa para 6 personas en madera de roble",
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "Basecama Elegante",
    description: "Basecama doble en madera de pino con acabado natural",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    name: "Silla Clásica",
    description: "Silla tapizada con patas en madera maciza",
    image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

export const Catalog = () => {
  return (
    <section id="catalogo" className="py-24 bg-gray-50 mt-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-baloo font-bold mb-6 text-brand-blue">Nuestros muebles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-poppins">
            Cada pieza que ofrecemos ha sido pensada para acompañarte en tu hogar: basecamas, salas, 
            comedores y colchones con diseño funcional y estilo propio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
