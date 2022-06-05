import React from "react";
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

      <button className={styles.button} onClick={onClick}>
        Show now
      </button>
    </div>
  );
}

export default Header;
