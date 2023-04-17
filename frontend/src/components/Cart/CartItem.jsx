import classes from './CartItem.module.css';
import { BsFillTrashFill } from 'react-icons/Bs';

/**
 * A cart item component that has a name, a price, amount selection buttons, and a remove button.
 * @param {*} props
 * @param {string} props.name - The name of the item.
 * @param {number} props.price - The price of the item.
 * @param {number} props.amount - The amount of the item.
 * @param {JSX} props.onAdd - Callback function to add the item.
 * @param {JSX} props.onRemove - Callback function to remove the item.
 * @returns {JSX.Element}
 */
const CartItem = (props) => {
  // Format price to have exact two decimal places with a dollar sign
  const price = `$${props.price.toFixed(2)}`;

  // Return JSX elements
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>
          {props.amount === 1 ? <BsFillTrashFill /> : '−'}
        </button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
