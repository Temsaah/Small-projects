import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  /*
  {
    name: "Fall Limited Edition Sneakers"
    thumbnail: ".jpg"
    price: 125.00,
    quantity: 3
  }

  */

  function addtoCart(item) {
    setCartItems((items) => [...items, item]);
  }

  function removeFromCart(itemName) {
    setCartItems((items) => items.filter((item) => item.name !== itemName));
  }

  const value = {
    cartItems,
    addtoCart,
    removeFromCart,
    showCart,
    setShowCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
