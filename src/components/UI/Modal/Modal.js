import React, { memo } from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />

      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

//Aqui com memo conseguimos evitar renderizações desnecessárias, pois por mais que as props mudem, o component não deve ser renderizado até ser visível.

export default memo(modal, (oldProps, nextProps) => {
  //console.log(oldProps, nextProps);
  if (oldProps.show !== nextProps.show) {
    return false;
  } else if (oldProps.checkShop === nextProps.checkShop) {
    return true;
  } else {
    return false;
  }
});
