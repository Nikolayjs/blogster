import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isConfirm: false,
  id: '',
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
    setId: (state, id) => {
      state.id = id.payload;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const { setModal, setConfirm, setId } = modalSlice.actions;
