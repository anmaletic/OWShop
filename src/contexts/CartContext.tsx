import { ReactNode, createContext, useContext, useState } from "react";
import { CartItem } from "../interfaces/cartItem";
import { Product } from "../interfaces/product";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: number) => void;
  updateItemQuantity: (itemId: number, newQuantity: number) => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateItemQuantity: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

interface Props {
  children: ReactNode;
}

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      updateItemQuantity(existingItem.id, 1);
    } else {
      const newItem: CartItem = {
        id: cartItems.length + 1,
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

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateItemQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
