import React, { createContext, useState, useEffect } from 'react';
import { cartCounts } from '../Api/cart';


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [count, setCount] = useState(0);

  const userId = '6667454f926ecee4d29cac2d'; // Replace with actual user ID or get it dynamically

  const fetchCartCount = async () => {
    const id = '6667454f926ecee4d29cac2d';
    try {
      const res = await cartCounts(id);
      console.log(res, 'ooooooo...oooooo');
      setCount(res.data.itemCount); // Assuming the count is in res.data.count
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ count, fetchCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
