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
import useWindowDimensions from "../../hooks/useWindowDimensions";
import usersService from "../../services/users";
import PropTypes from "prop-types";
import Search from "../Search";
import styles from "./NavigationBar.module.scss";

function NavigationBar({ search, setSearch, setSearching, setSearchResults }) {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const { width } = useWindowDimensions();
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    setUserData({});
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/users/" + userData._id);
  };

  const getDropdownContent = () => {
    if (width > 500) {
      return userData.first_name + " " + userData.last_name;
    }
    return (
      userData.first_name.substring(0, 1) + userData.last_name.substring(0, 1)
    );
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
    <div className={styles.container}>
      <Navbar className={styles.navbar}>
        <Container className={styles["navbar-container"]}>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Ace.
            <div
              style={{
                display: "inline",
                fontWeight: "500",
                color: "var(--primary)",
              }}
            >
              io
            </div>
          </Navbar.Brand>
          <Nav className="d-flex justify-content-center align-items-center">
            {window.location.pathname === "/auctions" && (
              <Search
                search={search}
                setSearch={setSearch}
                setSearching={setSearching}
                setSearchResults={setSearchResults}
              />
            )}

            {isLoggedIn ? (
              <DropdownButton
                variant="outline-primary"
                align="end"
                id="dropdown-basic-button"
                title={`${isLoading ? "Loading..." : getDropdownContent()} `}
              >
                <Dropdown.Item
                  onClick={goToProfile}
                  className={styles["dropdown-item"]}
                >
                  <i className={`bi bi-person-circle ${styles.icon}`}></i>My
                  profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={logout}
                  className={styles["dropdown-item"]}
                >
                  <i className={`bi bi-box-arrow-right ${styles.icon}`}></i>
                  Logout
                </Dropdown.Item>
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

NavigationBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearching: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
};

export default NavigationBar;
