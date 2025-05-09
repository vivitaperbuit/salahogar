import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  description: string;
  onClick?: () => void;
}

export const ProductCard = ({ id, image, name, description, onClick }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={onClick}>
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-xl font-baloo font-semibold mb-2 text-brand-blue">{name}</h3>
        <p className="text-brand-text font-poppins">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-brand-green hover:bg-green-600 font-baloo">
          Comprar
          <ShoppingCart className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}; 