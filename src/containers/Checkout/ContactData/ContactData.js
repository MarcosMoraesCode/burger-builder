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
      validation: {
        required: true,
        valid: false,
      },
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your E-mail",
      },
      value: "",
      validation: {
        required: true,
        valid: false,
      },
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
        valid: false,
      },
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code",
      },
      value: "",
      validation: {
        required: true,
        valid: false,
        minLength: 5,
        maxLength: 5,
      },
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
        valid: false,
      },
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      validation: {},
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
        //console.log(response);
      })
      .catch((error) => {
        //setLoading(false);
        //setPurchasing(false);
        setLoading(false);
        // console.log(error);
      });
  };

  const formsElementArray = [];
  for (let key in userData) {
    formsElementArray.push({
      id: key,
      config: userData[key],
    });
  }

  const checkValidity = (value, rules, touched) => {
    let isValid = false;
    console.log(rules?.required);

    if (
      rules?.valid === undefined ||
      (rules?.valid === true && rules?.required === undefined)
    ) {
      return (isValid = true);
    }
    //if (rules.valid) {
    //isValid = true;
    //}

    if (touched === false) {
      return;
    }

    if (rules?.required) {
      isValid = value.trim() !== "";
    }

    if (rules?.minLength) {
      isValid =
        value.length >= rules.minLength && value.length <= rules.maxLength;
    }

    return isValid;
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedUserData = { ...userData };
    const updatedFormElement = { ...updatedUserData[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;

    updatedFormElement.validation.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
      updatedFormElement.touched
    );

    updatedUserData[inputIdentifier] = updatedFormElement;

    setUserData(updatedUserData);
  };
  const validPropsArray = [];
  for (let key in userData) {
    validPropsArray.push(userData[key]?.validation?.valid ?? true);
  }

  //console.log(userData);

  let form = (
    <form>
      {console.log(validPropsArray)}
      {formsElementArray.map((input) => {
        return (
          <Input
            key={input.id}
            elementType={input.config.elementType}
            elementConfig={input.config.elementConfig}
            value={input.config.value}
            changed={(event) => inputChangedHandler(event, input.id)}
            invalid={!input.config.validation?.valid}
            shouldValidate={input.config.validation}
            touched={input.config.touched}
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
      <Button
        btnType="Success"
        clicked={submitOrderHandler}
        disabled={validPropsArray.includes(false) ? true : false}
      >
        ORDER
      </Button>
    </div>
  );
};

export default ContactData;
