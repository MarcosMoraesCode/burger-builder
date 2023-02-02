import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredients,
  fetchIngredients,
  removeIngredients,
} from "../../features/ingredients/ingredientsSlice";

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const BurguerBuilder = (props) => {
  const ingredients = useSelector(
    (state) => state.initialIngredients.ingredients
  );
  const error = useSelector((state) => state.initialIngredients.error);

  const token = useSelector((state) => state.token.tokenId);

  const dispatch = useDispatch();

  //const [ingredients, setIngredients] = useState(null);

  const totalPrice = useSelector((state) => state.initialIngredients.price);
  // const [totalPrice, setTotalPrice] = useState(4);

  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(null);
  const navigate = useNavigate();

  const purchaseHandler = () => {
    return setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    return setPurchasing(false);
  };

  useEffect(() => {
    console.log("carregou");
    if (!token) {
      dispatch(fetchIngredients());
    }
  }, []);

  const purchaseContinuedHandler = () => {
    setLoading(true);

    //alert("You Continued!");
    navigate("/checkout");
  };

  const updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((acc, igQnty) => {
        return acc + igQnty;
      }, 0);

    return sum > 0;
  };

  const addIngredientsHandler = (type) => {
    const priceAddition = INGREDIENTS_PRICE[type];

    dispatch(addIngredients({ type: type, ingredientPrice: priceAddition }));

    updatePurchase(ingredients);
    //setPurchasable(true);
  };

  const removeIngredientsHandler = (type) => {
    const priceDeduction = INGREDIENTS_PRICE[type];

    dispatch(
      removeIngredients({ type: type, ingredientPrice: priceDeduction })
    );

    updatePurchase(ingredients);
  };

  const disabledInfo = { ...ingredients };
  //console.log(disabledInfo);

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Ingredients can't be loaded now!</p> : <Spinner />;

  let orderSummary = null;
  if (ingredients === null) {
    burger = <Spinner />;
  }

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredients={addIngredientsHandler}
          removeIngredients={removeIngredientsHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={updatePurchase(ingredients)}
          ordered={purchaseHandler}
          goToSignIn={() => navigate("/sign-in")}
          isAuth={token}
        />
      </Aux>
    );
  }

  if (ingredients) {
    orderSummary = (
      <Aux>
        <OrderSummary
          ingredients={ingredients}
          purchaseCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinuedHandler}
          price={totalPrice.toFixed(2)}
        />
      </Aux>
    );
  }

  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal
        show={purchasing}
        modalClosed={purchaseCancelHandler}
        checkShop={loading}
      >
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurguerBuilder, axios);
