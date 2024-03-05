import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";

export const getCurrentWeekInfo = createAsyncThunk(
  "api/getCurrentWeekInfo",
  async ({ sport, league }, { rejectWithValue }) => {
    try {
      const response = await API.getCurrentWeek(sport, league);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getWeeksInfo = createAsyncThunk(
  "api/getWeeksInfo",
  async ({ sport, league, season, week }, { rejectWithValue }) => {
    try {
      const response = await API.getWeeksInfo(sport, league, season, week);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getStandingsInfo = createAsyncThunk(
  "api/getStandingsInfo",
  async ({ sport, league }, { rejectWithValue }) => {
    try {
      const response = await API.getStandingsInfo(sport, league);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getItemById = createAsyncThunk(
  "api/getItemById",
  async ({ collectionName, id }, { rejectWithValue }) => {
    try {
      const response = await API.getItemById(collectionName, id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    leagueInfo: [],
    season: {},
    week: {},
    day: {},
    item: "",
    events: [],
    games: [],
    allGames: [],
    teams: [],
    standings: [],
    seasons: [],
    winners: [],
    error: "",
    loading: false,
  },
  reducers:{
    setAllGames: (state,action) => {
      const jsonObject = action.payload.map(JSON.stringify);
      const uniqueGames = new Set(jsonObject);
      const uniqueGArray = Array.from(uniqueGames).map(JSON.parse);
      state.allGames = uniqueGArray;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentWeekInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentWeekInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.season = action.payload.season;
        state.week = action.payload.week;
        state.day = action.payload.day;
      })
      .addCase(getCurrentWeekInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(getWeeksInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWeeksInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.leagueInfo = action.payload.leagues[0].calendar;
        state.games = action.payload.events.map((event) =>
          event.status.type.completed === true
            ? {
                name: event.name,
                id: event.id,
                week: event.week,
                date: event.date,
                status: event.status,
                winner: event.competitions[0].competitors.find(
                  (team) => team.winner === true
                ).team.displayName,
                scores: [
                  {
                    home: event.competitions[0].competitors
                      .filter((team) => team.homeAway === "home")
                      .map((item) => ({
                        name: item.team.displayName,
                        score: item.score,
                        logo: item.team.logo,
                      })),
                  },
                  {
                    away: event.competitions[0].competitors
                      .filter((team) => team.homeAway === "away")
                      .map((item) => ({
                        name: item.team.displayName,
                        score: item.score,
                        logo: item.team.logo,
                      })),
                  },
                ],
              }
            : {
                name: event.name,
                id: event.id,
                week: event.week,
                date: event.date,
                status: event.status,
                home: event.competitions[0].competitors
                  .filter((team) => team.homeAway === "home")
                  .map((item) => ({
                    name: item.team.displayName,
                    logo: item.team.logo,
                  })),
                away: event.competitions[0].competitors
                  .filter((team) => team.homeAway === "away")
                  .map((item) => ({
                    name: item.team.displayName,
                    logo: item.team.logo,
                  })),
              }
        );
        state.winners = action.payload.events
          .filter((i) => i.status.type.completed === true)
          .map(
            (event) =>
              event.competitions[0].competitors.find(
                (team) => team.winner === true
              ).team.displayName
          );
      })
      .addCase(getWeeksInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
    builder
      .addCase(getStandingsInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStandingsInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.standings = action.payload.children;
        state.seasons = action.payload.seasons;
      })
      .addCase(getStandingsInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });

    builder
      .addCase(getItemById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.item = action.payload.item;
      })
      .addCase(getItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default apiSlice.reducer;
export const { setAllGames } = apiSlice.actions;
