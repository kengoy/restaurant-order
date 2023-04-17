import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

/**
 * A meal item component that has a name, a price, and a form to add the item to a cart.
 * @param {Object} props
 * @param {string} props.id - The id of the item.
 * @param {string} props.name - The name of the item.
 * @param {number} props.price - The price of the item.
 * @param {string} props.imageSrc - The image source url path of the item.
 * @returns {JSX.Element}
 */
const MealItem = (props) => {
  // Item will be added to a cart which are accessible through global context
  const cartCtx = useContext(CartContext);

  // Format price to have exact two decimal places with a dollar sign
  const price = `$${props.price.toFixed(2)}`;

  // Event handler to add item to cart by user interaction
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  // Return JSX elments
  return (
    <div className={classes.meal}>
      <img src={props.imageSrc} />
      <div className={classes.iteminfo}>
        <div>
          <h2 className={classes.name}>{props.name}</h2>
          <h3 className={classes.price}>{price}</h3>
        </div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler} />
        </div>
      </div>
    </div>
  );
};

export default MealItem;
