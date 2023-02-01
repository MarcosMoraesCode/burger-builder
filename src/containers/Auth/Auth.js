import React, { useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";

import Spinner from "../../components/UI/Spinner/Spinner";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../features/Authenticate/authenticateSlice";

const Auth = (props) => {
  const [
    createUserWithEmailAndPassword,
    signUpUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const [isSignUp, setIsSignUp] = useState(true);

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

  const dispatch = useDispatch();
  const checkValidation = (inputElement, value) => {
    let firstCheck = value.trim() !== "";
    let secondCheck = value.length < 20 && value.length >= 6;
    //let thirdCheck = true;
    //value.some((char) => typeof char === Number) &&
    //value.some((char) => typeof char === String);

    switch (inputElement) {
      case "user-login": {
        if (firstCheck && secondCheck) {
          return true;
        } else {
          return false;
        }
      }
      case "user-password": {
        if (firstCheck && secondCheck) {
          return true;
        } else {
          return false;
        }
      }
      default:
        console.log("Nothing happens");
        break;
    }
  };

  const inputChangedHandler = (event, inputElement) => {
    switch (inputElement) {
      case "user-login":
        console.log("usuario é valido", userLogin.isValid);
        setUserLogin({
          ...userLogin,
          value: event.currentTarget.value,
          isValid: checkValidation(inputElement, event.currentTarget.value),
          isTouched: true,
        });

        break;
      case "user-password":
        console.log("senha é valida", userPassword.isValid);
        setUserPassword({
          ...userPassword,
          value: event.currentTarget.value,
          isValid: checkValidation(inputElement, event.currentTarget.value),
          isTouched: true,
        });

        break;
      default:
        console.log("passa aqui");
        break;
    }
  };

  const submitAccountHandler = (event) => {
    event.preventDefault();

    if (isSignUp) {
      createUserWithEmailAndPassword(userLogin.value, userPassword.value).then(
        (res) => {
          if (res) {
            alert("CRIADO COM SUCESSO");
          } else {
            alert(signUpError);
          }
        }
      );
    } else {
      signInWithEmailAndPassword(userLogin.value, userPassword.value).then(
        (res) => {
          if (res) {
            dispatch(
              getUserInfo({
                localId: res._tokenResponse.localId,
                idToken: res._tokenResponse.idToken,
              })
            );
            alert("LOGADO COM SUCESSO");
          } else {
            alert(signInError);
          }
        }
      );
      //LOGAR USUÁRIO JÁ CADASTRADO
    }
  };

  const switchSignInHandler = (event) => {
    event.preventDefault();
    setIsSignUp(!isSignUp);
  };

  let form = (
    <form className={classes.Form}>
      <h2>{isSignUp ? "SIGN UP" : "SIGN IN"}</h2>

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

      <Button
        clicked={(event) => submitAccountHandler(event)}
        btnType="Success"
        disabled={userLogin.isValid && userPassword.isValid ? false : true}
        type="submit"
      >
        {isSignUp ? "Sign up" : "Sign in"}
      </Button>

      <Button clicked={(event) => switchSignInHandler(event)} btnType="Danger">
        {isSignUp ? "Already registered" : "Create an account"}
      </Button>
    </form>
  );
  if (signInLoading || signUpLoading) {
    form = <Spinner />;
  }

  return <div className={classes.Auth}>{form}</div>;
};

export default Auth;
