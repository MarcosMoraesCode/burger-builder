import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./features/ingredients/ingredientsSlice";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
  },
});
