import MediaQuery from 'react-responsive';

import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <MediaQuery query="(min-width: 800px)">
          <h1>Welcome to Mashgin Cafe</h1>
        </MediaQuery>
        <MediaQuery query="(max-width: 800px)">
          <h1>Mashgin Cafe</h1>
        </MediaQuery>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </>
  );
};

export default Header;
