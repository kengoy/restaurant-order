import { useState } from 'react';
import Header from './components/Layout/Header';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import AvailableMeals from './components/Meals/AvailableMeals';

function App() {
  // state valirable to show/hide cart on a modal
  const [cartIsShown, setCartIsShown] = useState(false);

  // event handler for user actions to show/hide cart
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <AvailableMeals />
      </main>
    </CartProvider>
  );
}

export default App;
