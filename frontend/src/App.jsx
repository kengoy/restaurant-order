import { useState } from 'react';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import AvailableMeals from './components/Meals/AvailableMeals';

function App() {
  // State valirable to show/hide cart on a modal
  const [cartIsShown, setCartIsShown] = useState(false);

  // Event handlers
  // showCartHandler: event handler to show cart
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  // hideCartHandler: event handler to hide cart
  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  // Return JSX elements
  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header
        title="Welcome to Mashgin Cafe"
        titleShort="Mashgin Cafe"
        onShowCart={showCartHandler}
      />
      <main>
        <AvailableMeals />
      </main>
    </CartProvider>
  );
}

export default App;
