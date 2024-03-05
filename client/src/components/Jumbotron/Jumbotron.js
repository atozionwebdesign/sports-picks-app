import { useEffect, useRef } from "react";
import "./Jumbotron.css";
import { leftTextIntro, rightTextIntro, fadeInIntro } from "../Animate";

const Jumbotron = () => {
  let leftText = useRef(null);
  let rightText = useRef(null);
  let titleText = useRef(null);

  useEffect(() => {
    leftTextIntro(leftText);
    rightTextIntro(rightText);
    fadeInIntro(titleText);
  }, []);

  return (
    <div className="jumbotron-div">
      <span className="title">
        <p ref={(el) => (leftText = el)} style={{ display: "inline-block" }}>
          Make your mark in the game with{" "}
        </p>
        <p
          className="magenta-text"
          style={{
            // fontWeight: "bold",
            fontSize: "175px",
            display: "inline-block",
            margin: "0 0 0 10px",
            lineHeight: "100%",
          }}
          ref={(el) => (titleText = el)}
        >
          <span>
            Who<span className="pink-text">U</span>Got
            <span className="pink-text">?</span>
          </span>

          <span className="underline"></span>
        </p>{" "}
        <p ref={(el) => (rightText = el)}>
          " predict <span className="yellow-text comma">,</span> play{" "}
          <span className="yellow-text comma">,</span> prevail! "
        </p>
      </span>
      <div id="ballWrap">
        <img
          id="ballImg"
          src={require("../../assets/images/soccer.png")}
          alt=""
        ></img>
      </div>
    </div>
  );
};
export default Jumbotron;
