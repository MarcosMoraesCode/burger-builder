import React, { useEffect, useState } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import { useSignOut } from "react-firebase-hooks/auth";
import Spinner from "../../components/UI/Spinner/Spinner";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  cleanUserInfo,
} from "../../features/Authenticate/authenticateSlice";
import { useNavigate } from "react-router";

const Auth = (props) => {
  const [
    createUserWithEmailAndPassword,
    signUpUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const [signInWithEmailAndPassword, signInUser, signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const userStatus = useSelector((state) => state.token);

  const [isSignUp, setIsSignUp] = useState(true);

  const totalPrice = useSelector((state) => state.initialIngredients.price);

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
  const [signOut, loading, error] = useSignOut(auth);

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

  useEffect(() => {
    console.log(userStatus);
  }, [userStatus]);

  const inputChangedHandler = (event, inputElement) => {
    switch (inputElement) {
      case "user-login":
        setUserLogin({
          ...userLogin,
          value: event.currentTarget.value,
          isValid: checkValidation(inputElement, event.currentTarget.value),
          isTouched: true,
        });

        break;
      case "user-password":
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
            alert("SUCCESS");
          } else {
            alert("SOMETHING DIDN'T WORK WHILE TRYING TO CREATE YOUR ACCOUNT");
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
            let expirationDate = new Date().getTime() + 60000;

            console.log("expiration", expirationDate);
            let tokenId = res._tokenResponse.idToken;
            localStorage.setItem("token", tokenId);
            localStorage.setItem("expirationDate", expirationDate);
            localStorage.setItem("userId", res._tokenResponse.localId);
            alert("SUCESS ON LOGIN");
            if (totalPrice > 4) {
              navigate("/checkout");
            } else {
              navigate("/");
            }
          } else {
            alert("SOMETHING DIDN'T WORK WHILE TRYING TO LOGIN");
          }
        }
      );
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

      <Button
        type={"button"}
        clicked={(event) => switchSignInHandler(event)}
        btnType="Danger"
      >
        {isSignUp ? "Already registered" : "Create an account"}
      </Button>
      {/*<Button
        type={"button"}
        clicked={
          userStatus.tokenId
            ? async () => {
                const success = await signOut();
                if (success) {
                  alert("You are sign out");
                  dispatch(cleanUserInfo());
                }
              }
            : null
        }
        btnType="Success"
      >
        {userStatus.tokenId ? "Logout" : "you logged out"}
      </Button>*/}
    </form>
  );

  if (signInLoading || signUpLoading) {
    form = <Spinner />;
  }

  return <div className={classes.Auth}>{form}</div>;
};

export default Auth;
