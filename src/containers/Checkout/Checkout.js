import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";

const Checkout = () => {
  const [ingredients, setIngredients] = useState({
    salad: 1,
    cheese: 1,
    meat: 1,
    bacon: 1,
  });
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
        ingredients={ingredients}
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
      />
    </div>
  );
};

export default Checkout;
