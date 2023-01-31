import React, { useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";

const Auth = (props) => {
  const [userLogin, setUserLogin] = useState({
    id: "user-login",
    value: "",
    isValid: false,
    isTouched: false,
    shouldValidade: true,
    elementConfig: {
      placeholder: "Insert a login between 4 and 10 characters.",
    },
  });
  const [userPassword, setUserPassword] = useState({
    id: "user-password",
    value: "",
    isValid: false,
    isTouched: false,
    shouldValidade: true,
    elementConfig: {
      placeholder: "Insert a password between 4 and 10 characters.",
    },
  });

  const checkValidation = (inputElement, value) => {
    let checkInput = inputElement === "user-login";
    let firstCheck = value.trim() !== "";
    let secondCheck = value.length < 10 && value.length >= 4;
    //let thirdCheck = true;
    //value.some((char) => typeof char === Number) &&
    //value.some((char) => typeof char === String);

    if (checkInput) {
      if (firstCheck && secondCheck) {
        return true;
      }
      return false;
    } else if (firstCheck && secondCheck) {
      //&& thirdCheck) {
      return true;
    }
    return false;
  };

  const inputChangedHandler = (event, inputElement) => {
    switch (inputElement) {
      case "user-login":
        {
          setUserLogin({
            ...userLogin,
            value: event.target.value,
            isValid: checkValidation(inputElement, event.target.value),
            isTouched: true,
          });
        }
        break;
      case "user-password":
        {
          setUserPassword({
            ...userPassword,
            value: event.target.value,
            isValid: checkValidation(inputElement, event.target.value),
            isTouched: true,
          });
        }
        break;
      default:
        //never happens
        break;
    }
  };

  return (
    <div className={classes.Auth}>
      <form className={classes.Form}>
        <h4>Create your account</h4>

        <Input
          key={userLogin.id}
          elementType={"input"}
          value={userLogin.value}
          changed={(event) => inputChangedHandler(event, userLogin.id)}
          invalid={!userLogin.isValid}
          shouldValidate={userLogin.shouldValidade}
          touched={userLogin.isTouched}
          label={"Login"}
          elementConfig={userLogin.elementConfig}
        />

        <Input
          key={userPassword.id}
          elementType={"input"}
          value={userPassword.value}
          changed={(event) => inputChangedHandler(event, userPassword.id)}
          invalid={!userPassword.isValid}
          shouldValidate={userPassword.shouldValidade}
          touched={userPassword.isTouched}
          label={"Password"}
          elementConfig={userPassword.elementConfig}
        />
      </form>
    </div>
  );
};

export default Auth;
