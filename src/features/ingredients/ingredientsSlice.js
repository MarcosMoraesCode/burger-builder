import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salad: 0,
  bacon: 0,
  meat: 0,
  cheese: 0,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredients: (state, action) => {
      state[action] += 1;
    },
    removeIngredients: (state, action) => {
      state[action] -= 1;
    },
  },
});

export const { addIngredients, removeIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
