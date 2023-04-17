import { useContext, useEffect, useState } from 'react';
import { BsFillCartFill } from 'react-icons/Bs';

import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  // state variable to be used for controlling animation of the cart button when user add items
  const [isCartItemsUpdated, setIsCartItemsUpdated] = useState(false);

  // cart can be accessed through global context
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  // count sum of the items added in the cart considering multiple amounts per an item
  const numCartItems = cartCtx.items.reduce((currNum, item) => {
    return (currNum += item.amount);
  }, 0);

  const btnClasses = `${classes.button} ${
    isCartItemsUpdated ? classes.bump : ''
  }`;

  useEffect(() => {
    if (items.length === 0) return;

    // trigger bumb animation when items are added
    setIsCartItemsUpdated(true);

    // resetting the state right away for next animation trigger
    const timer = setTimeout(() => {
      setIsCartItemsUpdated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <BsFillCartFill />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
