import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axiosOrders";
import Spinner from "../../../components/UI/Spinner/Spinner";

const ContactData = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    axios
      .post("/orders.json", order)
      .then((response) => {
        navigate("/", {
          state: {
            ingredients: state.ingredients,
            totalPrice: state.totalPrice,
          },
        });
        //setLoading(false);
        //setPurchasing(false);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        //setLoading(false);
        //setPurchasing(false);
        setLoading(false);
        console.log(error);
      });
  };

  let form = (
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
  );
  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Entry your contact data</h4>
      {form}
      <Button btnType="Success" clicked={submitOrderHandler}>
        ORDER
      </Button>
    </div>
  );
};

export default ContactData;
