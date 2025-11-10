import { cartActions } from "./cartSlice";
import { uiActions } from "./uiSlice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: "pending",
            title: "Sending...!",
            message: "Sending cart Data"
        }))
        const sendRequest = async () => {
            const response = await fetch("https://advance-redux-8144d-default-rtdb.firebaseio.com//cart.json", {
                method: "PUT",
                body: JSON.stringify({
                    cartItems:cart.cartItems,
                    totalQuantity:cart.totalQuantity
                })
            })
            if (!response.ok) {
                throw new Error("Sending cart data failed!")
            }
        };
        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sending cart Data successful!"
            }))
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart Data failed!"
            }))
        }
    }
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchCart = async () => {
            const response = await fetch("https://advance-redux-8144d-default-rtdb.firebaseio.com//cart.json")
            if (!response.ok) {
                throw new Error("Fetching data failed!");
            }
            const data = await response.json();
            return data;
        }
        try {
            const cartData = await fetchCart();
            dispatch(uiActions.showNotification({
                status: "success",
                title: "Success!",
                message: "Sending cart Data successful!"
            }))
            dispatch(cartActions.fetchCart({
                cartItems:cartData.cartItems||[],
                totalQuantity:cartData.totalQuantity
            }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: "error",
                title: "Error!",
                message: "Sending cart Data failed!"
            }))
        }
    }
}