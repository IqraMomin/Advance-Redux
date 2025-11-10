import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useDispatch, useSelector } from 'react-redux';
import Notification from "./components/UI/Notification"
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let initialValue=true;

function App() {
  const showCart = useSelector(store => store.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state=>state.ui.notification);

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch])

  useEffect(() => {

    if(initialValue){
      initialValue=false;
      return;
    }
    if(cart.changed){
    dispatch(sendCartData(cart));
    }

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
