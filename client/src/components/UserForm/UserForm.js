import { useRef, useState, useEffect, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import store from "../../redux/store";
import {
  authenticateUser,
  createUser,
  logIn,
  logOut,
} from "../../redux/features/userSlice";

import {
  picksSelector,
  userPicksSelector,
  userSelector,
} from "../../redux/selectors";

import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Toast from "react-bootstrap/Toast";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import InputGroup from "react-bootstrap/InputGroup";
import { filterUserPicks } from "../../redux/features/pickSlice";

import { classNames, onClickHeaderItem } from "../../utils/HelperFunctions";

import "./UserForm.css";

const UserForm = forwardRef(function (props, ref) {
  // const closeModal = props.closeModal;

  const dispatch = useDispatch();

  const usernameRef = useRef("");
  const username2Ref = useRef("");
  const emailRef = useRef("");
  const phoneRef = useRef("");
  const profilePicRef = useRef("");
  const passwordRef = useRef("");
  const password2Ref = useRef("");
  const signupFormRef = useRef("");

  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const allPicks = useSelector(picksSelector);
  const userPicks = useSelector(userPicksSelector);
  const user = useSelector(userSelector);

  const iconFolder = require.context("../../assets/icons", false);
  const iconList = iconFolder.keys().map((icon) => iconFolder(icon));

  const [profileIcon, setProfileIcon] = useState();
  const [formType, setFormType] = useState(props.type);

  const [usernameControl, setUsernameControl] = useState();
  const [usernameControl2, setUsernameControl2] = useState();
  const [passwordControl, setPasswordControl] = useState();
  const [passwordControl2, setPasswordControl2] = useState();

  useEffect(() => {
    setUsernameControl(document.getElementById("usernameControl"));
    setPasswordControl(document.getElementById("passwordControl"));

    setUsernameControl2(document.getElementById("usernameControl2"));
    setPasswordControl2(document.getElementById("passwordControl2"));
  }, [formType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    /* Form Validation */
    if (!validateForm([usernameControl, passwordControl])) {
      return;
    }

    const name = usernameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const profilePic = profileIcon;
    const password = passwordRef.current.value;

    const user = {
      name: name,
      email: email,
      phone: phone,
      profilePic: profilePic,
      password: password,
    };

    dispatch(createUser({ user }));

    setValidated(true);
    setFormType("login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    /* Form Validation */
    if (!validateForm([usernameControl2, passwordControl2])) {
      return;
    }

    const name = username2Ref.current.value;
    const password = password2Ref.current.value;

    const user = {
      name: name,
      password: password,
    };

    dispatch(authenticateUser({ user })).then((res) => {
      if (res.error) {
        setShowToast(true);
      } else {
        dispatch(logIn());
        // Filter picks by logged in user
        const userId = res.payload._id;
        dispatch(filterUserPicks({ picks: allPicks, userId: userId }));
        setFormType("thanks");
      }
    });
  };

  const validateForm = (f) => {
    let valid = true;

    const fields = f;

    fields.map((field) => {
      if (field.value.length === 0) {
        field.classList.add("is-invalid");
        valid = false;
      } else {
        if (field.classList.contains("is-invalid")) {
          field.classList.remove("is-invalid");
        }
        field.classList.add("is-valid");
      }
    });

    return valid;
  };

  const handleIconClick = (e) => {
    setProfileIcon(e.target.src);
  };

  const changeFormType = (e) => {
    const fT = e.target.getAttribute("form");
    setFormType(fT);
    return;
  };

  const onInputChange = (e) => {
    const id = e.target.id;
    const input = document.getElementById(id);
    if (input.classList.contains("is-invalid")) {
      input.classList.remove("is-invalid");
    }
  };

  return (
    <Form
      noValidate
      // validated={validated}
      onSubmit={handleSubmit}
      ref={signupFormRef}
      id="userForm"
    >
      {formType === "signup" ? (
        <>
          <h2 id="userFormTitle" className="table-title">
            Signup
          </h2>
          <Form.Group className="mb-3">
            <FloatingLabel label="Username">
              <Form.Control
                required
                ref={usernameRef}
                type="text"
                placeholder="Username"
                name="username"
                id="usernameControl"
                onChange={onInputChange}
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="mb-3">
            <FloatingLabel label="Password">
              <Form.Control
                required
                ref={passwordRef}
                type="password"
                placeholder="Password"
                id="passwordControl"
                onChange={onInputChange}
              ></Form.Control>
            </FloatingLabel>
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 left">
            <Form.Label className="">Profile Picture</Form.Label>

            <Container className="icon-container">
              {iconList.map((icon, index) => (
                <Image
                  ref={profilePicRef}
                  className={classNames(
                    "icon m-2",
                    !profileIcon
                      ? ""
                      : profileIcon.includes(icon)
                      ? "active-icon"
                      : ""
                  )}
                  key={index}
                  src={icon}
                  alt={`image-${index}`}
                  onClick={handleIconClick}
                  name={icon.split("/").pop()}
                ></Image>
              ))}
            </Container>
          </Form.Group>
          <div>
            <Button className="primary-btn wide-btn" type="submit">
              Submit
            </Button>
            <p
              style={{
                color: "#122E39",
                margin: "5px 3px 5px 0",
                display: "inline-block",
              }}
            >
              Already have an account?{" "}
            </p>
            <a
              className="magenta-text bold"
              href="#!"
              onClick={changeFormType}
              form="login"
            >
              Login
            </a>
          </div>
        </>
      ) : formType === "login" ? (
        <>
          <h2 className="table-title">Login</h2>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              ref={username2Ref}
              type="text"
              id="usernameControl2"
              onChange={onInputChange}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              ref={password2Ref}
              type="password"
              id="passwordControl2"
              onChange={onInputChange}
            ></Form.Control>
          </Form.Group>
          <Toast show={showToast} onClose={toggleShowToast}>
            <Toast.Body>
              <i class="bi bi-exclamation-octagon-fill"></i> Invalid Login
              Information!
            </Toast.Body>
          </Toast>
          <div>
            <Button
              className="primary-btn wide-btn"
              onClick={handleLogin}
              type="submit"
            >
              Login
            </Button>
            <p
              style={{
                color: "#122E39",
                margin: "5px 3px 5px 0",
                display: "inline-block",
              }}
            >
              Don't have an account?{" "}
            </p>
            <a
              className="magenta-text bold"
              href="#!"
              onClick={changeFormType}
              form="signup"
            >
              Sign up
            </a>
          </div>
        </>
      ) : formType === "thanks" ? (
        <div style={{ border: "1px solid #CCCCCC" }}>
          <div className="turquoise">
            <p style={{ fontSize: "80px", color: "#CCCCCC" }}>
              <i className="bi bi-check-circle"></i>
            </p>
          </div>

          <p className="table-title">You're In!</p>

          <Button
            className="transparent-btn"
            onClick={() => onClickHeaderItem(ref)}
          >
            <p className="bold turquoise-text">Make picks now!</p>
          </Button>

          <p>
            <a
              className="turquoise-text bold"
              href="#!"
              onClick={changeFormType}
              form="signup"
            >
              Sign up
            </a>
          </p>
          <p>
            <a
              className="turquoise-text bold"
              href="#!"
              onClick={changeFormType}
              form="login"
            >
              Login
            </a>
          </p>
        </div>
      ) : (
        ""
      )}
    </Form>
  );
});

export default UserForm;
