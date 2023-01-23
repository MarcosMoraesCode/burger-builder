import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data");
    console.log("continuou");
  };
  const checkoutCancelledHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={state.ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
    </div>
  );
};

export default Checkout;
