import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './store/uiSlice';

function App() {
  const showCart = useSelector(store => store.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      try {
        const response = await fetch("https://advance-redux-8144d-default-rtdb.firebaseio.com//cart.json", {
          method: "PUT",
          body: JSON.stringify(cart)
        })
        if(!response.ok){
          dispatch(uiActions.showNotification({
            status:"pending",
            title:"Error!",
            message:"Sending cart Data failed!"
          }))
        }
      } catch (err) {

      }

    }
    sendCartData();

  }, [cart])
  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
