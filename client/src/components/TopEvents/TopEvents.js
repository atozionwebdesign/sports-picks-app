import { forwardRef, useState } from "react";
import "./TopEvents.css";

import Nav from "../Nav/Nav";
import Button from "react-bootstrap/Button";
import { classNames } from "../../utils/HelperFunctions";

const TopEvents = forwardRef(function (props, ref) {
  const [helpToggle, setHelpToggle] = useState(true);

  const toggleHelp = () => {
    setHelpToggle(!helpToggle);
  };

  return (
    <>
      <Nav ref={ref} />
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
            <i className="bi bi-megaphone-fill"></i> Ready to make picks for an
            upcoming sports event?
          </span>
        </p>
        <ol>
          <li>
            <span className="pink-text">Logged in?</span> Be sure to login to
            your account, or create a new account. This is required to make and
            view picks throught the app.
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
      </div>
    </>
  );
});

export default TopEvents;
