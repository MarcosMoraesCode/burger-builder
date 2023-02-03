import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  let button = (
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  );

  if (props.isAuth === null) {
    button = (
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.goToSignIn}
      >
        SIGN IN TO ORDER
      </button>
    );
  }

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: $ <strong>{Number(props.price).toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          add={() => props.addIngredients(ctrl.type)}
          remove={() => props.removeIngredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      {button}
    </div>
  );
};

export default buildControls;
