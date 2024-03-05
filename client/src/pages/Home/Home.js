import { forwardRef, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { getAllPicks } from "../../redux/features/pickSlice";
import {
  getCurrentWeekInfo,
  getStandingsInfo,
} from "../../redux/features/apiSlice";

import { onClickHeaderItem } from "../../utils/HelperFunctions";

import "./Home.css";
import Nav from "../../components/Nav/Nav";
import Tabs from "../../components/Tabs/Tabs";
import SportAnimation from "../../components/SportAnimation/SportAnimation";
import TopEvents from "../../components/TopEvents/TopEvents";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import UserForm from "../../components/UserForm/UserForm";
import Footer from "../../components/Footer/Footer";
import {
  pulseInfinite,
  fadeIn,
  ballAnimation,
  signupAnimation,
} from "../../components/Animate";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  const dispatch = useDispatch();
  let pulseText = useRef(null);

  const tabsRef = useRef();
  const userFormRef = useRef();

  useEffect(() => {
    ballAnimation();
    pulseInfinite(pulseText);
    fadeIn(document.querySelectorAll(".fade"), 2);
    dispatch(getAllPicks());
    signupAnimation();
  }, []);

  return (
    <>
      <Nav ref={userFormRef} />
      <div
        className="full-height"
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "-75px",
          flexDirection: "column",
        }}
      >
        <Jumbotron />

        <div className="bottom-div fade" style={{ color: "#CCCCCC" }}>
          <p style={{ marginBottom: 0 }}>MAKE YOUR PICKS</p>
          <Button
            className="transparent-btn"
            // onClick={() => onClickHeaderItem(tabsRef)}
          >
            <p
              ref={(el) => (pulseText = el)}
              className={pulseText}
              style={{ marginTop: 0, fontWeight: "bold" }}
            >
              ↓
            </p>
          </Button>
        </div>
      </div>
      <div
        id="signUpDiv"
        className="form-div full-height light-grey"
        ref={userFormRef}
      >
        {/* <div className="form-container"> */}
        <Row className="no-margin h-100 align-items-center">
          <Col sm={7}>
            <p id="gameHeader" style={{ fontSize: "50px", marginBottom: "0" }}>
              Get In The Game!
            </p>
            <p style={{ marginTop: "0", color: "#0F292F" }}>
              <span className="magenta-text bold">Login</span> to your account
              or <span className="magenta-text bold">Sign up</span> for an
              account now to start making picks for all of your fave sports
              events!
            </p>
            <img
              id="sportsImg"
              src={require("../../assets/images/male-runner.png")}
              alt=""
            ></img>
          </Col>
          <Col sm={5}>
            <div className="userform-div ">
              <UserForm type="login" ref={tabsRef} />
            </div>
          </Col>
        </Row>
        {/* </div> */}
      </div>
      <div className="main-div" ref={tabsRef}>
        <TopEvents ref={userFormRef} />
        <div id="tabs">
          <Tabs />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
