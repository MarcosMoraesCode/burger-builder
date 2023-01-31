import React, { useState } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import { useDispatch, useSelector } from "react-redux";
import { restartIngredients } from "../../features/ingredients/ingredientsSlice";

const Checkout = () => {
  const ingredients = useSelector(
    (state) => state.initialIngredients.ingredients
  );
  const totalPrice = useSelector((state) => state.initialIngredients.price);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data");
  };
  const checkoutCancelledHandler = () => {
    dispatch(restartIngredients());
    navigate("/");
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
