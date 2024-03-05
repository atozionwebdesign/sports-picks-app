import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const getDivisions = createAsyncThunk(
  "division/getDivisions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getItems("divisions");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const divisionSlice = createSlice({
  name: "division",
  initialState: {
    divisions: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDivisions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDivisions.fulfilled, (state, action) => {
        state.loading = false;
        state.divisions = action.payload;
      })
      .addCase(getDivisions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default divisionSlice.reducer;
