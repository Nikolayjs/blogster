import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isOpen: false,
  isConfirm: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state) => {
      state.isOpen = !state.isOpen;
    },
    setConfirm: (state) => {
      state.isConfirm = !state.isConfirm;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { setModal, setConfirm } = modalSlice.actions;
