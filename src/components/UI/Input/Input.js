import React from "react";
import classes from "./Input.css";

const Input = (props) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          changed={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          changed={props.changed}
        />
      );
      break;
    case "select":
      const options = props.elementConfig.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        );
      });

      inputElement = (
        <select
          className={classes.InputElement}
          value={props.value}
          changed={props.changed}
        >
          {options}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          changed={props.changed}
        />
      );
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
