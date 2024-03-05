import { useEffect, useState, useContext, createContext } from "react";
import { createRoot } from "react-dom/client";

import PicksTable from "../PicksTable/PicksTable";
import CalculateUserStandings from "../CalculateUserStandings/CalculateUserStandings";

import Table from "react-bootstrap/Table";
import "./StandingsModal.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const StandingsModal = (props) => {
  let userStandings = CalculateUserStandings();
  const [standings, setStandings] = useState();

  useEffect(() => {
    if (!standings) {
      userStandings.then((res) => {
        setStandings(res);
        populateStandings(res);
      });
    }
  }, [standings]);

  const populateStandings = (tdata) => {
    const weeks = tdata.standings.weeklyWins.length;

    const standingsDiv = document.getElementById("standingsDiv");
    const root = createRoot(standingsDiv);

    setTimeout(function () {
      const maxWins = tdata.standings.overallWins.sort(
        (a, b) => b.wins - a.wins
      )[0].wins;
      const standingsTable = (
        <>
          {/* <h4>Overall Standings</h4> */}
          <div className="standings-div">
            <Table className="standings-table">
              <thead>
                <tr className="center">
                  <th colSpan={4}></th>
                  <th colSpan={2}>W</th>
                  <th colSpan={2}>L</th>
                  <th colSpan={2}>GB</th>
                </tr>
              </thead>
              <tbody>
                {tdata.standings.overallWins
                  .sort((a, b) => b.wins - a.wins)
                  .map((user, i) => (
                    <tr className="center" key={i}>
                      <td colSpan={4}>
                        <img
                          className="small-icon"
                          src={user.profilePic}
                          alt=""
                        ></img>
                        <p className="no-margin">{user.name}</p>
                      </td>
                      <td colSpan={2}>
                        <p>{user.wins}</p>
                      </td>
                      <td colSpan={2}>
                        <p>{weeks - user.wins}</p>
                      </td>
                      <td colSpan={2}>
                        <p>{maxWins - user.wins}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </>
      );

      root.render(standingsTable);
    }, 2000);
  };

  return (
    <div>
      <p className="table-title center" style={{ margin: 0 }}>
        Picks & Standings{" "}
      </p>
      <div className="center">
        <img
          id="trophyCupImg"
          src={require("../../assets/animations/trophy-cup.gif")}
          alt=""
        ></img>
      </div>

      <div id="standingsDiv"></div>

      {standings !== undefined ? (
        <>
          <PicksTable
            sport={props.sport}
            league={props.league}
            week={props.week}
            closeModal={props.closeModal}
            overallStandings={standings}
            key={standings}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default StandingsModal;
