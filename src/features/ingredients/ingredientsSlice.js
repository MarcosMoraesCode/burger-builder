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
      state[action.payload] += 1;
      //state.salad += 1;
      //state.bacon += 1;
      //state.cheese += 1;
      //state.meat += 1;
    },
    removeIngredients: (state, action) => {
      state[action.payload] -= 1;
      //state.salad -= 1;
      //state.bacon -= 1;
      //state.cheese -= 1;
      //state.meat -= 1;
    },
  },
});

export const { addIngredients, removeIngredients } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
