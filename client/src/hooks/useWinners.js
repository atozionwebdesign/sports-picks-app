import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getWeeksInfo, setAllGames } from "../redux/features/apiSlice";
import { updatePick } from "../redux/features/pickSlice";

import { allGamesSelector } from "../redux/selectors";

import store from "../redux/store";

export async function useWinners(sport, league) {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const p = store.getState().pick.picks;
  const allGames = useSelector(allGamesSelector);

  let gAll = [];

  useEffect(() => {
    formatWeeks
      .then((wkArray) =>
        populateGames(wkArray)
      )
      .then(
        setTimeout(function () {
          updatePicks();
        }, 500)
      );
  }, []);

  const formatWeeks = new Promise((resolve) => {
    const wA = p.map((pick) =>
      JSON.stringify({ week: pick.week, season: pick.season })
    );
    let w = [...new Set(wA)];
    w = w
      .map((item) => JSON.parse(item))
      .sort((a, b) => b.season - a.season)
      .sort((a, b) => b.week - a.week);

    resolve(w);
  });

  const populateGames = (weekArray) => {
      for (let i = 0; i < weekArray.length; i++) {
        const data = weekArray[i];
        dispatch(
          getWeeksInfo({
            sport: sport,
            league: league,
            season: data.season,
            week: data.week,
          })
        ).then((data) => {
          const g = store.getState().api.games;
          gAll.push(...g);
          if (i === weekArray.length - 1) {

            setTimeout(function () {
              dispatch(setAllGames(gAll));
            }, 500);
          }
        });
      }
  };

  const updatePicks = () => {
    const picks = p.filter((pick) => pick.evaluated === false);
    if (picks && picks.length > 0) {
      picks.map((pick) => {
        const game = allGames.find((item) => item.id === pick.gameId);
        if (game && game.status.type.completed) {
          if (game.winner === pick.team) {
            dispatch(
              updatePick({
                gameId: pick.gameId,
                update: {
                  winner: true,
                  evaluated: true,
                },
              })
            );
          } else {
            dispatch(
              updatePick({
                gameId: pick.gameId,
                update: {
                  evaluated: true,
                },
              })
            );
          }
        }
      });
    }
  };
  return { loaded: true, weeks: formatWeeks };
}
