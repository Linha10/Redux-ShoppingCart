import { createSlice } from "@reduxjs/toolkit";

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
                existingItem.quantity ++;
                existingItem.totalPrice += newItem.price;
            } else {
                state.itemsList.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                });
                state.totalQuantity ++ ;
            }
        },
        removeFromCart() {

        },
        setShowCart(state) {
            state.showCart = !state.showCart ;
        }
    }

})

export const cartActions = cartSlice.actions ;
export default cartSlice ;