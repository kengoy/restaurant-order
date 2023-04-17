import MediaQuery from 'react-responsive';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

/**
 * A header component that has a title and a cart button.
 * @param {Object} props - The props object.
 * @param {string} props.title - The title of the header.
 * @param {string} props.titleShort - The short title of the header for mobile screen.
 * @param {Function} props.onShowCart - Callback function to show the cart.
 * @returns {JSX.Element}
 */
const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <MediaQuery query="(min-width: 800px)">
          <h1>{props.title}</h1>
        </MediaQuery>
        <MediaQuery query="(max-width: 800px)">
          <h1>{props.titleShort}</h1>
        </MediaQuery>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </>
  );
};

export default Header;
