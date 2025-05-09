export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  status: "En stock" | "Agotado";
  category: "basecamas" | "salas" | "comedores" | "colchones";
  color?: string;
} 