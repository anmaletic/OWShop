import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { CartItem } from "../interfaces/cartItem";

const CartPage: React.FC = () => {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } =
    useCart();
  const [totalPrice, setTotalPrice] = useState(0.0);

  const handleQuantityChange = (id: number, val: number) => {
    updateItemQuantity(id, val);
  };

  const handleRemoveFromCart = (id: number) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    clearCart();
  };

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
    setTotalPrice(total);
  }, [cartItems]);

  return (
    <>
      <div className="container-xxl cart-page">
        <div>
          <h1 className="display-3 text-center">Cart</h1>
        </div>

        <ul className="cart-grid">
          {cartItems?.map((item: CartItem) => (
            <li className="card border-1 my-1 p-1" key={item.id}>
              <div className="card-title">
                <h5>{item.product.title}</h5>
              </div>
              <div className="cart-item-content">
                <div className="cart-item-image">
                  <img src={item.product.image} alt={item.product.title} />
                </div>

                <div className="cart-item-details">
                  <button
                    className="btn btn-close"
                    onClick={() => handleRemoveFromCart(item.id)}
                  />
                  <p>Total Price: ${item.totalPrice.toFixed(2)}</p>
                  <div className="d-flex">
                    <p>Quantity: </p>
                    <button
                      className="btn btn-quantity-left cart-item-quantity"
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      -
                    </button>
                    <p className=" cart-item-quantity">{item.quantity}</p>
                    <button
                      className="btn btn-quantity-right cart-item-quantity"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <p>Price: ${item.product.price.toFixed(2)}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-checkout">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <button
            className="btn btn-primary btn-checkout"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
