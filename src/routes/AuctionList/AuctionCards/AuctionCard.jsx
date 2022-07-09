import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuctionCardTag from "./AuctionCardTag";
import styles from "./AuctionCard.module.scss";

function AuctionCard({ auction }) {
  const navigate = useNavigate();
  const { _id, item_name, bids, initial_price, pictures, date_ends } = auction;

  const wasSold = () => {
    if (
      new Date(date_ends).getTime() - new Date().getTime() < 0 &&
      bids.length > 0
    ) {
      return true;
    }
    return false;
  };

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
        {new Date(date_ends).getTime() - new Date().getTime() > 0 ? (
          <div className={styles.message}>
            <div>
              Current price:{" "}
              <strong>
                {bids.length === 0
                  ? initial_price
                  : bids[bids.length - 1].price}{" "}
                $
              </strong>
            </div>
            <AuctionCardTag name="active" />
          </div>
        ) : (
          <>
            {wasSold() ? (
              <div className={styles.message}>
                This item was sold for $ {bids[bids.length - 1].price}
                <AuctionCardTag name="sold" />
              </div>
            ) : (
              <div className={styles.message}>
                This auction expired and received no bids.
                <AuctionCardTag name="expired" />
              </div>
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
