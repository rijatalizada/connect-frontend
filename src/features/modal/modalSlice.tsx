import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  success: true,
  title: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, { payload }) => {
      state.isOpen = payload;
    },
    setTitle: (state, { payload }) => {
      state.title = payload;
    },
    toggleSuccess: (state, { payload }) => {
      state.success = payload;
    },
  },
});

export const { toggleModal, setTitle, toggleSuccess } = modalSlice.actions;

export default modalSlice.reducer;
