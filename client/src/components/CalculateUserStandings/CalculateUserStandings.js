import { useState, useEffect } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import store from "../../redux/store";
import { createRoot } from "react-dom/client";
import { getUser } from "../../redux/features/userSlice";

// Custom Hooks
import useWeeks from "../../hooks/useWeeks";

const CalculateUserStandings = () => {
  const dispatch = useDispatch();
  const p = store.getState().pick.picks;
  // const [loaded, setLoaded] = useState(false);
  // const setStandings = props.setStandings;
  // const s = props.standings;

  useEffect(() => {
  }, []);

  const getUserIds = (picks) => {
    const u = picks.map((pick) => pick.userId);
    const uIds = [...new Set(u)];
    return uIds;
  };

  const getUsersById = (uArray) => {
    let users = [];
    uArray.map((uId) => {
      dispatch(getUser({ id: uId })).then((data) => {
        const user = data.payload;
        user.wins = 0;
        users.push(user);
      });
    });

    return users;
  };

  const getAllUsers = () => {
    const uIds = getUserIds(p);

    const users = getUsersById(uIds);
    return users;
  };

  const getRecords = (uIdArray, picks) => {
    const uIds = uIdArray;
    // const users = uArray;

    // const getUser = (uId) => {
    //   return users.find((user) => user.id === uId);
    // };

    let recordsArray = [];
    uIds.map((uId) => {
      const userPicks = picks.filter((pick) => pick.userId === uId);
      const total = userPicks.length;

      const wins = userPicks.filter((pick) => pick.winner === true).length;

      const losses = total - wins;

      const record = { wins: wins, losses: losses, total: total, user: uId };
      recordsArray.push(record);
    });
    // console.log(recordsArray);

    return recordsArray;
  };

  const GetStandings = () => {
    const weeksData = useWeeks(p);
    const weeks = weeksData.weeks;
    const seasons = weeksData.seasons;
    const allUsers = getAllUsers();

    let records = [];

    // Get records by week
    weeks.map((week) => {
      const picks = p.filter((pick) => pick.week === week.week);

      const uIds = getUserIds(picks);

      const wkRecords = {
        week: week.week,
        season: week.season,
        records: getRecords(uIds, picks),
      };

      records.push(wkRecords);
    });

    let standings;
    Promise.resolve(allUsers).then(
      (standings = getOverallStandings(records, allUsers))
    );

    return { standings: standings, seasons: seasons };
  };

  const calcWeeklyWins = (wArray) => {
    const winners = [];
    wArray.map((w) => {
      const r = w.records.sort((a, b) => a.wins - b.wins);

      const high = r[0].wins;

      const users = w.records
        .filter((record) => record.wins === high)
        .map((record) => record.user);

      winners.push({
        wins: high,
        users: users,
        week: w.week,
        season: w.season,
      });
    });

    return winners;
  };

  const calcOverallWins = (w, u) => {
    let wkArray = w;
    let standings = u;

    wkArray.map((week) => {
      const users = week.users;
      users.map((uId) => {
        setTimeout(function () {
          let winner = standings.find((u) => u.id === uId);
          if (winner) {
            winner.wins++;
          }
        }, 500);
      });
    });
    return standings;
  };

  const getOverallStandings = (wkRecords, allUsers) => {
    const weeklyWins = calcWeeklyWins(wkRecords, allUsers);
    const overallwins = calcOverallWins(weeklyWins, allUsers);

    return { weeklyWins: weeklyWins, overallWins: overallwins };
  };

  const populateStandings = () => {
    return Promise.resolve(GetStandings());
  };
  const standings = populateStandings();
  return standings;
};

export default CalculateUserStandings;
