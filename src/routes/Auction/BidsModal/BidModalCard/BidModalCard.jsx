import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { prettyDate } from "../../../../utils/utils";
import styles from "./BidModalCard.module.scss";

function BidModalCard({ bid }) {
  const navigate = useNavigate();
  return (
    <div className={styles.card}>
      <div className={styles["col1"]}>
        <div className={styles["created-by"]}>
          Created by:
          <span
            onClick={() => navigate("/users/" + bid.created_by)}
            className={styles["creator"]}
          >
            {bid.created_by}
          </span>
        </div>
        <div className={styles["date-created"]}>
          Date created: {prettyDate(bid.date_created)}
        </div>
      </div>
      <div className={styles.amount}>{bid.price}</div>
    </div>
  );
}

BidModalCard.propTypes = {
  bid: PropTypes.object.isRequired,
};

export default BidModalCard;
