import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import auctionsService from "./../../services/auctions";
import Button from "../../components/Button";
import usersService from "../../services/users";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import calculateRemainingTime from "../../utils/utils";
import styles from "./Auction.module.scss";
import ImageModal from "./ImageModal";

function Auction() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const [userData, setUserData] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [loadingUserData, setLoadingUserData] = useState(true);

  // const validateBid = () => {

  // }

  const toggleImageModal = () => {
    setShowImageModal((prev) => !prev);
  };

  const onChange = (e) => {
    console.log(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    console.log("Clicked on the button");
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

  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemainingTime(data.date_ends, setTimeRemaining);
    }, 1000);

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
                    "url('https://firebasestorage.googleapis.com/v0/b/auction-20760.appspot.com/o/images%2F2022_05_28_Klika_Muzej%20(6).jpg?alt=media&token=b890d5ff-cfed-4981-bd21-91e8e1cdf4c5')",
                }}
              ></div>
              <div>Click to see all photos</div>
            </Col>
            <Col xs={12} sm={5}>
              <div className={styles.info}>
                <div className={styles.title}>{data.item_name}</div>
                <div className={styles["price-container"]}>
                  Current price:
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
                      name="bid"
                      placeholder="Enter a larger bid than the current price"
                    />
                    <Button value="Place bid" onClick={onClick} />
                  </div>
                )}
                <div>Time remaining: {timeRemaining}</div>
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
  );
}

export default Auction;
