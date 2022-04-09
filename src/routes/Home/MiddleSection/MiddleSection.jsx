import React from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as Waves } from "./../../../images/wave.svg";
import styles from "./MiddleSection.module.scss";

function MiddleSection() {
  return (
    <div className={styles.wrapper}>
      <Waves className={styles.waves} />
      <h1 className={styles.header}>How does it work?</h1>
      <p className={styles.paragraph}>
        Make an account by clicking signup button below. After that just look
        through the items that are currently listed for auction and place a bid
        if you find anything interesting.
      </p>
      <Button variant="primary">Sign up now</Button>
    </div>
  );
}

export default MiddleSection;
