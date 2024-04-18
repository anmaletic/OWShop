import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import { useCart } from "../contexts/CartContext";
import { fetchProducts } from "../services/apiService";
import ProductCard from "../components/ProductCard";

const ProductsPage: React.FC = () => {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // simulate loading time
    setTimeout(async () => {
      setProducts(await fetchProducts());
    }, 1000);

    // const fetchDisplayProducts = async () => {
    //   setProducts(await fetchProducts());
    // };
    // fetchDisplayProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  // debug cartItems
  useEffect(() => {
    console.log(cartItems.length);
  }, [cartItems]);

  return (
    <>
      <div className="container-xxl py-3">
        <div>
          <h1 className="display-3 text-center">Products</h1>
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between my-3">
          <div className="row row-cols-1 row-cols-md-3 row-cols-xxl-4 g-3 justify-content-center ">
            {products.length === 0
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

        <div className="footer">
          <div>
            <p>OWShop © 2024 OWShop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
