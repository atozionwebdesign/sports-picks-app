import { configureStore } from "@reduxjs/toolkit";
import teamSlice from "./features/teamSlice";
import apiSlice from "./features/apiSlice";
import userSlice from "./features/userSlice";
import pickSlice from "./features/pickSlice";

const store = configureStore({
  reducer: {
    team: teamSlice,
    api: apiSlice,
    user: userSlice,
    pick: pickSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
});

export default store;
