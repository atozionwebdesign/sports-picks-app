import { useEffect, useRef, useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import store from "../../redux/store";
import BootstrapNav from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";

import "./Nav.css";

import { classNames, onClickHeaderItem } from "../../utils/HelperFunctions";

import { logIn, logOut } from "../../redux/features/userSlice";

import UserForm from "../UserForm/UserForm";
import { loggedInSelector, userSelector } from "../../redux/selectors";

import { fadeIn } from "../Animate";

const Nav = forwardRef(function(props,ref){
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [formType, setFormType] = useState("");
  const logInSelector = useSelector(loggedInSelector);
  const logoutRef = useRef("");

  const uSelector = useSelector(userSelector);

  useEffect(() => {
    fadeIn(document.querySelectorAll(".fade"), 2);
  });

  const closeModal = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShow(false);
  };

  const handleClick = (e) => {
    e.preventDefault();

    const type = e.target.name;

    if (type === "logout") {
      dispatch(logOut());
      return;
    }
    setFormType(type);
    onClickHeaderItem(ref)
    // setShow(true);

  };

  return (
    <>
      <BootstrapModal size="lg" show={show} onHide={() => setShow(false)}>
        <BootstrapModal.Body>
          <UserForm type={formType} closeModal={closeModal} />
        </BootstrapModal.Body>
      </BootstrapModal>
      {/* <div style={{margin: "0 15px"}}> */}
      <BootstrapNav className="justify-content-between main-nav">
        <BootstrapNav.Brand href="/" className="fade">
          <p
            className="magenta-text"
            style={{
              fontWeight: "bold",
              fontFamily: "Six Caps, sans-serif",
              fontSize: "40px",
            }}
          >
            Who<span className="pink-text">U</span>Got
            <span className="pink-text">?</span>
          </p>
        </BootstrapNav.Brand>
        <BootstrapNav.Toggle />
        <BootstrapNav.Collapse className="justify-content-end">
          <div className={classNames("fade", logInSelector ? "hide" : "")}>
            <Button
              className="mx-2 secondary-btn"
              onClick={handleClick}
              name="login"
            >
              Login
            </Button>
            {/* <Button className="primary-btn" onClick={handleClick} name="signup">
              Signup
            </Button> */}
          </div>
          <div className={classNames(logInSelector === false ? "hide" : "")}>
            <Dropdown>
              <Dropdown.Toggle className="icon-dd">
                <Image
                  className="small-icon"
                  src={uSelector.profilePic}
                ></Image>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>My Picks</Dropdown.Item>
                <Dropdown.Item
                  ref={logoutRef}
                  onClick={handleClick}
                  name="logout"
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </BootstrapNav.Collapse>
      </BootstrapNav>
      {/* </div> */}
    </>
  );
});

export default Nav;
