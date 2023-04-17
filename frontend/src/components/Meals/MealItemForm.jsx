import { useState } from 'react';

import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1);

  const submitHandler = (event) => {
    event.preventDefault();
    props.onAddToCart(amount);
    setAmount(1);
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount <= 1) return;
    setAmount(amount - 1);
  };

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
    </form>
  );
};

export default MealItemForm;
