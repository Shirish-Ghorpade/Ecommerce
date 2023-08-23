import React, { useContext } from "react";
import { Context } from "../../../utils/context";
import { MdClose } from "react-icons/md";

import "./CartItem.scss";
const CartItem = () => {
  // State to add and remove the items from cart
  // sueContext ne hai element kadun getle
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);

  return (
    <div className="cart-products">
      {/* adding key reason using map */}
      {cartItems?.map((item) => (
        <div className="search-result-item" key={item.id} onClick={() => {}}>
          <div className="image-container">
            {/* carditem madhe product chi image pn dynamic thev manje jo product cart add kela img pn tyachich disnar */}
            <img
              src={
                process.env.REACT_APP_STRIPE_APP_DEV_URL +
                item.attributes.img.data[0].attributes.url
              }
            />
          </div>
          <div className="prod-details">
            <span className="name">{item.attributes.title}</span>
            {/* add handleRemoveFromCart(item) function to close btn */}
            <MdClose
              className="close-btn"
              onClick={() => handleRemoveFromCart(item)}
            />
            <div className="quantity-buttons">
              {/* - chya onClick event */}
              {/* 1st parametr is type and 2nd product jyachi quantity decrement karaychi aahe tho */}
              <span onClick={() => handleCartProductQuantity("dec", item)}>
                -
              </span>
              <span>{item.attributes.quantity}</span>
              {/* 1st parametr is type and 2nd product jyachi quantity increment karaychi aahe tho */}
              <span onClick={() => handleCartProductQuantity("inc", item)}>
                {/* + chya onClick event */}+
              </span>
            </div>
            <div className="text">
              <span>{item.attributes.quantity}</span>
              {/* X sign to show in cart */}
              <span>x</span>
              <span className="highlight">
                <span>&#8377;</span>
                {/* for calculating the value */}
                {item.attributes.price * item.attributes.quantity}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItem;
