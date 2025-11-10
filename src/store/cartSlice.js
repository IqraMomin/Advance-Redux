import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
    cartItems:[],
    totalQuantity:0
}

const cartSlice = createSlice({
    name:'cart',
    initialState:initialCartState,
    changed:false,
    reducers:{
        fetchCart:(state,action)=>{
            state.cartItems = action.payload.cartItems;
            state.totalQuantity = action.payload.totalQuantity
        },
        addToCart:(state,action)=>{
            const existingItemIndex = state.cartItems.findIndex(ele=>ele.id===action.payload.id);
            const existingItem = state.cartItems[existingItemIndex];
            state.changed = true;
            let updatedItem;
            if(existingItem){
                updatedItem = {...existingItem,
                    quantity:existingItem.quantity+1,
                    total:existingItem.total+action.payload.price}
                state.cartItems[existingItemIndex] = updatedItem;
    
            }else{
            state.cartItems = state.cartItems.concat(action.payload)
            }
            state.totalQuantity = state.totalQuantity+1;
        },
        removeItem:(state,action)=>{
            const existingItemIndex = state.cartItems.findIndex(ele=>ele.id===action.payload)
            const existingItem = state.cartItems[existingItemIndex]
            state.changed=true;
            if(existingItem){
                if(existingItem.quantity===1){
                    state.cartItems = state.cartItems.filter(ele=>ele.id!==action.payload)
                }else{
                    const updatedItem = {...existingItem,
                    quantity:existingItem.quantity-1,
                    total:existingItem.total-existingItem.price}
                    state.cartItems[existingItemIndex] =updatedItem
                }
                state.totalQuantity = state.totalQuantity-1;              
            }
            
        }
        
    }
});



export const cartActions = cartSlice.actions;
export default cartSlice.reducer;