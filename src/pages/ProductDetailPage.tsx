import { useParams } from "react-router-dom";
import { ProductDetail } from "@/features/product/ProductDetail";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <div>Producto no encontrado</div>;
  return <ProductDetail id={id} />;
};

export default ProductDetailPage; 