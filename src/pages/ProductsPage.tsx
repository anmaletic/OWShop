import { Product } from "../interfaces/product";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-xxl py-3">
        <div>
          <h1 className="display-3 text-center">Products</h1>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between my-3">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xxl-4 g-3 justify-content-center ">
            {loading
              ? [...Array(10)].map((_, i) => (
                  <div key={i}>
                    {ProductCard({
                      product: null,
                      key: i,
                      onClick: handleAddToCart,
                    })}
                  </div>
                ))
              : products?.map((product: Product) => (
                  <div key={product.id}>
                    {ProductCard({
                      product,
                      key: product.id,
                      onClick: handleAddToCart,
                    })}
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
