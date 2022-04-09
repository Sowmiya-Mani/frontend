import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import styles from "./NavigationBar.module.scss";

function NavigationBar() {
  return (
    <div>
      <Navbar className={styles.navbar}>
        <Container className={styles["navbar-container"]}>
          <Navbar.Brand href="/">Auction System</Navbar.Brand>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavigationBar;
