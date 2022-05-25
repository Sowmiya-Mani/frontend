import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../../../components/Button";
import bidsService from "../../../services/bids";
import styles from "./Auction.module.scss";

function Auction({ auction }) {
  const [bid, setBid] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  console.log(auction);
  const { _id, item_name, item_description, bids, initial_price, date_ends } =
    auction;

  useEffect(() => {
    calculateRemainingTime();
  }, []);

  const calculateRemainingTime = () => {
    let timeLeft = new Date(date_ends).getTime() - new Date().getTime();

    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    setRemainingTime(
      days.toString() +
        " days, " +
        hours.toString() +
        " hours, " +
        minutes.toString() +
        " minutes, " +
        seconds.toString() +
        " seconds"
    );
  };

  setInterval(calculateRemainingTime, 1000);

  const onChange = (e) => {
    e.preventDefault();
    setBid(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    bidsService
      .postNewBid({
        price: bid,
        auction_id: _id,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <strong>Time remaining:</strong> {remainingTime}
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
              onChange={onChange}
              type="text"
              name="bid"
              placeholder="Enter a larger bid than the current price"
            />
            <Button value="Place bid" onClick={onClick} />
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
