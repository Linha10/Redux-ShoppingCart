import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import axios from 'axios';
import Notification from "./components/Notification";
import { uiActions } from "./store/ui-slice";
import { sendCartData } from "./store/cart-slice";

let isFirst = true;
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart)
  
  // const cartItems = useSelector ( (state)=> state.cart.itemsList)
  // console.log('cartItems',cartItems)

  useEffect(() => {
    if (isFirst ) {
      isFirst = false;
      console.log( isFirst ) ;
      return ;
    }
    dispatch(sendCartData(cart));
  }, [ cart ,dispatch ] );
  // useEffect(() => {
  //   const sendBack = async () => {
  //     const res = await axios({
  //       method: 'put',
  //       url: "https://redux-shop-67a99-default-rtdb.firebaseio.com/cartItems.json",
  //       data: JSON.stringify(cart)
  //     }
  //       .then((res) => console.log(res))
  //       .catch((err) => console.log(err))
  //       
  //     )
  //   }
  // }, [cart])

  return (
    <div className="App">
      {notification &&
        <Notification type={notification.type} message={notification.message} />
      }
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
