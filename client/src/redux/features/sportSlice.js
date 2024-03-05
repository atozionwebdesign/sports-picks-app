import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const getSports = createAsyncThunk(
  "sport/getSports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getItems("sports");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const sportSlice = createSlice({
  name: "sport",
  initialState: {
    sports: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSports.fulfilled, (state, action) => {
        state.loading = false;
        state.sports = action.payload;
      })
      .addCase(getSports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default sportSlice.reducer;
