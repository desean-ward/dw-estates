"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      console.log("state.currentUser", state.currentUser);
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("state.error", state.error);
    },
    signout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  signout,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
