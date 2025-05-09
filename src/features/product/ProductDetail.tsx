import React, { useEffect, useState } from "react";
import { Product } from "@/types/product.types";
import { getProducts } from "@/services/product.service";

interface ProductDetailProps {
  id: string;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProducts().then(products => {
      const found = products.find(p => p.id === Number(id));
      if (found) {
        setProduct(found);
      } else {
        setError("Producto no encontrado");
      }
    });
  }, [id]);

  if (error) {
    return <div className="text-center text-red-600 py-24">{error}</div>;
  }
  if (!product) {
    return <div className="text-center py-24">Cargando producto...</div>;
  }

  return (
    <section className="py-24 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          {/* Imagen destacada */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg shadow-lg w-full max-w-xs h-auto object-cover"
              onError={e => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder.png"; }}
            />
          </div>
          {/* Info principal */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-4 text-brand-blue">{product.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{product.description}</p>
            <div className="mb-4">
              <span className="text-2xl font-bold text-brand-green">${product.price.toLocaleString()}</span>
            </div>
            <div className="mb-6">
              {product.status === "En stock" ? (
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">En stock</span>
              ) : (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">Agotado</span>
              )}
            </div>
            {/* Botón de compra */}
            {product.status === "En stock" ? (
              <button className="w-full py-3 bg-brand-blue text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition">
                Comprar
              </button>
            ) : (
              <div className="text-red-600 font-semibold mb-2">Este producto no está disponible actualmente</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}; 