import { useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import * as React from "react";
import { createRoot } from "react-dom/client";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./PicksTable.css";

import { getUser } from "../../redux/features/userSlice";

import store from "../../redux/store";

import { useWinners } from "../../hooks/useWinners";
import { classNames, formatDate } from "../../utils/HelperFunctions";

const PicksTable = (props) => {
  const sport = props.sport;
  const league = props.league;
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const overallStandings = props.overallStandings;
  let winners = useWinners(sport, league);

  useEffect(() => {
    winners.then((res) => {
      setTimeout(function () {
        formatTableData(res.weeks);
      }, 1000);
    });
  }, []);

  async function formatTableData(w) {
    let tArray = [];
    let dArray = [];
    let dates = [];

    const allGames = store.getState().api.allGames;
    const wPicks = store.getState().pick.winningPicks;

    const getUsers = (users) => {
      let uArray = [];
      users.map((user) => {
        dispatch(getUser({ id: user.userId })).then((data) => {
          uArray.push(data.payload);
        });
      });
      return uArray;
    };

    if (allGames && allGames.length > 0) {
      let promise = new Promise((resolve) => {
        allGames.map((game) => {
          dArray.push(
            JSON.stringify({
              date: formatDate(game.date),
              week: game.week.number.toString(),
            })
          );
          const userIds = wPicks.filter((pick) => pick.gameId === game.id);
          let u = [];
          Promise.resolve(getUsers(userIds)).then((users) => {
            u = users;
          });

          setTimeout(function () {
            const t = {
              date: formatDate(game.date),
              id: game.id,
              homeTeam: game.scores[0].home[0].name,
              homeScore: game.scores[0].home[0].score,
              awayTeam: game.scores[1].away[0].name,
              awayScore: game.scores[1].away[0].score,
              week: game.week.number.toString(),
              homeLogo: game.scores[0].home[0].logo,
              awayLogo: game.scores[1].away[0].logo,
              winner: game.status.type.completed === true ? game.winner : "",
              users: u,
            };
            tArray.push(t);
          }, 1000);
        });
        resolve(tArray, dArray);
      });

      promise.then(
        (dates = [...new Set(dArray)].map((item) => JSON.parse(item))),
        w.then((res) => {
          setTimeout(function () {
            populateNFLTable(tArray, dates, res);
          }, 1000);
        })
      );
    }
  }

  const populateNFLTable = (t, d, w) => {
    const seasons = [...new Set(w.map((item) => item.season))].sort(
      (a, b) => b - a
    );
    const seasonDef = [
      { name: "Preseason", value: "1" },
      { name: "Regular Season", value: "2" },
      { name: "Post Season", value: "3" },
    ];
    let weeklyWinners = [];
    let users = [];

    if (overallStandings) {
      weeklyWinners = overallStandings.standings.weeklyWins;
      users = overallStandings.standings.overallWins;
    }

    const populateWinners = (week, i) => {
      const w = weeklyWinners.find((w) => w.week === week.toString());

      const wkWinners = w.users.map((winner) => {
        const u = users.find((user) => user.id === winner);
        return u;
      });

      let td;

      if (w) {
        return (td = (
          <td style={{ textAlign: "right" }}>
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip>
                  {wkWinners.length > 0 ? (
                    <div style={{ textAlign: "left" }}>
                      Week {w.week} winners w/ <strong>{w.wins} </strong>wins:
                      <ul>
                        {wkWinners.map((winner, j) => (
                          <li key={j}>{winner.name}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </Tooltip>
              }
            >
              <img
                key={"img" + i}
                className="crown-icon"
                src={require(`../../assets/crowns/crown-${week % 4}.png`)}
                alt=""
              ></img>
            </OverlayTrigger>
          </td>
        ));
      } else {
        return (td = "");
      }
    };

    const table = (
      <>
        {/* <p
          style={{

            textDecoration: "underline",
            textDecorationColor: "#501F3A",
          }}
          className="turquoise-text table-title"
        >
          PICKS
        </p> */}
        <p style={{ textAlign: "center", fontSize: "80%" }}>
          Click a heading below{" "}
          <i className="bi bi-caret-right-fill yellow-text"></i> View the
          corresponding picks and winners!
        </p>
        <Table className="picks-table rounded center ">
          <tbody>
            {seasons.map((season, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td colSpan={12} className="center">
                    <p className="table-header">
                      {seasonDef.find((item) => item.value === season).name}
                    </p>
                  </td>
                </tr>
                {w
                  .filter((item) => item.season === season)
                  .map((week, i) => (
                    <React.Fragment key={"week" + i}>
                      <tr
                        className="dark left accordion-toggle collapsed"
                        id="weekAccordion"
                        href={"#collapseWeek" + i}
                      >
                        <td colSpan={12}>
                          <Button
                            className="accordion-button collapsed"
                            data-bs-toggle="collapse"
                            data-bs-target={"#collapseWeek-" + season + i}
                          >
                            <div style={{ padding: "5px", width: "100%" }}>
                              <table
                                id="accordion-table"
                                style={{ width: "100% " }}
                              >
                                <tbody>
                                  <tr style={{ border: "none !important" }}>
                                    <td colSpan={2}>
                                      <i className="bi bi-plus"></i>WEEK{" "}
                                      {week.week}
                                    </td>
                                    {populateWinners(week.week, i)}
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={12} className="no-padding">
                          <div
                            id={"collapseWeek-" + season + i}
                            className="collapse"
                          >
                            <table style={{ width: "100%" }}>
                              <tbody>
                                <tr style={{backgroundColor:"#250e1b"}}>
                                  <td style={{ width: "25%" }}></td>
                                  <td style={{ width: "10%" }}>
                                    <p>MATCHUP</p>
                                  </td>
                                  <td style={{ width: "25%" }}></td>
                                  <td>
                                  <p>WINNING PLAYERS</p>
                                  </td>
                                </tr>
                                {d.length > 0
                                  ? d
                                      .filter((item) => item.week === week.week)
                                      .map((date, j) => (
                                        <React.Fragment key={"date" + j}>
                                          <tr className=" magenta" >
                                            <td colSpan={12}>
                                              <p>{date.date}</p>
                                            </td>
                                          </tr>
                                          {t
                                            .filter(
                                              (data) => data.date === date.date
                                            )
                                            .map((item, k) => (
                                              <tr key={k}>
                                                <td style={{ width: "16%" }}>
                                                  <div
                                                    className={classNames(
                                                      item.awayTeam ===
                                                        item.winner
                                                        ? "winner"
                                                        : ""
                                                    )}
                                                  >
                                                    <img
                                                      key={"img" + k}
                                                      className="logo"
                                                      src={item.awayLogo}
                                                      alt=""
                                                    ></img>
                                                    <p>
                                                      {item.awayTeam}:{" "}
                                                      {item.awayScore}
                                                    </p>
                                                  </div>
                                                </td>
                                                <td style={{ width: "8%" }}>
                                                  @
                                                </td>
                                                <td style={{ width: "16%" }}>
                                                  <div
                                                    className={classNames(
                                                      item.homeTeam ===
                                                        item.winner
                                                        ? "winner"
                                                        : ""
                                                    )}
                                                  >
                                                    <img
                                                      key={"img" + k}
                                                      className="logo"
                                                      src={item.homeLogo}
                                                      alt=""
                                                    ></img>
                                                    <p>
                                                      {item.homeTeam}:{" "}
                                                      {item.homeScore}
                                                    </p>
                                                  </div>
                                                </td>
                                                <td colSpan={7}>
                                                  {item.users &&
                                                  item.users.length > 0
                                                    ? item.users.map(
                                                        (user, i) => (
                                                          <div
                                                            key={i}
                                                            style={{
                                                              display:
                                                                "inline-block",
                                                            }}
                                                          >
                                                            <OverlayTrigger
                                                              placement="bottom"
                                                              overlay={
                                                                <Tooltip>
                                                                  {user.name}
                                                                </Tooltip>
                                                              }
                                                            >
                                                              <img
                                                                className="winner-icon"
                                                                src={
                                                                  user.profilePic
                                                                }
                                                                alt=""
                                                              ></img>
                                                            </OverlayTrigger>
                                                            <p>
                                                              <small>
                                                                {user.name}
                                                              </small>
                                                            </p>
                                                          </div>
                                                        )
                                                      )
                                                    : ""}
                                                </td>
                                              </tr>
                                            ))}
                                        </React.Fragment>
                                      ))
                                  : ""}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </>
    );

    if (!loaded) {
      setLoaded(true);
    }
    const tableDiv = document.getElementById("tableDiv");

    if (!loaded) {
      const root = createRoot(tableDiv);
      root.render(table);
    }
  };

  return <div id="tableDiv"></div>;
};

export default PicksTable;
