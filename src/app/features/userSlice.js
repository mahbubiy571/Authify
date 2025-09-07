import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authReady: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.user = {
        ...payload,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          payload.displayName || "User"
        )}&background=random`,
      };
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthReady: (state) => {
      state.authReady = true;
    },
  },
});

export const { login, logout, isAuthReady } = userSlice.actions;
export default userSlice.reducer;
