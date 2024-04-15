import { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";

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
      <div className="cart-page">
        <h1>Cart</h1>

        <div className="cart-table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td>
                    <img
                      src={cartItem.product.image}
                      alt={cartItem.product.title}
                      style={{ maxWidth: "100px" }}
                    />
                  </td>
                  <td>{cartItem.product.title}</td>
                  <td>${cartItem.product.price.toFixed(2)}</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-quantity"
                        onClick={() => handleQuantityChange(cartItem.id, -1)}
                      >
                        -
                      </button>
                      <p className="my-auto">{cartItem.quantity}</p>
                      <button
                        className="btn btn-quantity"
                        onClick={() => handleQuantityChange(cartItem.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${cartItem.totalPrice.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-close"
                      onClick={() => handleRemoveFromCart(cartItem.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cart-checkout">
          <h4>Total: ${totalPrice.toFixed(2)}</h4>
          <button
            className="btn btn-primary btn-checkout"
            onClick={() => handleCheckout()}
          >
            Checkout
          </button>
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

export default CartPage;
