import React from "react";
import classes from "./Order.css";

const Order = (props) => {
  return (
    <div className={classes.Order}>
      <h2 className={classes.Emphasis}>Ingredients:</h2>
      <ul>
        <li> Salad: {props.salad}</li>
        <li> Bacon: {props.bacon}</li>
        <li> Meat: {props.meat}</li>
        <li> Cheese:{props.cheese} </li>
      </ul>
      <p>
        Total price: <strong>$ {props.price}</strong>
      </p>
    </div>
  );
};

export default Order;
