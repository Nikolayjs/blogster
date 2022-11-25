import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

let myId;
export const getMyId = (id) => {
  myId = id;
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async (query) => {
  const { data } = await axios.get('/notes');
  return data.filter((el) => el.user._id === myId);
});

export const fetchTags = createAsyncThunk('notes/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemoveNote = createAsyncThunk('notes/fetchRemoveNote', async (id) =>
  axios.delete(`/notes/${id}`)
);

const initialState = {
  notes: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => {
      state.notes.items = [];
      state.notes.status = 'loading';
    });
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      state.notes.items = action.payload;
      state.notes.status = 'loaded';
    });
    builder.addCase(fetchNotes.rejected, (state) => {
      state.notes.items = [];
      state.notes.status = 'error';
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

    builder.addCase(fetchRemoveNote.pending, (state, action) => {
      state.notes.items = state.notes.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const notesReducer = notesSlice.reducer;
