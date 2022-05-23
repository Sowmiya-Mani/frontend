import React from "react";
import PropTypes from "prop-types";
import styles from "./Auction.module.scss";

function Auction({ auction }) {
  const { item_name, item_description, bids, initial_price } = auction;

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{item_name}</div>
      <div className={styles.details}>
        <div
          className={styles.photo}
          style={{
            backgroundImage:
              "url('https://image.shutterstock.com/image-photo/attractive-african-young-confident-businesswoman-260nw-1712082700.jpg')",
          }}
        ></div>

        <div className={styles.description}>
          <p>
            <strong>Description:</strong> {item_description}
          </p>
          <p>
            <strong>Number of bids:</strong> {bids.length}
          </p>
          <p>
            <strong>Time remaining:</strong> {bids.length}
          </p>
          <p>
            <strong>Current price:</strong>{" "}
            {bids.length === 0 ? initial_price : bids[bids.length - 1].price} $
          </p>

          <div className={styles["place-bid-wrapper"]}>
            <p>
              {" "}
              <strong> Place your own bid: </strong>
            </p>
            <input
              type="text"
              placeholder="Enter a larger bid than the current price"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

Auction.propTypes = {
  auction: PropTypes.object.isRequired,
};

export default Auction;
