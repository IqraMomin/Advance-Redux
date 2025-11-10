import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    setCart:false,
    cartItems:[]
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    reducers:{
        showCart:(state)=>{
            state.setCart = !state.setCart
        },
        addToCart:(state,action)=>{
            state.cartItems = state.cartItems.concat(action.payload)
        }
        
    }
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;