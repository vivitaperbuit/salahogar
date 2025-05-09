import { useEffect, useState } from "react";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product.types";
import { ProductCard } from "./ProductCard";
import { useNavigate } from "react-router-dom";

export const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // Obtener colores únicos
  const colors = Array.from(new Set(products.map(p => p.color).filter(Boolean)));

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase()) ||
      (product.color?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesCategory = !category || product.category === category;
    const matchesColor = !color || product.color === color;
    return matchesSearch && matchesCategory && matchesColor;
  });

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

        {/* Barra de filtros y búsqueda moderna */}
        <div className="mb-8 p-4 bg-white rounded-lg shadow flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Buscar por nombre, color o tipo..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-brand-blue"
              aria-label="Buscar productos"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">
              <svg width="20" height="20" fill="none" stroke="currentColor"><path d="M19 19l-4-4m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </span>
          </div>
          <select
            value={category ?? ""}
            onChange={e => setCategory(e.target.value || null)}
            className="border rounded px-4 py-2 focus:ring-2 focus:ring-brand-blue"
            aria-label="Filtrar por categoría"
          >
            <option value="">Todas las categorías</option>
            <option value="basecamas">Basecamas</option>
            <option value="salas">Salas</option>
            <option value="comedores">Comedores</option>
            <option value="colchones">Colchones</option>
          </select>
          {colors.length > 0 && (
            <select
              value={color ?? ""}
              onChange={e => setColor(e.target.value || null)}
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-brand-blue"
              aria-label="Filtrar por color"
            >
              <option value="">Todos los colores</option>
              {colors.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          )}
          {(search || category || color) && (
            <button
              onClick={() => { setSearch(""); setCategory(null); setColor(null); }}
              className="text-sm text-brand-blue underline ml-2"
              aria-label="Limpiar filtros"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Resultados filtrados */}
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-12" role="status">
            No se encontraron productos con los criterios seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                image={product.image}
                onClick={() => navigate(`/producto/${product.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}; 