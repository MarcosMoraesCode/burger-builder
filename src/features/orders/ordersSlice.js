import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "../../axiosOrders";

const initialState = {
  orders: null,
  test: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get("/orders.json");

    return response.data;
  } catch (err) {
    return isRejectedWithValue(err);
  }
});

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
      const allOrders = Object.values(action.payload);
      state.orders = allOrders.map((order) => {
        return order;
      });
    });
  },
});

export const { addOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
