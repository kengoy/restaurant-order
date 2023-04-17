import { useContext, useState } from 'react';
import axios from 'axios';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import PaymentForm from './PaymentForm';

// Server url base is configured in .env
const SERVER_API_BASE = import.meta.env.VITE_ORDER_SYSTEM_API_BASE_URL;
const SERVER_API_ORDER = SERVER_API_BASE + 'v1/order';

/**
 * A cart component that shows the items in the cart and the total amount.
 * @param {Object} props - The props object.
 * @param {JSX} props.onClose - Callback function to close the cart.
 * @returns {JSX.Element}
 */
const Cart = (props) => {
  // State variables for checkout
  // isCheckout: whether the cart is in checkout mode
  const [isCheckout, setIsCheckout] = useState(false);
  // isOrdering: whether the cart is in ordering mode
  const [isOrdering, setIsOrdering] = useState(false);
  // didOrder: whether the cart is in order complete mode
  const [didOrder, setDidOrder] = useState(false);
  // httpError: error message from http request
  const [httpError, setHttpError] = useState(null);

  // Items in a cart are accessible through global context
  // cartCtx is an object that has items and totalAmount
  const cartCtx = useContext(CartContext);

  // Float substraction sometimes causes negative value when user decreases amount and 0 for all items, hence abs is necessary.
  // Also, toFixed is necessary to avoid floating point error.
  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;
  const hasItems = cartCtx.items.length > 0;

  // Event handlers for use actions
  // Event handler when user clicks '-' button
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  // Event handler when user clicks '-' button
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // Event handler when user clicks the 'Checkout' button
  const checkoutHandler = () => {
    setIsCheckout(true);
  };

  // Event handler when user clicks the 'Place Order' button
  const placeOrderHandler = (paymentFormData) => {
    setIsOrdering(true);
    axios
      .post(SERVER_API_ORDER, {
        items: cartCtx.items,
        paymentMethod: paymentFormData,
        totalAmount: totalAmount,
      })
      .then((response) => {
        const data = response.data;
        if (data.status !== 'success')
          throw Error('Something went wrong when placing order.');
        setDidOrder(true);
      })
      .catch((error) => {
        console.log('place order failed:', error);
        setHttpError(error.message);
      })
      .finally(() => {
        setIsOrdering(false);
      });
  };

  // Event handler when user clicks the 'Close' button
  const closeOrderHandler = () => {
    setIsCheckout(false);
    setDidOrder(false);
    cartCtx.clearItem();
    props.onClose();
  };

  // JSX elements for rendering cart items
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // JSX elements for rendering action buttonss
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={checkoutHandler}>
          Checkout
        </button>
      )}
    </div>
  );

  // JSX elements for rendering modal content: cart items, total amount, payment form, error message, and action buttonss
  const cartModalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total</span>
        <span>{totalAmount}</span>
      </div>
      {!hasItems && <p>Your cart is empty. Add items to get started.</p>}
      <div className={classes.checkout}>
        {isCheckout && hasItems && (
          <PaymentForm onCancel={props.onClose} onConfirm={placeOrderHandler} />
        )}
        {httpError && (
          <div className={classes.error}>
            <p>{httpError}. Check your network connection.</p>
          </div>
        )}
      </div>
      {isCheckout && !hasItems && modalActions}
      {!isCheckout && modalActions}
    </>
  );

  // JSX elements for rendering ordering status
  const isPlacingModalContent = <p>Sending order data...</p>;

  // JSX elements for rendering order complete status
  const didPlaceModalContent = (
    <>
      <p>Order has been placed!</p>
      <p>
        Your meal will be ready in about 20 minutes. Pick up them on the
        counter.
      </p>
      <div className={classes.actions}>
        <button onClick={closeOrderHandler}>OK</button>
      </div>
    </>
  );

  // Return JSX elements for rendering modal
  return (
    <Modal onClose={props.onClose}>
      {!isOrdering && !didOrder && cartModalContent}
      {isOrdering && isPlacingModalContent}
      {!isOrdering && didOrder && didPlaceModalContent}
    </Modal>
  );
};

export default Cart;
