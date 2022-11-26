import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

let myId;
export const getMyId = (id) => {
  myId = id;
};

export const fetchPosts = createAsyncThunk('posts/fetchNotes', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/ptags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemoveNote', async (id) =>
  axios.delete(`/posts/${id}`)
);
const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    });
    builder.addCase(fetchPosts.rejected, (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    });

    builder.addCase(fetchTags.pending, (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    });
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    });
    builder.addCase(fetchTags.rejected, (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    });
    builder.addCase(fetchRemovePost.rejected, (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const postsReducer = postsSlice.reducer;
