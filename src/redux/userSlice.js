import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};

const userSlice = createSlice({
  name: "userToken",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user = action.payload;
      console.log("User Token updated: ", state.user);
    },
  },
});

export const { setToken } = userSlice.actions;
export default userSlice.reducer;
