import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { test: "test" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("User Token updated: ", state.user);
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
