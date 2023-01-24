import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axiosOrders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

const ContactData = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your E-mail",
      },
      value: "",
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
    },
  });

  const order = {
    ingredients: state.ingredients,
    price: state.totalPrice.toFixed(2),
    costumer: {
      name: userData.name.value,
      adress: {
        street: userData.street.value,
        zipCode: userData.zipCode.value,
        country: userData.country.value,
      },
      email: userData.email.value,
    },
    deliveyMethod: userData.deliveryMethod.value,
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

  const formsElementArray = [];
  for (let key in userData) {
    formsElementArray.push({
      id: key,
      config: userData[key],
    });
  }
  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedUserData = { ...userData };
    const updatedFormElement = { ...updatedUserData[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedUserData[inputIdentifier] = updatedFormElement;

    setUserData(updatedUserData);
  };

  //console.log(userData);

  let form = (
    <form>
      {formsElementArray.map((input) => {
        return (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            changed={(event) => inputChangedHandler(event, input.id)}
          />
        );
      })}
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
