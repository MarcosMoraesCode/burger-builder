import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  tokenId: null,
  error: null,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    getUserInfo: (state, action) => {
      state.userId = action.payload.localId;
      state.tokenId = action.payload.idToken;
      console.log(state.userId);
      console.log(state.tokenId);
    },
  },
  extraReducers: (builder) => {},
});

export const { getUserInfo } = tokenSlice.actions;

export default tokenSlice.reducer;
