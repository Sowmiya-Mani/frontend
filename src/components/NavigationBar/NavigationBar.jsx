import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import jwt_decode from "jwt-decode";
import usersService from "../../services/users";
import styles from "./NavigationBar.module.scss";
import Search from "../Search";

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    setUserData({});
    localStorage.removeItem("token");
    window.location.reload();
  };

  const goToProfile = () => {
    navigate("/users/" + userData._id);
  };

  useEffect(() => {
    console.log(window.location);
    if (isLoggedIn) {
      const jwtData = jwt_decode(localStorage.getItem("token"));
      usersService
        .getUserById({ id: jwtData.uid })
        .then((res) => {
          setUserData(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar className={styles.navbar}>
        <Container className={styles["navbar-container"]}>
          <Navbar.Brand onClick={() => navigate("/")}>
            Auction System
          </Navbar.Brand>
          <Nav className="d-flex justify-content-center align-items-center">
            {window.location.pathname === "/auctions" && <Search />}

            {isLoggedIn ? (
              <DropdownButton
                id="dropdown-basic-button"
                title={`${
                  isLoading
                    ? "Loading..."
                    : userData.first_name + " " + userData.last_name
                } `}
              >
                <Dropdown.Item onClick={goToProfile}>My profile</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </DropdownButton>
            ) : (
              <>
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                <Nav.Link onClick={() => navigate("/register")}>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
