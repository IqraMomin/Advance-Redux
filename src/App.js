import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from './store/uiSlice';
import Notification from "./components/UI/Notification"
function App() {
  const showCart = useSelector(store => store.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      try {
        dispatch(uiActions.showNotification({
          status:"pending",
          title:"Sending...!",
          message:"Sending cart Data"
        }))
        const response = await fetch("https://advance-redux-8144d-default-rtdb.firebaseio.com//cart.json", {
          method: "PUT",
          body: JSON.stringify(cart)
        })
        if(!response.ok){
          throw new Error("Sending cart data failed!")
        }
        dispatch(uiActions.showNotification({
          status:"success",
          title:"Success!",
          message:"Sending cart Data successful!"
        }))
      } catch (err) {
        dispatch(uiActions.showNotification({
          status:"error",
          title:"Error!",
          message:"Sending cart Data failed!"
        }))
      }

    }
    sendCartData();

  }, [cart,dispatch])
  return (
    <Fragment>
      {notification && <Notification 
      status={notification.status} 
      title={notification.title}
      message={notification.message}/>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
