import { useState, useContext, createContext, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage when component mounts
  useEffect(() => {
    const existingItems = localStorage.getItem('cart');
    if (existingItems) {
      try {
        const parsedItems = JSON.parse(existingItems);
        if (Array.isArray(parsedItems)) {
          setCart(parsedItems);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
