import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const createUser = createAsyncThunk(
  "user/createUser",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await API.createItem("users", user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await API.getItemById("users", id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",

  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await API.confirmUser(user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    user: {},
    error: "",
    loading: false,
  },
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default userSlice.reducer;
export const { logIn, logOut } = userSlice.actions;
