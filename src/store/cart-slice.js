import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        totalQuantity: 0,
        showCart: false
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            //確認是否商品重複
            const existingItem = state.itemsList.find((item) => item.id === newItem.id)
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.itemsList.find(item => item.id === id)
            if (existingItem.quantity === 1) {
                state.itemsList = state.itemsList.filter(item => item.id !== id)
                state.totalQuantity -- ;
            }else {
                existingItem.quantity -- ;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state) {
            state.showCart = !state.showCart;
        }
    }

})
export const sendCartData = ( cart )=>{
    return async ( dispatch )=>{
        dispatch(uiActions.showNotification({
            open: true,
            message: 'send req',
            type: 'warning'
          }));
          const sendRequest = async () => {
            const res = await fetch('https://redux-shop-67a99-default-rtdb.firebaseio.com/cartItems.json',
              {
                method: 'PUT',
                body: JSON.stringify(cart)
              }
            );
            const data = await res.json();
      
            dispatch(uiActions.showNotification({
              open: true,
              message: 'send req to db success',
              type: 'success'
            }))
          };
          try{
              await sendRequest();
          }catch(err){
            dispatch(uiActions.showNotification({
                open: true,
                message: 'send req failed',
                type: 'error'
              }))
          }
    }
}
export const cartActions = cartSlice.actions;
export default cartSlice;