import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const getTeamsByLeague = createAsyncThunk(
  "team/getTeamsByLeague",
  async ({ league }, { rejectWithValue }) => {
    try {
      const response = await API.getItemsByLeague("teams", league);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const teamSlice = createSlice({
  name: "team",
  initialState: {
    teams: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsByLeague.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeamsByLeague.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(getTeamsByLeague.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default teamSlice.reducer;
