import React, { useState } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";

const Checkout = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data", {
      state: { ingredients: state.ingredients },
    });
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
      <Routes>
        <Route path="/contact-data" exact element={<ContactData />} />
      </Routes>
    </div>
  );
};

export default Checkout;
