import { useReducer } from 'react';

import CartContext from './cart-context';

const CART_ACTION = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  CLEAR: 'CLEAR',
};

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  // Add item to cart
  if (action.type === CART_ACTION.ADD) {
    // Update total Price including new item(s)
    const updatedTotalPrice =
      state.totalPrice + action.item.price * action.item.amount;

    // Find if the item is already in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    // If the item is already in the cart, update the amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // If the item is not in the cart, add the item
      updatedItems = state.items.concat(action.item);
    }

    // Return updated items and total price
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }

  // Remove item from cart
  if (action.type === CART_ACTION.REMOVE) {
    // Find the item in the cart
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalPrice = state.totalPrice - existingCartItem.price;
    let updatedItems;

    // If the item is the only item in the cart, remove the item
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      // If the item has multiple amounts, decrease the amount
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // Return updated items and total price
    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
    };
  }

  // Clear cart
  if (action.type === CART_ACTION.CLEAR) {
    return defaultCartState;
  }

  // Return default state
  return defaultCartState;
};

/**
 * A provider for Cart Context
 * @param {Object} props
 * @param {JSX.Element} props.children
 * @returns {JSX.Element}
 */
const CartProvider = (props) => {
  // Use reducer to manage cart state
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // Event handlers
  // addItemToCartHandler: dispatch an action to add item to cart
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: CART_ACTION.ADD, item: item });
  };

  // removeItemFromCartHandler: dispatch an action to remove item from cart
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: CART_ACTION.REMOVE, id: id });
  };

  // clearItemFromCartHandler: dispatch an action to clear cart
  const clearItemFromCartHandler = () => {
    dispatchCartAction({ type: CART_ACTION.CLEAR });
  };

  // Cart context object with event handlers
  const cartContext = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearItem: clearItemFromCartHandler,
  };

  // Return props.children JSX elements wrapped byCartContext.Provider
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
