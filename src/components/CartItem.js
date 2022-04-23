import React from "react";
import { useDispatch } from "react-redux";
import "./Cart.css";
import { cartActions } from "./../store/cart-slice.js";

const CartItem = ({ name, quantity, total, price, id }) => {
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(cartActions.removeFromCart(id));
  };
  const increCartItem = () => {
    dispatch(
      cartActions.addToCart ( {
        name,
        id,
        price,
      })
    )
   
  }
  const decreCartItem = () => {
    dispatch ( cartActions.removeFromCart(id))

  }

  return (
    <div className="cartItem">
      <h2> {name}</h2>
      <p>$ {price} /-</p>
      <p>x {quantity}</p>
      <article>Total ${ total }</article>
      <button className="cart-actions" onClick={decreCartItem}>
        -
      </button>
      <button className="cart-actions" onClick={increCartItem}>
        +
      </button>
    </div>
  );
};

export default CartItem;
