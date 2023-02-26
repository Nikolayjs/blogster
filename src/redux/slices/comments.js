import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async (id) => {
  const { data } = await axios.get(`/posts/${id}/comments`);
  return data.filter((el) => el.postId === id);
});

export const fetchRemoveComment = createAsyncThunk('comments/fetchRemoveComment', async (id) => {
  return axios.delete(`posts/${id}/comments/${id}`);
});

const initialState = {
  comments: {
    items: [],
    status: 'loading',
  },
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'loaded';
    });
    builder.addCase(fetchComments.rejected, (state) => {
      state.comments.items = [];
      state.comments.status = 'error';
    });
    builder.addCase(fetchRemoveComment.pending, (state, action) => {
      state.comments.items = state.comments.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const commentsReducer = commentsSlice.reducer;
