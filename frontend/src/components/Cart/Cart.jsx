import { useContext, useState } from 'react';
import axios from 'axios';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import PaymentForm from './PaymentForm';

// server url base is configured in .env
const SERVER_API_BASE = import.meta.env.VITE_ORDER_SYSTEM_API_BASE_URL;
const SERVER_API_ORDER = SERVER_API_BASE + 'v1/order';

const Cart = (props) => {
  // state variables for checkout
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [didOrder, setDidOrder] = useState(false);
  const [httpError, setHttpError] = useState(null);

  // Items in a cart are accessible through global context
  const cartCtx = useContext(CartContext);

  // Float substraction sometimes causes negative value when user decreases amount and 0 for all items, hence abs is necessary.
  const totalAmount = `$${Math.abs(cartCtx.totalAmount.toFixed(2))}`;
  const hasItems = cartCtx.items.length > 0;

  // Event handlers for use actions
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const checkoutHandler = () => {
    setIsCheckout(true);
  };

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

  const closeOrderHandler = () => {
    setIsCheckout(false);
    setDidOrder(false);
    cartCtx.clearItem();
    props.onClose();
  };

  // JSX
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

  const isPlacingModalContent = <p>Sending order data...</p>;

  const didPlaceModalContent = (
    <>
      <p>Sent the order! Please wait for your meals served.</p>
      <div className={classes.actions}>
        <button onClick={closeOrderHandler}>OK</button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isOrdering && !didOrder && cartModalContent}
      {isOrdering && isPlacingModalContent}
      {!isOrdering && didOrder && didPlaceModalContent}
    </Modal>
  );
};

export default Cart;
