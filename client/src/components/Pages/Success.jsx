import React, { useEffect } from "react";
import "./Success.scss";
import { runFireworks } from "../../utils/utils";
import { BsBagCheckFill } from "react-icons/bs";

const Success = () => {
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon icon-success">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="description">If you have any questions, please email</p>
        <a className="email" href="/footer">
          Here
        </a>
        <a href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </a>
      </div>
    </div>
  );
};

export default Success;
