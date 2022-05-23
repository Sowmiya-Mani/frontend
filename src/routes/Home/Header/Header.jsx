import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/auctions");
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Where the world bids</h1>
      <p className={styles.paragraph}>
        Made for millions of people who enjoy shopping online and like to feel
        the rush of winning an auction.
      </p>

      <Button
        onClick={onClick}
        className={styles.button}
        variant="outline-light"
      >
        Shop now
      </Button>
    </div>
  );
}

export default Header;
