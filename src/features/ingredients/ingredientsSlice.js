import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axiosOrders";

const initialState = {
  ingredients: {},
  price: 4,
};

export const fetchIngredients = createAsyncThunk(
  "ingredients/fetchIngredients",
  async () => {
    try {
      const response = await axios.get("/ingredients.json");
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
    });
  },
});

export const { addIngredients, removeIngredients, restartIngredients } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
