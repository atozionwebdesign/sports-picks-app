import { useEffect, useState } from "react";
import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import store from "../../redux/store";
import { sportsLeagues } from "../../data/Data";

import { classNames } from "../../utils/HelperFunctions";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapModal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

import "./Tab.css";
import PicksModal from "../PicksModal/PicksModal";
// import PicksTable from "../PicksTable/PicksTable";
import StandingsModal from "../StandingsModal/StandingsModal";

import {
  getCurrentWeekInfo,
  getStandingsInfo,
} from "../../redux/features/apiSlice";

import { getAllPicks, filterUserPicks } from "../../redux/features/pickSlice";

import { getTeamsByLeague } from "../../redux/features/teamSlice";
import { loggedInSelector, userSelector } from "../../redux/selectors";
import { act } from "react";

const Tab = (props) => {
  const dispatch = useDispatch();
  const sport = props.sport.toLowerCase();
  const leagues = sportsLeagues.find((item) => item.sport === sport);
  const [showModal, setShowModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [active, setActive] = useState("");
  const [league, setLeague] = useState("");
  const [teamsState, setTeamsState] = useState([]); // store.getState().api.standings
  const [teams, setTeams] = useState([]); // All team/stat data
  const [teamsDivisions, setTeamsDivisions] = useState([]); // Teams by division
  const [conferences, setConferences] = useState([]); // Table values
  const [divisions, setDivisions] = useState([]); // Table values
  const [week, setWeek] = useState({}); // Current week (football)
  const [day, setDay] = useState({}); // Current week
  const [season, setSeason] = useState("");

  const [filter, setFilter] = useState(); // Table filters

  const logInSelector = useSelector(loggedInSelector);
  const currentUser = useSelector(userSelector);

  useEffect(() => {});

  const closeModal = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowModal(false);
    setShowTable(false);
  };

  const handleLeagueClick = (e) => {
    setActive(e.target.name);
    const leagueData = e.target.name.toLowerCase();
    setLeague(leagueData);
    dispatch(getStandingsInfo({ sport: sport, league: leagueData })).then(
      (data) => {
        let teamsData = store.getState().api.standings;
        setSeason(
          store.getState().api.standings[0].standings.seasonDisplayName
        );
        setTeamsState(teamsData);
        const conferenceData = teamsData.map(({ abbreviation, name }) => ({
          abbreviation,
          name,
        }));
        setConferences(conferenceData);

        dispatch(getTeamsByLeague({ league: leagueData })).then((data) => {
          const teamsDivisionsData = store.getState().team.teams;
          setTeamsDivisions(teamsDivisionsData);
          setTeamsData(teamsData, teamsDivisionsData, "");

          let divisionsData = teamsDivisionsData.map((item) => ({
            division: item.division,
            conference: item.conference,
          }));

          divisionsData = [...new Set(divisionsData.map(JSON.stringify))]
            .map(JSON.parse)
            .sort();
          setDivisions(divisionsData);
        });

        dispatch(getCurrentWeekInfo({ sport: sport, league: leagueData })).then(
          (data) => {
            let weekData;
            let dayData;
            const seasonData = store.getState().api.season.type.toString();
            if (sport === "football") {
              weekData = store.getState().api.week.number.toString();
              setWeek({ week: weekData, season: seasonData });
            } else if (sport === "basketball") {
              dayData = store.getState().api.day.date;
              setDay({ day: dayData, season: seasonData });
            }
          }
        );
      }
    );
  };

  const setTeamsData = (teamsData, divisionsData, filterValue) => {
    let data = teamsData;
    data = data.map(({ standings }) => standings.entries).flat();

    if (filterValue) {
      data = data.sort(
        (a, b) =>
          b.stats.find((item) => item.type === filterValue).value -
          a.stats.find((item) => item.type === filterValue).value
      );
    }

    data = data.map((item) => ({
      ...item,
      division: divisionsData.find(
        (i) => i.abbreviation === item.team.abbreviation
      ),
    }));
    console.log(data);
    setTeams(data);
  };

  const handleFilterClick = (e) => {
    const filterValue = e.target.name;
    console.log(filterValue);
    setFilter(filterValue);
    setTeamsData(teamsState, teamsDivisions, filterValue);
  };

  const handleMakePicksClick = (e) => {
    dispatch(getAllPicks()).then((data) => {
      dispatch(
        filterUserPicks({
          picks: data.payload,
          userId: currentUser._id,
        })
      );
    });
    setShowModal(true);
  };

  const handleDropdownClick = (e) => {
    dispatch(getAllPicks()).then(setShowTable(true));
  };

  return (
    <>
      <BootstrapModal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <BootstrapModal.Header closeButton></BootstrapModal.Header>
        <BootstrapModal.Body>
          <PicksModal
            sport={sport}
            league={league}
            week={week}
            day={day}
            closeModal={closeModal}
          />
        </BootstrapModal.Body>
      </BootstrapModal>
      <BootstrapModal
        // fullscreen={true}
        size="lg"
        show={showTable}
        onHide={() => setShowTable(false)}
      >
        <BootstrapModal.Header closeButton></BootstrapModal.Header>
        <BootstrapModal.Body>
          <StandingsModal
            sport={sport}
            league={league}
            week={week}
            day={day}
            closeModal={closeModal}
          />
        </BootstrapModal.Body>
      </BootstrapModal>
      <Container className="tab-container left">
        <div
          style={{
            width: "100px",
            display: "inline-block",
            alignItems: "center",
          }}
        >
          <img
            // id="sports-img"
            className="sport-img"
            src={require(`../../assets/images/sport-${sport}.png`)}
            alt=""
          ></img>
        </div>
        <p
          className="tabs-title magenta-text bold"
          style={{ display: "inline-block" }}
        >
          Leagues:
        </p>
        <div className="league-div">
          {leagues
            ? leagues.leagues.map((league, index) => (
                <Button
                  className={classNames(
                    "mx-2 transparent-btn league-btn",
                    active === league ? "active" : "inactive "
                  )}
                  key={index}
                  name={league}
                  onClick={handleLeagueClick}
                >
                  {league}
                </Button>
              ))
            : ""}
        </div>
        <div>
          <Dropdown
            className={classNames(
              "picks-dropdown",
              !logInSelector || !league || sport !== "football" ? "hide" : ""
            )}
            sport={sport}
            league={league}
            style={{ display: "inline-block", marginRight: "15px" }}
          >
            <Dropdown.Toggle className="magenta">
              View Picks & Standings
            </Dropdown.Toggle>
            <Dropdown.Menu onClick={handleDropdownClick}>
              <Dropdown.Item name="all">All Picks</Dropdown.Item>
              {/* <Dropdown.Item name="week">This Week's Picks</Dropdown.Item>
              <Dropdown.Item name="myPicks">My Picks</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            className={classNames(
              "primary-btn my-2",
              !logInSelector || !league || sport !== "football" ? "hide" : ""
            )}
            onClick={handleMakePicksClick}
          >
            Make Game Picks
          </Button>
          <p
            className={classNames(
              !logInSelector && league ? "" : "hide",
              sport !== "football" ? "hide" : ""
            )}
            style={{ display: "inline-block" }}
          >
            <i
              className="bi bi-exclamation-diamond"
              style={{ fontSize: "24px" }}
            ></i>{" "}
            <span className="light-grey-text">Login to Make / View Picks</span>
          </p>
          <p
            className={classNames(
              "yellow-text tab-heading",
              active === "" ? "hide" : ""
            )}
          >
            <strong>{active}</strong> Standings {season}
          </p>
        </div>
        <Table id="standingsBySportTable" className="sport-table no-margin rounded center">
          <tbody>
            {conferences.map(({ abbreviation, name }, index) => (
              <React.Fragment key={index}>
                <tr key={index} className="conf-headers">
                  <td colSpan={12}>
                    <Button
                      id={"toggleBtn" + index}
                      className="accordion-button collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target={"#collapse-div" + index}
                    >
                      <p className="turquoise-text table-subheader">
                        <span style={{ fontSize: "70%" }}>
                          <i className="plus-minus-toggle"></i>
                        </span>{" "}
                        <span style={{ marginLeft: "20px" }}>{name} </span>
                        <span className="pink-text">({abbreviation})</span>
                      </p>
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan={12}>
                    <div id={"collapse-div" + index} className="collapse">
                      <Table className="no-margin">
                        <tbody>
                          {divisions
                            .filter(
                              (division) => abbreviation === division.conference
                            )
                            .map((division) => division.division)
                            .map((division) => (
                              <React.Fragment key={division}>
                                <tr key={division} className="column-header">
                                  <td className="col1">
                                    <p
                                      style={{
                                        textTransform: "uppercase",
                                        fontSize: "20px",
                                      }}
                                    >
                                      <strong>{division}</strong>
                                    </p>
                                  </td>
                                  <td>
                                    <Button
                                      className={classNames(
                                        "filter-btn",
                                        filter === "wins" ? "filtered" : " "
                                      )}
                                      onClick={handleFilterClick}
                                      name="wins"
                                      direction=""
                                    >
                                      W
                                    </Button>
                                  </td>
                                  <td>
                                    <Button
                                      className={classNames(
                                        "filter-btn",
                                        filter === "losses" ? "filtered" : " "
                                      )}
                                      onClick={handleFilterClick}
                                      name="losses"
                                    >
                                      L
                                    </Button>
                                  </td>
                                  {sport === "hockey" ? (
                                    <td>
                                      <p>DIV</p>
                                    </td>
                                  ) : (
                                    <td>
                                      <Button
                                        className={classNames(
                                          "filter-btn",
                                          filter === "winpercent"
                                            ? "filtered"
                                            : " "
                                        )}
                                        onClick={handleFilterClick}
                                        name="winpercent"
                                      >
                                        PCT
                                      </Button>
                                    </td>
                                  )}

                                  <td>
                                    <p>HOME</p>
                                  </td>
                                  <td>
                                    <p>ROAD</p>
                                  </td>
                                  <td>
                                    {sport === "basketball" ||
                                    sport === "football" ? (
                                      <p>DIV</p>
                                    ) : sport === "baseball" ? (
                                      <Button
                                        className={classNames(
                                          "filter-btn",
                                          filter === "pointsfor"
                                            ? "filtered"
                                            : " "
                                        )}
                                        onClick={handleFilterClick}
                                        name="pointsfor"
                                      >
                                        RS
                                      </Button>
                                    ) : sport === "hockey" ? (
                                      <Button
                                        className={classNames(
                                          "filter-btn",
                                          filter === "pointsfor"
                                            ? "filtered"
                                            : " "
                                        )}
                                        onClick={handleFilterClick}
                                        name="pointsfor"
                                      >
                                        GS
                                      </Button>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                  <td>
                                    {sport === "basketball" ||
                                    sport === "football" ? (
                                      <p>CONF</p>
                                    ) : sport === "baseball" ? (
                                      <Button
                                        className={classNames(
                                          "filter-btn",
                                          filter === "pointsagainst"
                                            ? "filtered"
                                            : " "
                                        )}
                                        onClick={handleFilterClick}
                                        name="pointsagainst"
                                      >
                                        RA
                                      </Button>
                                    ) : sport === "hockey" ? (
                                      <Button
                                        className={classNames(
                                          "filter-btn",
                                          filter === "pointsagainst"
                                            ? "filtered"
                                            : " "
                                        )}
                                        onClick={handleFilterClick}
                                        name="pointsagainst"
                                      >
                                        GA
                                      </Button>
                                    ) : (
                                      ""
                                    )}
                                  </td>
                                  {sport === "baseball" ||
                                  sport === "hockey" ? (
                                    <>
                                      <td>
                                        <Button
                                          className={classNames(
                                            "filter-btn",
                                            filter === "pointdifferential"
                                              ? "filtered"
                                              : " "
                                          )}
                                          onClick={handleFilterClick}
                                          name="pointdifferential"
                                        >
                                          DIFF
                                        </Button>
                                      </td>
                                      <td>
                                        <Button
                                          className={classNames(
                                            "filter-btn",
                                            filter === "streak"
                                              ? "filtered"
                                              : " "
                                          )}
                                          onClick={handleFilterClick}
                                          name="streak"
                                        >
                                          STREAK
                                        </Button>
                                      </td>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                                {teams
                                  .filter(
                                    (item) =>
                                      item.division.division === division
                                  )
                                  .map((team, index) => (
                                    <tr key={index} className="team-row">
                                      <td

                                        className="col1 logo-column left"
                                      >
                                        {team.team.logos ? (
                                          <img
                                            className="logo"
                                            src={team.team.logos[0].href}
                                            alt=""
                                            style={{ display: "inline-block" }}
                                          />
                                        ) : (
                                          <img
                                            className="logo"
                                            src={
                                              require("../../assets/icons/not-found.svg")
                                                .default
                                            }
                                            alt=""
                                            style={{ display: "inline-block" }}
                                          />
                                        )}

                                        <p style={{ display: "inline-block" }}>
                                          {team.team.displayName}
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {
                                            team.stats.find(
                                              (team) => team.type === "wins"
                                            ).value
                                          }
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {
                                            team.stats.find(
                                              (team) => team.type === "losses"
                                            ).displayValue
                                          }
                                        </p>
                                      </td>
                                      {sport === "hockey" ? (
                                        <td>
                                          <p>
                                            {
                                              team.stats.find(
                                                (team) => team.type === "vsdiv"
                                              ).displayValue
                                            }
                                          </p>
                                        </td>
                                      ) : (
                                        <td>
                                          <p>
                                            {
                                              team.stats.find(
                                                (team) =>
                                                  team.type === "winpercent"
                                              ).displayValue
                                            }
                                          </p>
                                        </td>
                                      )}

                                      <td>
                                        <p>
                                          {
                                            team.stats.find(
                                              (team) => team.type === "home"
                                            ).displayValue
                                          }
                                        </p>
                                      </td>
                                      <td>
                                        <p>
                                          {
                                            team.stats.find(
                                              (team) => team.type === "road"
                                            ).displayValue
                                          }
                                        </p>
                                      </td>

                                      {sport === "basketball" ||
                                      sport === "football" ? (
                                        <>
                                          <td>
                                            <p>
                                              {
                                                team.stats.find(
                                                  (team) =>
                                                    team.type === "vsdiv"
                                                ).displayValue
                                              }
                                            </p>
                                          </td>
                                          <td>
                                            <p>
                                              {
                                                team.stats.find(
                                                  (team) =>
                                                    team.type === "vsconf"
                                                ).displayValue
                                              }
                                            </p>
                                          </td>
                                        </>
                                      ) : (
                                        ""
                                      )}

                                      {sport === "baseball" ||
                                      sport === "hockey" ? (
                                        <>
                                          <td>
                                            <p>
                                              {
                                                team.stats.find(
                                                  (team) =>
                                                    team.type === "pointsfor"
                                                ).displayValue
                                              }
                                            </p>
                                          </td>
                                          <td>
                                            <p>
                                              {
                                                team.stats.find(
                                                  (team) =>
                                                    team.type ===
                                                    "pointsagainst"
                                                ).displayValue
                                              }
                                            </p>
                                          </td>
                                          <td>
                                            <p>
                                              {
                                                team.stats.find(
                                                  (team) =>
                                                    team.type ===
                                                    "pointdifferential"
                                                ).displayValue
                                              }
                                            </p>
                                          </td>
                                          <td>
                                            <p>
                                              {
                                                team.stats.find(
                                                  (team) =>
                                                    team.type === "streak"
                                                ).displayValue
                                              }
                                            </p>
                                          </td>
                                        </>
                                      ) : (
                                        ""
                                      )}
                                    </tr>
                                  ))}
                              </React.Fragment>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Tab;
