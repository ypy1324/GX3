import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: "",
  },
  reducers: {
    loginUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.accessToken = "";
    },
  },
});

export const { loginUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
