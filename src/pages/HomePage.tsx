import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import newProductImg from "../assets/newProduct.jpg";
import logoImg from "../assets/owshop_logo.png";
import { useCart } from "../contexts/CartContext";
import { fetchProductById } from "../services/apiService";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const generateUniqueRandomIndexes = (
      count: number,
      maxIndex: number
    ): number[] => {
      const indexes = new Set<number>();
      while (indexes.size < count) {
        indexes.add(Math.floor(Math.random() * maxIndex));
      }
      return Array.from(indexes);
    };

    const indexes = generateUniqueRandomIndexes(3, 19);

    const fetchAndSetProducts = async () => {
      const promises = indexes.map(async (productId) => {
        return fetchProductById(productId);
      });

      // simulate loading time
      setTimeout(async () => {
        const tempProduct = await Promise.all(promises);
        setProducts(tempProduct);
      }, 1000);
    };

    fetchAndSetProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <>
      <div className="container-xxl home-page mb-5">
        <div className="landing-page bg-danger">
          <img className="logo-background" src="../vite.svg" />
          <img className="logo-image" src={logoImg} />
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between my-3">
          <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center">
            {products.length === 0
              ? [...Array(3)].map((_, i) => (
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

        <div className="jumbotron">
          <h1 className="new-prod-text">New product</h1>
          <img src={newProductImg} alt="" />
          <h1 className="coming-soon-text">Coming soon</h1>
        </div>
      </div>
    </>
  );
};

export default HomePage;
