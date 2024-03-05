import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const createPick = createAsyncThunk(
  "pick/createPick",
  async ({ picks }, { rejectWithValue }) => {
    try {
      const response = await API.createItem("picks", picks);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllPicks = createAsyncThunk(
  "pick/getAllPicks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getItems("picks");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updatePick = createAsyncThunk(
  "pick/updatePick",
  async ({ gameId, update }, { rejectWithValue }) => {
    try {
      const response = await API.updateItem("picks", gameId, update);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const pickSlice = createSlice({
  name: "pick",
  initialState: {
    loading: false,
    currentPicks: [],
    picks: [],
    userPicks: [],
    winningPicks: [],
  },
  reducers: {
    filterUserPicks: (state, action) => {
      if (action.payload.picks.length > 0) {
        let filteredPicks = action.payload.picks.filter(
          (pick) => pick.userId === action.payload.userId
        );
        state.userPicks = filteredPicks;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPick.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPick.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPicks = action.payload;
      })
      .addCase(createPick.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(getAllPicks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPicks.fulfilled, (state, action) => {
        state.loading = false;
        state.picks = action.payload;
        let winningPicks = action.payload.filter(
          (pick) => pick.winner === true
        );
        state.winningPicks = winningPicks;

      })
      .addCase(getAllPicks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default pickSlice.reducer;
export const { filterUserPicks} = pickSlice.actions;
