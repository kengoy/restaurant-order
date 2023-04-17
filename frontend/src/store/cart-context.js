import React from 'react';

/**
 * A context object that will be used to share data between components.
 * @param {Object} items - An array of objects that represent the items in the cart.
 * @param {number} totalPrice - The total price of the items in the cart.
 * @param {Function} addItem - A function that adds an item to the cart.
 * @param {Function} removeItem - A function that removes an item from the cart.
 */
const CartContext = React.createContext({
  items: [],
  totalPrice: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

export default CartContext;
