import { forwardRef, useState } from "react";
import "./TopEvents.css";

import Nav from "../Nav/Nav";
import Button from "react-bootstrap/Button";
import { classNames } from "../../utils/HelperFunctions";

const TopEvents = forwardRef(function (props, ref) {
  const [helpToggle, setHelpToggle] = useState(false);

  const toggleHelp = () => {
    setHelpToggle(!helpToggle);
  };

  return (
    <>
      {/* <Nav ref={ref} /> */}
      <div className="left" style={{ width: "90%", margin: "0 auto" }}>
        <Button className="transparent-btn no-padding" onClick={toggleHelp}>
          <span style={{ fontSize: "30px" }}>
            <i className="bi bi-patch-question-fill"></i>
          </span>{" "}
          How To Play
        </Button>
      </div>

      <div
        className={classNames("events-div", !helpToggle ? "hide" : "")}
        style={{ color: "#A9B2AD" }}
      >
        <p>
          <span className="turquoise-text">
            <i className="bi bi-megaphone-fill"></i> Ready to make picks for
            upcoming games?
          </span>
        </p>
        <ol>
          <li>
            <span className="pink-text">Logged in?</span> Be sure to login to
            your account, or create a new account. This is required to make and
            view picks throughout the app.
          </li>
          <li>
            Click the <span className="pink-text ">Sport</span>{" "}
            <i className="bi bi-caret-right-fill yellow-text"></i>
            <span className="pink-text ">League</span> of the event below.
          </li>
          <li>
            Click <span className="pink-text ">Make Picks</span> /{" "}
            <span className="pink-text">View Picks</span> button.
          </li>
        </ol>
        <p className="turquoise-text">
          That's it! You're now in the game. Good Luck!{" "}
          <i className="bi bi-hand-thumbs-up-fill"></i>
        </p>
        <p>
          <small>
            <i>
              NOTE: NFL pick functionality has been built out. The other leagues are in
              development. In the meantime, view the latest standings for each
              sport <i className="bi bi-caret-right-fill"></i> league below.
            </i>
          </small>
        </p>
      </div>
    </>
  );
});

export default TopEvents;
