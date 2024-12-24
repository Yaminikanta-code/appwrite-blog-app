import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets the authentication status to true and stores the user data in the state.
     * @param {Object} action The action object containing the user data.
     * @property {Object} action.payload The user data object.
     */
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
    },

    /**
     * Sets the authentication status to false and clears the user data from the state.
     */
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export default authSlice.reducer;

export const { login, logout } = authSlice.actions;
