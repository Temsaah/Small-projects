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

  function addtoCart(newItem) {
    setCartItems((items) => {
      const itemExist = items.find((item) => item.name === newItem.name);

      if (itemExist) {
        return items.map((item) =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        );
      }

      return [...items, newItem];
    });
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
