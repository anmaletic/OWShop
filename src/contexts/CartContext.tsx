import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "../interfaces/cartItem";
import { Product } from "../interfaces/product";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, newQuantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItemQuantity: () => {},
  clearCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

interface Props {
  children: ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
    JSON.parse(localStorage.getItem("cartItems") || "[]")
  );
  const maxId =
    cartItems.length > 0 ? Math.max(...cartItems.map((item) => item.id)) : 0;

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      updateItemQuantity(existingItem.id, 1);
    } else {
      const newItem: CartItem = {
        id: maxId + 1,
        product: product,
        quantity: 1,
        totalPrice: product.price * 1,
      };
      addItem(newItem);
    }
  };

  const addItem = (product: CartItem) => {
    setCartItems((prevCartItems) => [...prevCartItems, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateItemQuantity = (productId: number, amount: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + amount,
                totalPrice: item.product.price * (item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
