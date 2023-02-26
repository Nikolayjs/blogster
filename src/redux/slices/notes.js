import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

let myId;
export const getMyId = (id) => {
  myId = id;
};

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const { data } = await axios.get('/notes', {
    params: {
      _limit: 10,
      _page: 1,
    },
  });
  return data.filter((el) => el.user?._id === myId);
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
    builder.addCase(fetchRemoveNote.pending, (state, action) => {
      state.notes.items = state.notes.items.filter((obj) => obj._id !== action.meta.arg);
    });
  },
});

export const notesReducer = notesSlice.reducer;
