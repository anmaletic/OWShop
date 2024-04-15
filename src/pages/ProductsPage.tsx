import { useEffect, useState } from "react";
import { Product } from "../interfaces/product";
import { useCart } from "../contexts/CartContext";

const ProductsPage: React.FC = () => {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
      <div className="product-page">
        <h1>Products</h1>
        <ul className="product-grid ">
          {products?.map((product: Product) => (
            <li className="product-card" key={product.id}>
              <div className="product-header">
                <h3>{product.title}</h3>
              </div>
              <div className="product-content">
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>

                <div className="product-description">
                  <p>{product.description}</p>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <p>Category: {product.category}</p>
                  <p>
                    Rating: {product.rating.rate} ({product.rating.count})
                    reviews
                  </p>
                </div>
              </div>
              <div className="d-flex flex-row-reverse">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </li>
          ))}
        </ul>

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
