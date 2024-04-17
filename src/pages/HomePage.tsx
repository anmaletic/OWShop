import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import newProductImg from "../assets/newProduct.jpg";
import logoImg from "../assets/owshop_logo.png";
import addToCartImg from "../assets/add-to-cart.png";
import { useCart } from "../contexts/CartContext";
import { fetchProducts } from "../services/apiService";

const HomePage = () => {
  const { addToCart } = useCart();
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    const fetchDisplayProducts = async () => {
      setDisplayProducts(await fetchProducts());
    };
    fetchDisplayProducts();

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
    setIndexes(indexes);
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <>
      <div className="container-xxl home-page">
        <div className="landing-page bg-danger">
          <img className="logo-background" src="../vite.svg" />
          <img className="logo-image" src={logoImg} />
        </div>

        <div className="featured-wrapper">
          <h1>Featured products</h1>
          <div className="featured">
            <div className="item">
              <img src={displayProducts[indexes[0]]?.image} alt="prod1" />
              <button
                className="btn btn-secondary btn-buynow"
                onClick={() => handleAddToCart(displayProducts[indexes[0]])}
              >
                <img src={addToCartImg} />
              </button>
            </div>
            <div className="item">
              <img src={displayProducts[indexes[1]]?.image} alt="prod2" />
              <button
                className="btn btn-secondary btn-buynow"
                onClick={() => handleAddToCart(displayProducts[indexes[1]])}
              >
                <img src={addToCartImg} />
              </button>
            </div>
            <div className="item">
              <img src={displayProducts[indexes[2]]?.image} alt="prod3" />
              <button
                className="btn btn-secondary btn-buynow"
                onClick={() => handleAddToCart(displayProducts[indexes[2]])}
              >
                <img src={addToCartImg} />
              </button>
            </div>
          </div>
        </div>

        <div className="jumbotron">
          <h1 className="new-prod-text">New product</h1>
          <img src={newProductImg} alt="" />
          <h1 className="coming-soon-text">Coming soon</h1>
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

export default HomePage;
