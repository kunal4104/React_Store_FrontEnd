/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';

export const CartContext = React.createContext();

export const CartProvider = (props) => {
  const [Cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};
