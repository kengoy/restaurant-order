import { useContext } from 'react';

import CartContext from '../../store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = (props) => {
  // item will be added to a cart which are accessible through global context
  const cartCtx = useContext(CartContext);

  const price = `$${props.price.toFixed(2)}`;

  // event handler to add item to cart by user interaction
  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

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
