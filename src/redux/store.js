import { configureStore } from '@reduxjs/toolkit';
import { notesReducer } from './slices/notes';
import { postsReducer } from './slices/posts';
import { authReducer } from './slices/auth';
import { modalReducer } from './slices/modal';
import { commentsReducer } from './slices/comments';
const store = configureStore({
  reducer: {
    notes: notesReducer,
    posts: postsReducer,
    auth: authReducer,
    modal: modalReducer,
    comments: commentsReducer,
  },
});

export default store;
