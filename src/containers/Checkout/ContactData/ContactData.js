import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axiosOrders";

const ContactData = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: {
      street: "",
      zipCode: "",
      number: "",
      country: "",
    },
  });

  console.log(state);
  const order = {
    ingredients: state.ingredients,
    price: state.totalPrice,
    costumer: {
      name: userData.name,
      adress: {
        street: userData.address.street,
        number: userData.address.number,
        country: userData.address.country,
      },
      email: userData.email,
    },
    deliveyMethod: "fastest",
  };

  /*
   */

  const submitOrderHandler = () => {
    axios
      .post("/orders.json", order)
      .then((response) => {
        /*navigate("/checkout/contact-data", {
          state: {
            ingredients: state.ingredients,
            totalPrice: state.totalPrice,
          },
        });*/
        //setLoading(false);
        //setPurchasing(false);
        console.log(response);
      })
      .catch((error) => {
        //setLoading(false);
        //setPurchasing(false);
        console.log(error);
      });
  };

  return (
    <div className={classes.ContactData}>
      <h4>Entry your contact data</h4>
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="zipCode"
          placeholder="Z-code"
        />
      </form>
      <Button btnType="Success" clicked={submitOrderHandler}>
        ORDER
      </Button>
    </div>
  );
};

export default ContactData;
