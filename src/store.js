import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./features/ingredients/ingredientsSlice";
import ordersReducer from "./features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    initialIngredients: ingredientsReducer,
    initialOrders: ordersReducer,
  },
});
