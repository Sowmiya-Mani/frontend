import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

import styles from "./NavigationBar.module.scss";

function NavigationBar() {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar className={styles.navbar}>
        <Container className={styles["navbar-container"]}>
          <Navbar.Brand onClick={() => navigate("/")}>
            Auction System
          </Navbar.Brand>
          <Nav>
            <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            <Nav.Link onClick={() => navigate("/register")}>Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
