import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';

function App() {
  const showCart = useSelector(store => store.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    const sendCartData = async () => {
      try {
        fetch("https://advance-redux-8144d-default-rtdb.firebaseio.com//cart.json", {
          method: "PUT",
          body: JSON.stringify(cart)
        })
      } catch (err) {

      }

    }

  }, [cart])
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
