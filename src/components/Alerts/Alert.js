import React from "react";
import classes from "./Alert.css";

const Alert = (props) => {
  let alert = null;

  switch (props.status) {
    /*case "login-succeed":
      alert = (
        <div className={classes.Success} onClick={props.userClicked}>
          <p>Success! You're being redirect in a few seconds...</p>
        </div>
      );
      break;*/
    case "login-failed":
      alert = (
        <div className={classes.Failed} onClick={props.userClicked}>
          <p>Ops! Check your email/password and try again!</p>
        </div>
      );
      break;
    /*case "singUp-succeed":
      alert = (
        <div className={classes.Success} onClick={props.userClicked}>
          <p>Success! You're able to make your order now!</p>
        </div>
      );
      break;*/
    case "singUp-failed":
      alert = (
        <div className={classes.Failed} onClick={props.userClicked}>
          <p>
            Ops! Something didn't work, please verify connection and your data!
          </p>
        </div>
      );
      break;
    default:
      break;
  }

  return <>{alert}</>;
};

export default Alert;
