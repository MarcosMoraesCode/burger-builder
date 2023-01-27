import React, { useState } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import { useSelector } from "react-redux";

const Checkout = () => {
  const ingredients = useSelector(
    (state) => state.initialIngredients.ingredients
  );

  const navigate = useNavigate();

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data");
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
      <Routes>
        <Route path="/contact-data" exact element={<ContactData />} />
      </Routes>
    </div>
  );
};

export default Checkout;
