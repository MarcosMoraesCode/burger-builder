import React from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

const burguerBuilder = (props) => {
  return (
    <Aux>
      <Burger />
      <div>Build Controls</div>
    </Aux>
  );
};

export default burguerBuilder;
