import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./AuctionCard.module.scss";

function AuctionCard({ auction }) {
  const navigate = useNavigate();
  const { _id, item_name, bids, initial_price } = auction;
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage:
            "url('https://firebasestorage.googleapis.com/v0/b/auction-20760.appspot.com/o/images%2F2022_05_28_Klika_Muzej%20(6).jpg?alt=media&token=b890d5ff-cfed-4981-bd21-91e8e1cdf4c5')",
        }}
      ></div>
      <div
        onClick={() => {
          navigate("/auction/" + _id);
        }}
        className={styles.title}
      >
        {item_name}
      </div>
      <div className={styles["current-price"]}>
        Current price:{" "}
        <strong>
          {bids.length === 0 ? initial_price : bids[bids.length - 1].price} $
        </strong>
      </div>
    </div>
  );
}

AuctionCard.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default AuctionCard;
