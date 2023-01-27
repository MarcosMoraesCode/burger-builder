import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const burger = (props) => {
  //console.log(props);
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />;
    });
  });

  const haveIngredients = transformedIngredients.reduce((acumulator, array) => {
    return acumulator + array.length;
  }, 0);

  if (haveIngredients === 0) {
    transformedIngredients = (
      <div>
        <h1>Please add some ingredients!</h1>
      </div>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
