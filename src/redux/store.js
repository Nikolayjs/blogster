import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './slices/notes';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { modalReducer } from './slices/modal';
const store = configureStore({
  reducer: {
    notes: notesReducer,
    posts: postsReducer,
    auth: authReducer,
    modal: modalReducer,
  },
});

export default store;
