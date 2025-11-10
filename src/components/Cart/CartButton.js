import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/uiSlice';

const CartButton = () => {
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state=>state.cart.totalQuantity);

  const openCartHandler = ()=>{
    dispatch(uiActions.toggle());
  }
  return (
    <button className={classes.button} onClick={openCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
