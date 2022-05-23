import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import styles from "./NavigationBar.module.scss";

function NavigationBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar className={styles.navbar}>
        <Container className={styles["navbar-container"]}>
          <Navbar.Brand onClick={() => navigate("/")}>
            Auction System
          </Navbar.Brand>
          <Nav>
            {isLoggedIn ? (
              <Nav.Link onClick={logout}>Log out</Nav.Link>
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
