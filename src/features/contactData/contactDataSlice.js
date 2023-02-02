import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

import axios from "../../axiosOrders";

const initialState = {
  orderStatus: null,
};

export const fetchContactData = createAsyncThunk(
  "contactData/fetchContactData",
  async (action) => {
    try {
      console.log(action.order, action.token);
      const response = await axios.post(
        "/orders.json?auth=" + action.token,
        action.order
      );

      return response.data;
    } catch (err) {
      return isRejectedWithValue("REJECTED");
    }
  }
);

export const contactDataSlice = createSlice({
  name: "contactData",
  initialState,
  reducers: {
    success: (state, action) => {
      state.orderStatus = "success";
    },
    rejected: (state, action) => {
      state.orderStatus = "rejeitado";
    },
    reset: (state, action) => {
      state.orderStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchContactData.fulfilled, (state, action) => {
      console.log("Success", action.payload);
    });
    builder.addCase(fetchContactData.rejected, (state, action) => {
      console.log("Rejected", action.error.message);
      console.log(action.error);
    });
  },
});

export const { rejected, success, reset } = contactDataSlice.actions;

export default contactDataSlice.reducer;
