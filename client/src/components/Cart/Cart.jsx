import React, { useContext } from "react";
import { MdClose } from "react-icons/md";
import { BsCartX } from "react-icons/bs";
import { Context } from "../../utils/context";
import CartItem from "./CartItem/CartItem";
// import plugin from stripe named as loadStrip
import { loadStripe } from "@stripe/stripe-js";
// makePaymentRequest la access kele utils/api madun
import { makePaymentRequest } from "../../utils/api";

import "./Cart.scss";

// dount
const Cart = () => {
  const { cartItems, setShowCart, cartSubTotal } = useContext(Context);

  // create instance of loadStripe
  const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartItems,
      });
      // promise return karata hai to func ke aage await lagav
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="cart-panel">
      <div className="opac-layer" onClick={() => setShowCart(false)}></div>
      <div className="cart-content">
        <div className="cart-header">
          <span className="heading">Shopping Cart</span>
          {/* close btn madhe cart chya window la false kele so card close honar */}
          <span className="close-btn" onClick={() => setShowCart(false)}>
            <MdClose className="close-btn" />
            <span className="text">close</span>
          </span>
        </div>

        {/* Jar cart empty asel tar mag ha execute honar and ho data disnar No products in the cart*/}
        {!cartItems.length && (
          <div className="empty-cart">
            <BsCartX />
            <span>No products in the cart.</span>
            <a href="/" style={{ textDecoration: "none" }}>
              <button className="return-cta" onClick={() => {}}>
                RETURN TO SHOP
              </button>
            </a>
          </div>
        )}

        {/* javha cart madhe items astil tevha hi condition satisfy honar and hai disnar */}
        {!!cartItems.length && (
          <>
            <CartItem />
            {/* subtotal footer */}
            <div className="cart-footer">
              <div className="subtotal">
                <span className="text">Subtotal:</span>
                {/* &#8377 use for rupees symbol and cartSubTotal gives the amount*/}
                <span className="text total">&#8377;{cartSubTotal}</span>
              </div>
              <div className="button">
                {/* art madhle checkout btn and api.js madhe yacha call maintain kela aahe and handlePayment varti create kela aahe*/}
                <button className="checkout-cta" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
