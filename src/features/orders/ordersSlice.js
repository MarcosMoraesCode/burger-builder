import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "../../axiosOrders";

const initialState = {
  orders: null,
  test: null,
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (action) => {
    try {
      const response = await axios.get("/orders.json?auth=" + action.token);

      console.log("response", response.data);
      console.log("action", action.userId);

      const allOrders = Object.values(response.data);
      const filteredOrders = allOrders.filter((order) => {
        return order.costumer.userId === action.userId;
      });
      console.log(filteredOrders);

      return filteredOrders;
    } catch (err) {
      return isRejectedWithValue(err);
    }
  }
);

export const ordersSlice = createSlice({
  name: "initialOrders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      //state.ingredients[action.payload.type] += 1;
      //state.price += action.payload.ingredientPrice;
      console.log(state, action);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      /*const allOrders = Object.values(action.payload);
      const filteredOrders = allOrders.map((order) => {
        return order;
      });*/
      //.filter((order) => order.costumer.userId === state.token.userId);
      console.log(action);
      state.orders = action.payload;
    });
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
