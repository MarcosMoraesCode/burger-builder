import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0,
  },
  price: 4,
};

export const ingredientsSlice = createSlice({
  name: "initialIngredients",
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      state.ingredients[action.payload.type] += 1;
      state.price += action.payload.ingredientPrice;
    },
    removeIngredients: (state, action) => {
      state.ingredients[action.payload.type] -= 1;
      state.price -= action.payload.ingredientPrice;
    },
    restartIngredients: (state) => {
      state.ingredients.bacon = 0;
      state.ingredients.meat = 0;
      state.ingredients.cheese = 0;
      state.ingredients.salad = 0;
      state.price = 4;
    },
  },
});

export const { addIngredients, removeIngredients, restartIngredients } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
