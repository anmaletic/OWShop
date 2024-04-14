import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import newProductImg from "../assets/newProduct.jpg";
import logoImg from "../assets/owshop_logo.png";
import addToCartImg from "../assets/add-to-cart.png";

const HomePage = () => {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [indexes, setIndexes] = useState<number[]>([]);

  useEffect(() => {
    const getDisplayProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setDisplayProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getDisplayProducts();

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

  return (
    <>
      <div className="home-page">
        <div className="landing-page bg-danger">
          <img className="logo-background" src="../vite.svg" />
          <img className="logo-image" src={logoImg} />
        </div>

        <div className="featured-wrapper">
          <h1>Featured products</h1>
          <div className="featured">
            <div className="item">
              <img src={displayProducts[indexes[0]]?.image} alt="prod1" />
              <button className="btn btn-secondary btn-buynow">
                <img src={addToCartImg} />
              </button>
            </div>
            <div className="item">
              <img src={displayProducts[indexes[1]]?.image} alt="prod2" />
              <button className="btn btn-secondary btn-buynow">
                <img src={addToCartImg} />
              </button>
            </div>
            <div className="item">
              <img src={displayProducts[indexes[2]]?.image} alt="prod3" />
              <button className="btn btn-secondary btn-buynow">
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
