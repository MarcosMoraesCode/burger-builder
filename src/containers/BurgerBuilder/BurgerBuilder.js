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

const INGREDIENTS_PRICE = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

const BurguerBuilder = (props) => {
  const [ingredients, setIngredients] = useState(null);

  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const purchaseHandler = () => {
    return setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    return setPurchasing(false);
  };

  useEffect(() => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        return setIngredients(response.data);
      })
      .catch((error) => {
        return setError(error);
      });
  }, []);

  const purchaseContinuedHandler = () => {
    setLoading(true);
    const order = {
      ingredients: ingredients,
      price: totalPrice,
      costumer: {
        name: "Marcos",
        adress: { street: "TestStreet", number: "10", country: "Brazil" },
        email: "marcos@gmail.com",
      },
      deliveyMethod: "fastest",
    };

    //alert("You Continued!");
    navigate("/checkout", {
      state: { ingredients: ingredients },
    });
    /*
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        setPurchasing(false);
        console.log(response);
      })
      .catch((error) => {
        setLoading(false);
        setPurchasing(false);
        console.log(error);
      });*/
  };

  const updatePurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((acc, igQnty) => {
        return acc + igQnty;
      }, 0);

    setPurchasable(sum > 0);
  };

  const addIngredientsHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENTS_PRICE[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;

    setIngredients(updatedIngredients);
    setTotalPrice(newPrice);
    updatePurchase(updatedIngredients);
  };

  const removeIngredientsHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount - 1;
    if (oldCount <= 0) {
      return;
    }
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENTS_PRICE[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;

    setIngredients(updatedIngredients);
    setTotalPrice(newPrice);
    updatePurchase(updatedIngredients);
  };

  const disabledInfo = { ...ingredients };

  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = error ? <p>Ingredients can't be loaded now!</p> : <Spinner />;

  let orderSummary = null;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          addIngredients={addIngredientsHandler}
          removeIngredients={removeIngredientsHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={purchaseHandler}
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
