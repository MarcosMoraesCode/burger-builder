import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./features/ingredients/ingredientsSlice";
import ordersReducer from "./features/orders/ordersSlice";
import contactDataReducer from "./features/contactData/contactDataSlice";

export const store = configureStore({
  reducer: {
    initialIngredients: ingredientsReducer,
    initialOrders: ordersReducer,
    contactData: contactDataReducer,
  },
});
