import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./AuctionCard.module.scss";

function AuctionCard({ auction }) {
  const navigate = useNavigate();

  const wasSold = () => {
    if (
      new Date(auction.date_expires).getTime() - new Date().getTime() > 0 &&
      auction.bids.length > 0
    ) {
      return true;
    }
    return false;
  };

  console.log(auction);
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
        {new Date(auction.date_expires).getTime() - new Date().getTime() > 0 ? (
          <>
            Current price:{" "}
            <strong>
              {bids.length === 0 ? initial_price : bids[bids.length - 1].price}{" "}
              $
            </strong>
          </>
        ) : (
          <>
            {wasSold() ? (
              <div>This item was sold</div>
            ) : (
              <div>This auction expired and received no bids.</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

AuctionCard.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default AuctionCard;
