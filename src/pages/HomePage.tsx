import { Product } from "../interfaces/product";
import newProductImg from "../assets/newProduct.jpg";
import logoImg from "../assets/owshop_logo.png";
import { useCart } from "../contexts/CartContext";
import ProductCard from "../components/ProductCard";
import { generateUniqueRandomIndexes } from "../utils/util";
import { useProducts } from "../hooks/useProducts";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts();
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    setIndexes(generateUniqueRandomIndexes(3, 19));
  }, [setIndexes]);

  // const indexes = generateUniqueRandomIndexes(3, 19);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-xxl home-page mb-5">
        <div className="landing-page bg-danger">
          <img className="logo-background" src="../vite.svg" />
          <img className="logo-image" src={logoImg} />
        </div>

        <div className="d-flex flex-column flex-md-row justify-content-between my-3">
          <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center">
            {loading
              ? [...Array(3)].map((_, i) => (
                  <div key={i}>
                    {ProductCard({
                      product: null,
                      key: i,
                      onClick: handleAddToCart,
                    })}
                  </div>
                ))
              : indexes.map((index: number) => (
                  <div key={index}>
                    {ProductCard({
                      product: products[index],
                      key: index,
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
