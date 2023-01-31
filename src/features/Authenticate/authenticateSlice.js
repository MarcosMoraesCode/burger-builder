import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  returnSecureToken: true,
};

export const fetchToken = createAsyncThunk(
  "token/fetchToken",
  async (dataObject) => {
    try {
      const response = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyCeN7LJcOofBVlCBFaLzm_3Oe4KdcuqxQY",
        dataObject
      );

      return response.data;
    } catch (err) {
      return isRejectedWithValue(err);
    }
  }
);

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      console.log("veio no slicer");
    });
    builder.addCase(fetchToken.rejected, (state, action) => {
      console.log(action.error.message);
    });
  },
});

//export const {  } =  ingredientsSlice.actions;

export default tokenSlice.reducer;
