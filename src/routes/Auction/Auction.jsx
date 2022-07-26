import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import auctionsService from "./../../services/auctions";
import { Button } from "react-bootstrap";
import usersService from "../../services/users";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { calculateRemainingTime } from "../../utils/utils";
import ImageModal from "./ImageModal";
import bidsService from "../../services/bids";
import { io } from "socket.io-client";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import styles from "./Auction.module.scss";

function Auction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const [userData, setUserData] = useState({});
  const [timeRemaining, setTimeRemaining] = useState("");
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [bid, setBid] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [winner, setWinner] = useState("");

  const validateBid = () => {
    if (jwt_decode(localStorage.getItem("token")).uid === data.created_by) {
      setError("You cannot place a bid on your own auction!");
      return;
    } else if (isNaN(bid)) {
      setError("The bid has to be a number.");
      return;
    } else if (data.bids.length === 0) {
      if (bid <= data.initial_price) {
        setError("You have to bid more than the initial price.");
        return false;
      }
      return true;
    } else if (bid <= data.bids[data.bids.length - 1].price) {
      setError("You have to bid more than the current bid.");
      return false;
    }
    return true;
  };

  const getInitials = () => {
    return (
      userData.first_name.substring(0, 1) + userData.last_name.substring(0, 1)
    ).toUpperCase();
  };

  const toggleImageModal = () => {
    setShowImageModal((prev) => !prev);
  };

  const onChange = (e) => {
    setBid(e.target.value);
  };

  const onClick = (e) => {
    if (validateBid()) {
      e.preventDefault();
      bidsService
        .postNewBid({
          price: bid,
          auction_id: id,
        })
        .then(() => {
          setSuccess("Successfully posted a bid.");
          setBid("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (data?.expired) {
      console.log(data.won_by);
      usersService
        .getUserById({ id: data.won_by })
        .then((res) => {
          setWinner(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [data]);

  useEffect(() => {
    const socket = io("https://aceio.herokuapp.com");

    socket.on("postedBid", (arg) => {
      if (arg._id === id) {
        setData(arg);
      }
    });

    socket.on("auction expired", (winnerUsername) => {
      setSuccess("Auction just expired. The winner is " + winnerUsername);
    });

    socket.emit("open auction", id);

    setIsLoggedIn(useIsLoggedIn());

    auctionsService
      .getAuctionById({ id })
      .then((res) => {
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemainingTime(data.date_ends, setTimeRemaining);
    }, 100000);

    if (data && loadingUserData) {
      calculateRemainingTime(data.date_ends, setTimeRemaining);

      usersService
        .getUserById({ id: data.created_by })
        .then((res) => {
          setUserData(res.data.data);
          setLoadingUserData(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingUserData(false);
        });
    }

    return () => clearInterval(interval);
  }, [data]);

  return (
    <>
      {(error.length > 0 || success.length > 0) && (
        <div>
          {success.length > 0 && (
            <SuccessAlert message={success} setMessage={setSuccess} />
          )}
          {error.length > 0 && (
            <ErrorAlert message={error} setMessage={setError} />
          )}
        </div>
      )}
      <div className={`${styles["layout-container"]}`}>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <ImageModal
              show={showImageModal}
              handleClose={toggleImageModal}
              pictures={data.pictures}
            />
            <div>
              <div
                className={styles["image-container"]}
                onClick={toggleImageModal}
                style={{
                  backgroundImage:
                    data.pictures?.length > 0 &&
                    `url("${data.pictures[0].img_url}")`,
                }}
              >
                {data.pictures.length === 0 && (
                  <i className={`bi bi-image ${styles["image-icon"]}`}></i>
                )}
              </div>

              <div className={styles["all-photos-message"]}>
                Click to see all photos
              </div>
            </div>

            <div className={styles.info}>
              <h1 className={styles.title}>{data.item_name}</h1>
              <div className={styles["price-container"]}>
                <div className={styles.price}>
                  US ${" "}
                  {data.bids.length === 0
                    ? data.initial_price
                    : data.bids[data.bids.length - 1].price}
                </div>
              </div>
              {isLoggedIn && !timeRemaining.startsWith("-") && (
                <div className={styles["place-bid-wrapper"]}>
                  Place your own bid: <br />
                  <div className={styles["input-group"]}>
                    <input
                      onChange={onChange}
                      className={styles.input}
                      type="text"
                      value={bid}
                      name="bid"
                      placeholder="Enter a larger bid than the current price"
                    />
                    <Button
                      className={styles.button}
                      variant="outline-primary"
                      onClick={onClick}
                    >
                      Place bid
                    </Button>
                  </div>
                </div>
              )}
              <div>
                Time remaining:{" "}
                {timeRemaining.startsWith("-")
                  ? `EXPIRED on ${data.date_ends.substring(0, 10)}`
                  : timeRemaining}
              </div>
              {data.expired && (
                <div>
                  Winner:{" "}
                  <span
                    className={styles["winner-span"]}
                    onClick={() => navigate("/users/" + winner._id)}
                  >
                    {winner.username}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.description}>
              <h5>Description</h5>
              {data.item_description}
            </div>

            <div>
              {loadingUserData ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <div>
                  <h5 style={{ textAlign: "center" }}>Seller information</h5>
                  <div className={styles["seller-info-container"]}>
                    <div
                      className={styles["seller-profile-picture"]}
                      style={{
                        backgroundImage: `url('${userData.profile_picture}')`,
                      }}
                    >
                      {userData.profile_picture.length === 0 && (
                        <div className={styles["initials"]}>
                          {getInitials()}
                        </div>
                      )}
                    </div>
                    <div
                      className={styles.seller}
                      onClick={() => navigate("/users/" + userData._id)}
                    >
                      {userData.username}{" "}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Auction;
