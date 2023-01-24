import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <h2>Ingredients:</h2>
      <p>
        Salad: {props.salad} Bacon: {props.bacon} Meat: {props.meat} Cheese:{" "}
        {props.cheese}
      </p>
      <p>
        Total price: <strong>$ {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
