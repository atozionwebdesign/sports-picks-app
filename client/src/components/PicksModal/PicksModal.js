import { useEffect, useState } from "react";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";

import { getWeeksInfo } from "../../redux/features/apiSlice";

import { winnersSelector, userSelector } from "../../redux/selectors";

import "./PicksModal.css";

import { createPick, updatePick } from "../../redux/features/pickSlice";
import store from "../../redux/store";
// import API from "../../redux/API";

import {
  formatDate,
  classNames,
  isElementLoaded,
} from "../../utils/HelperFunctions";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

const Modal = (props) => {
  const dispatch = useDispatch();

  // const weekRef = useRef();
  // const seasonRef = useRef();

  const sport = props.sport;
  const league = props.league;
  const closeModal = props.closeModal;
  const [week, setWeek] = useState({}); // Current week and season codes for api call'
  const [weeks, setWeeks] = useState([]); // Weeks drop down values
  const [seasons, setSeasons] = useState([]); // Seasons drop down values
  const [games, setGames] = useState([]);
  const [dates, setDates] = useState([]);

  const [picks, setPicks] = useState([]);

  const winners = useSelector(winnersSelector);
  const currentUser = useSelector(userSelector);

  useEffect(() => {
    setPicks([]);
    getData(props.week.season, props.week.week);
    setPicks(
      store.getState().pick.userPicks.map((pick) => ({
        team: pick.team,
        gameId: pick.gameId,
        status: "saved",
      }))
    );

    setTimeout(function () {
      if (store.getState().pick.userPicks.length > 0) {
        store.getState().pick.userPicks.map((pick) => {
          const btn = document.getElementById(
            pick.team + "-" + pick.gameId + "-btn"
          );
          if (btn) {
            addActiveClass(btn);
          }
        });
      }
    }, 1000);
  }, []);

  const getData = (seasonData, weekData) => {
    setWeek({ season: seasonData, week: weekData });

    dispatch(
      getWeeksInfo({
        sport: sport,
        league: league,
        season: seasonData,
        week: weekData,
      })
    )
      .then((data) => {
        setSeasons(
          store.getState().api.leagueInfo.map((data) => ({
            label: data.label,
            value: data.value,
          }))
        );
        setWeeks(
          store
            .getState()
            .api.leagueInfo.find((item) => item.value === seasonData).entries
        );
        setGames(store.getState().api.events);
        setDates(
          [
            ...new Set(store.getState().api.events.map((item) => item.date)),
          ].sort()
        );
      })
      .then((data) => {
        populateNFLTable();
        populateUserPicks();
      });
  };

  const populateNFLTable = () => {
    return (
      <Table className="sport-table my-2">
        <tbody>
          {dates.map((date, i) => (
            <React.Fragment key={i}>
              <tr
                key={"d" + i}
                style={{ backgroundColor: "#122E39", textAlign: "left" }}
              >
                <td colSpan={12}>
                  <p className="m-2">{formatDate(date)}</p>
                </td>
              </tr>
              {games
                .filter((game) => game.date === date)
                .map((game, index) => (
                  <React.Fragment key={index}>
                    <tr key={"game" + index}>
                      <td>
                        <Button
                          className={classNames("pick-btn")}
                          onClick={handlePickClick}
                          name={
                            game.competitions[0].competitors.find(
                              (item) => item.homeAway === "away"
                            ).team.displayName
                          }
                          id={
                            game.competitions[0].competitors.find(
                              (item) => item.homeAway === "away"
                            ).team.displayName +
                            "-" +
                            game.id +
                            "-btn"
                          }
                          game={game.id}
                          date={date}
                        >
                          {game.competitions[0].competitors.find(
                            (item) => item.homeAway === "away"
                          ).team.logo ? (
                            <img
                              className="logo"
                              src={
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "away"
                                ).team.logo
                              }
                              alt=""
                              name={
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "away"
                                ).team.displayName
                              }
                              game={game.id}
                              date={date}
                            ></img>
                          ) : (
                            ""
                          )}
                          <br />
                          {
                            game.competitions[0].competitors.find(
                              (item) => item.homeAway === "away"
                            ).team.displayName
                          }
                          <br />

                          {game.competitions[0].competitors.find(
                            (item) => item.homeAway === "away"
                          ).records
                            ? game.competitions[0].competitors
                                .find((item) => item.homeAway === "away")
                                .records.find(
                                  (record) => record.type === "total"
                                ).summary
                            : ""}
                        </Button>
                      </td>
                      <td>
                        <p className="center mx-2">@</p>
                      </td>
                      <td>
                        <Button
                          className={classNames("pick-btn")}
                          name={
                            game.competitions[0].competitors.find(
                              (item) => item.homeAway === "home"
                            ).team.displayName
                          }
                          onClick={handlePickClick}
                          id={
                            game.competitions[0].competitors.find(
                              (item) => item.homeAway === "home"
                            ).team.displayName +
                            "-" +
                            game.id +
                            "-btn"
                          }
                          game={game.id}
                          date={date}
                        >
                          {game.competitions[0].competitors.find(
                            (item) => item.homeAway === "home"
                          ).team.logo ? (
                            <img
                              className="logo"
                              src={
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "home"
                                ).team.logo
                              }
                              alt=""
                              name={
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "home"
                                ).team.displayName
                              }
                              game={game.id}
                              date={date}
                            ></img>
                          ) : (
                            ""
                          )}
                          <br />
                          {
                            game.competitions[0].competitors.find(
                              (item) => item.homeAway === "home"
                            ).team.displayName
                          }

                          <br />

                          {game.competitions[0].competitors.find(
                            (item) => item.homeAway === "home"
                          ).records
                            ? game.competitions[0].competitors
                                .find((item) => item.homeAway === "home")
                                .records.find(
                                  (record) => record.type === "total"
                                ).summary
                            : ""}
                        </Button>
                      </td>
                      <td>
                        {game.competitions[0].odds ? (
                          game.competitions[0].odds[0].details
                        ) : game.status.type.completed === true ? (
                          <div className="left" style={{ marginLeft: "20%" }}>
                            <p
                              className={classNames(
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "away"
                                ).winner === true
                                  ? "turquoise-text"
                                  : ""
                              )}
                            >
                              {
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "away"
                                ).team.abbreviation
                              }
                              :&nbsp;
                              {
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "away"
                                ).score
                              }{" "}
                              {game.competitions[0].competitors.find(
                                (item) => item.homeAway === "away"
                              ).winner === true ? (
                                <i className="bi bi-trophy"></i>
                              ) : (
                                ""
                              )}
                            </p>

                            <p
                              className={classNames(
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "home"
                                ).winner === true
                                  ? "turquoise-text"
                                  : ""
                              )}
                            >
                              {
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "home"
                                ).team.abbreviation
                              }
                              :&nbsp;
                              {
                                game.competitions[0].competitors.find(
                                  (item) => item.homeAway === "home"
                                ).score
                              }{" "}
                              {game.competitions[0].competitors.find(
                                (item) => item.homeAway === "home"
                              ).winner === true ? (
                                <i className="bi bi-trophy"></i>
                              ) : (
                                ""
                              )}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    );
  };

  const populateUserPicks = () => {
    // Clear all active
    const btns = Array.prototype.slice.call(
      document.getElementsByClassName("pick-btn")
    );
    btns.map((btn) => removeActiveClass(btn));
    setTimeout(function () {
      if (picks.length > 0) {
        picks.map((pick) => {
          const btn = document.getElementById(
            pick.team + "-" + pick.gameId + "-btn"
          );
          if (btn) {
            addActiveClass(btn);
          }
        });
      }
    }, 1000);
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    // document.getElementById(e.target.id).size = 1;
    // document.getElementById(e.target.id).blur();

    if (e.target.name === "season") {
      getData(value, 1);
    } else {
      getData(week.season, value);
    }
  };

  const handleSaveClick = () => {
    const picksArray = [];
    const updateArray = [];
    if (picks.length > 0) {
      picks
        .filter((pick) => pick.status === "new")
        .map((pick) =>
          picksArray.push({
            season: pick.season,
            week: pick.week,
            league: league,
            gameId: pick.gameId,
            team: pick.team,
            date: pick.date,
            userId: currentUser._id.toString(),
            winner: winners.includes(pick.team),
          })
        );

      picks
        .filter((pick) => pick.status === "update")
        .map((pick) =>
          updateArray.push({
            team: pick.team,
            gameId: pick.gameId,
            winner: winners.includes(pick.team),
          })
        );
      dispatch(createPick({ picks: picksArray }));
      if (updateArray.length > 0) {
        updateArray.map((pick) =>
          dispatch(
            updatePick({
              gameId: pick.gameId,
              update: { team: pick.team, winner: pick.winner },
            })
          )
        );
      }
    }
    closeModal();
  };

  const handlePickClick = (e) => {
    const name = e.target.name;
    const gameId = e.target.getAttribute("game");
    const date = e.target.getAttribute("date");
    const btn = document.getElementById(name + "-" + gameId + "-btn");
    addActiveClass(btn);

    // Handle picks
    const pick = picks.find((pick) => pick.gameId === gameId);

    return pick
      ? pick.team === name
        ? ""
        : (removeActiveClass(
            document.getElementById(pick.team + "-" + gameId + "-btn")
          ),
          ((pick.team = name), (pick.status = "update")))
      : setPicks([
          ...picks,
          {
            team: name,
            gameId: gameId,
            date: date,
            status: "new",
            season: week.season,
            week: week.week,
          },
        ]);
  };

  const addActiveClass = (e) => {
    e.classList.add("active-pick");
  };

  const removeActiveClass = (e) => {
    e.classList.remove("active-pick");
  };

  // const handleOnFocus = (e) => {
  //   const id = e.target.id;

  //   if (id === "seasons"){
  //     document.getElementById(id).size = seasons.length
  //   }

  // }

  // const handleOnBlur = (e) => {
  //   const id = e.target.id;
  //   if (id === "seasons"){
  //     document.getElementById(id).size = 0;
  //   }
  // }

  return (
    <div className="center">
      <p className="table-title" style={{ margin: 0 }}>
        Make Your Picks
      </p>

      <img
        id="picksTopImg"
        src={require("../../assets/images/sport-fans-group.png")}
        alt=""
      ></img>
      <p style={{ fontSize: "80%" }}>
        Use the drop downs to Select the appropriate event{" "}
        <i className="bi bi-caret-right-fill yellow-text"></i> Click on your
        selection(s) <i className="bi bi-caret-right-fill yellow-text"></i> Save
        your pick(s). Good luck!
      </p>
      <p style={{ fontSize: "80%" }}>
        <span className="magenta-text bold">
          <i className="bi bi-patch-exclamation"></i>
          Note:
        </span>{" "}
        Picks can be made and updated up until the time of the event.
      </p>
      <Form.Select
        // onFocus={handleOnFocus}
        // onBlur={handleOnBlur}
        onChange={handleSelect}
        value={week.season}
        className="filter-select"
        name="season"
        id="seasons"
        // ref={seasonRef}
      >
        {seasons.map((season, index) => (
          <option key={index} value={season.value} href="">
            {season.label}
          </option>
        ))}
      </Form.Select>

      <Form.Select
        onChange={handleSelect}
        value={week.week}
        className="filter-select"
        name="week"
        //       ref={weekRef}
      >
        {weeks.map((week, index) => (
          <option key={index} value={week.value} href="">
            {week.label}
          </option>
        ))}
      </Form.Select>

      {populateNFLTable()}
      <div
        className="center"
        style={{ width: "40%", margin: "20px auto 0 auto" }}
      >
        <Button className="magenta-btn wide-btn" onClick={handleSaveClick}>
          {" "}
          SAVE PICKS
        </Button>
      </div>
    </div>
  );
};

export default Modal;
