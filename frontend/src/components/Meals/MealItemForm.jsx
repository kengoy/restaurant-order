import { useState } from 'react';

import classes from './MealItemForm.module.css';

const MAX_MEAL_ITEM_AMOUNT = 50;

/**
 * A form component that has an amount selection buttons and an add button.
 * @param {Object} props
 * @param {Function} props.onAddToCart - Callback function to add the item to cart.
 * @returns {JSX.Element}
 * @returns
 */
const MealItemForm = (props) => {
  // State variables
  // amount: the amount of the item
  const [amount, setAmount] = useState(1);
  const [message, setMessage] = useState(null);

  // Event handlers
  // submitHandler: event handler to add item to cart by user interaction
  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(amount);
    // reset amount to 1 in default
    setAmount(1);
  };

  // increaseAmount: event handler to increase the amount of the item
  const increaseAmount = () => {
    // if the amount is beyond the maximum, show message to users
    if (amount === MAX_MEAL_ITEM_AMOUNT) {
      setMessage('Contact a staff for your special order.');
      return;
    } else {
      setMessage(null);
    }
    setAmount(amount + 1);
  };

  // decreaseAmount: event handler to decrease the amount of the item
  const decreaseAmount = () => {
    setMessage(null);
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

  // Return JSX elements
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.amount}>
        <button type="button" onClick={decreaseAmount}>
          −
        </button>
        <span>{amount}</span>
        <button type="button" onClick={increaseAmount}>
          +
        </button>
      </div>
      <div className={classes.add}>
        <button type="submit">Add to cart </button>
      </div>
      {message && <span>{message}</span>}
    </form>
  );
};

export default MealItemForm;
