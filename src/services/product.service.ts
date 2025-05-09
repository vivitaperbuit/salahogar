import { Product } from "@/types/product.types";

// Mock de productos (simula respuesta de una API REST)
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Sofá Vintage",
    description: "Sofá de 3 puestos en madera y tapizado en lino",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
    price: 1200000,
    status: "En stock",
    category: "salas",
    color: "azul"
  },
  {
    id: 2,
    name: "Mesa de Comedor Rústica",
    description: "Mesa para 6 personas en madera de roble",
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc",
    price: 950000,
    status: "En stock",
    category: "comedores",
    color: "madera"
  },
  {
    id: 3,
    name: "Basecama Elegante",
    description: "Basecama doble en madera de pino con acabado natural",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    price: 800000,
    status: "Agotado",
    category: "basecamas",
    color: "blanco"
  },
  {
    id: 4,
    name: "Silla Clásica",
    description: "Silla tapizada con patas en madera maciza",
    image: "https://images.unsplash.com/photo-1551298370-9d3d53740c72",
    price: 350000,
    status: "En stock",
    category: "salas",
    color: "gris"
  }
];

// Simula una llamada a API REST
export function getProducts(): Promise<Product[]> {
  return Promise.resolve(mockProducts);
} 