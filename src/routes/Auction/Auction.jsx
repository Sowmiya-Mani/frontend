import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Spinner, Container } from "react-bootstrap";
import auctionsService from "./../../services/auctions";
import Button from "../../components/Button";
import usersService from "../../services/users";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import calculateRemainingTime from "../../utils/utils";
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

  const socket = io("http://localhost:3000");

  socket.on("postedBid", (arg) => {
    if (arg._id === id) {
      setData(arg);
    }
  });

  console.log(data);

  const validateBid = () => {
    console.log("Validating a bid");
    if (isNaN(bid)) {
      setError("The bid has to be a number.");
    } else if (data.bids.length === 0) {
      if (bid <= data.initial_price) {
        setError("You have to bid more than the initial price.");
        return false;
      }
    } else if (bid <= data.bids[data.bids.length - 1].price) {
      setError("You have to bid more than the current bid.");
      return false;
    } else {
      return true;
    }
  };

  const toggleImageModal = () => {
    setShowImageModal((prev) => !prev);
  };

  const onChange = (e) => {
    setBid(e.target.value);
  };

  const onClick = (e) => {
    console.log("Clicked on button");
    const validBid = validateBid();
    if (validBid) {
      e.preventDefault();
      bidsService
        .postNewBid({
          price: bid,
          auction_id: id,
        })
        .then((res) => {
          console.log(res.data);
          setSuccess("Successfully posted a bid.");
          setBid("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setIsLoggedIn(useIsLoggedIn());

    auctionsService
      .getAuctionById({ id })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  console.log(error);

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
      <Container className={`${styles["layout-container"]} m-0`}>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <ImageModal
              show={showImageModal}
              handleClose={toggleImageModal}
              pictures={data.pictures}
            />
            <Row className="w-100 m-10">
              <Col
                className="justify-content-center d-flex flex-column align-items-center p-0"
                xs={12}
                sm={5}
              >
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
                <div>Click to see all photos</div>
              </Col>
              <Col xs={12} sm={5}>
                <div className={styles.info}>
                  <div className={styles.title}>{data.item_name}</div>
                  <div className={styles["price-container"]}>
                    <div className={styles.price}>
                      US ${" "}
                      {data.bids.length === 0
                        ? data.initial_price
                        : data.bids[data.bids.length - 1].price}
                    </div>
                  </div>
                  {isLoggedIn && (
                    <div className={styles["place-bid-wrapper"]}>
                      Place your own bid: <br />
                      <input
                        onChange={onChange}
                        type="text"
                        value={bid}
                        name="bid"
                        placeholder="Enter a larger bid than the current price"
                      />
                      <Button value="Place bid" onClick={onClick} />
                    </div>
                  )}
                  <div>
                    Time remaining:{" "}
                    {timeRemaining.startsWith("-")
                      ? `EXPIRED on ${data.date_ends.substring(0, 10)}`
                      : timeRemaining}
                  </div>
                </div>
              </Col>
              <Col xs={12} sm={2}>
                {loadingUserData ? (
                  <Spinner animation="border" variant="primary" />
                ) : (
                  <div>
                    Seller information: <br />
                    <div className={styles["seller-info-container"]}>
                      <div
                        className={styles["seller-profile-picture"]}
                        style={{
                          backgroundImage: `url('${userData.profile_picture}')`,
                        }}
                      ></div>
                      <div
                        className={styles.seller}
                        onClick={() => navigate("/users/" + userData._id)}
                      >
                        {userData.username}{" "}
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <Row className="w-100">
              <Col xs={12} sm={10}>
                <div className={styles.description}>
                  Description: <br />
                  {data.item_description}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}

export default Auction;
