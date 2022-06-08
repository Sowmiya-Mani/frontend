import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./AuctionCard.module.scss";

function AuctionCard({ auction }) {
  const navigate = useNavigate();
  const { _id, item_name, bids, initial_price, pictures } = auction;
  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{
          backgroundImage:
            pictures.length > 0 && `url("${pictures[0].img_url}")`,
        }}
      >
        {pictures.length === 0 && (
          <i className={`bi bi-image ${styles["image-icon"]}`}></i>
        )}
      </div>
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
