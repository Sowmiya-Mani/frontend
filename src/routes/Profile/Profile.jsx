import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usersService from "../../services/users";
import ProfileNumber from "./ProfileNumber";
import EditProfileModal from "./EditProfileModal";
import EditProfileButton from "./EditProfileButton";
import { Spinner } from "react-bootstrap";
import "./../../App.css";
import { useLocation } from "react-router-dom";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import jwt_decode from "jwt-decode";
import AuctionCards from "./../AuctionList/AuctionCards";
import BidCard from "./BidCard";
import Tab from "./Tab";
import RateSellerButton from "./RateSellerButton";
import RateSellerModal from "./RateSellerModal";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import styles from "./Profile.module.scss";

function Profile() {
  const { id } = useParams();
  const [showRateUserModal, setShowRateUserModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingUserAuctions, setIsFetchingUserAuctions] = useState(true);
  const [isFetchingUserBids, setIsFetchingUserBids] = useState(true);
  const [isFetchingWonUserAuctions, setIsFetchingWonUserAuctions] =
    useState(true);
  const [isFetchingAverageRating, setIsFetchingAverageRating] = useState(true);
  const location = useLocation();

  const [data, setData] = useState({
    username: "",
    bio: "",
    profile_picture: "",
  });
  const [selectedTab, setSelectedTab] = useState(0);
  const [userWonAuctions, setUserWonAuctions] = useState([]);
  const [userAuctions, setUserAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [canLeaveRating, setCanLeaveRating] = useState("");
  const { width } = useWindowDimensions();

  const toggleModal = () => {
    setShowEditProfileModal((prev) => !prev);
  };

  const toggleRateUserModal = () => {
    setShowRateUserModal((prev) => !prev);
  };

  const getInitials = () => {
    return (
      data.first_name.substring(0, 1) + data.last_name.substring(0, 1)
    ).toUpperCase();
  };

  const postRating = (rating) => {
    if (rating > 0) {
      usersService
        .postRating(id, { rating: rating })
        .then(() => {
          setSuccessMessage("Successfully posted rating for this seller.");
          setShowRateUserModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("You have to select a rating.");
    }
  };

  useEffect(() => {
    if (useIsLoggedIn()) {
      setIsLoggedIn(true);

      const decoded_token = jwt_decode(localStorage.getItem("token"));
      if (decoded_token.uid === id) {
        setIsOwnProfile(true);
      } else {
        setIsOwnProfile(false);
      }
    }

    usersService
      .getUserById({ id })
      .then((res) => {
        setIsFetching(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err);
      });

    setIsFetchingUserAuctions(true);
    usersService
      .getUserAuctions(id)
      .then((res) => {
        console.log(res);
        setUserAuctions(res.data.auctions);
        setIsFetchingUserAuctions(false);
      })
      .catch((err) => console.log(err));

    setIsFetchingUserBids(true);
    usersService
      .getUserBids(id)
      .then((res) => {
        console.log(res);
        setUserBids(res.data.bids);
        setIsFetchingUserBids(false);
      })
      .catch(() => setIsFetchingUserBids(false));

    setIsFetchingWonUserAuctions(true);
    usersService
      .getUsersWonAuctions(id)
      .then((res) => {
        console.log("User's won auctions...");
        console.log(res);
        setUserWonAuctions(res.data.won_auctions);
        setIsFetchingWonUserAuctions(false);
      })
      .catch((err) => {
        setIsFetchingWonUserAuctions(false);
        console.log(err);
      });

    setIsFetchingAverageRating(true);
    usersService
      .getAverageRatingByUserId(id)
      .then((res) => {
        if (res.data.averageRating.length > 0) {
          setAvgRating(res.data.averageRating[0].avgRating);
        } else {
          setAvgRating(-1);
        }

        setIsFetchingAverageRating(false);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchingAverageRating(false);
      });

    usersService.canUserLeaveRating(id).then((res) => {
      console.log(res);
      setCanLeaveRating(res.data.canLeaveRating);
    });
  }, [location]);

  return (
    <div>
      {error.length > 0 && <ErrorAlert message={error} setMessage={setError} />}
      {successMessage.length > 0 && (
        <SuccessAlert message={successMessage} setMessage={setSuccessMessage} />
      )}
      <RateSellerModal
        showModal={showRateUserModal}
        closeHandler={toggleRateUserModal}
        postRating={postRating}
        sellerId={id}
      />
      <EditProfileModal
        userData={data}
        closeHandler={toggleModal}
        showModal={showEditProfileModal}
      />
      {isFetching ? (
        <div className={styles.spinner}>
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      ) : (
        <div className={styles["upper-div"]}>
          <div
            className={styles["profile-pic"]}
            style={{ backgroundImage: 'url("' + data.profile_picture + '")' }}
          >
            {data.profile_picture.length === 0 && (
              <div className={styles["initials"]}>{getInitials()}</div>
            )}
          </div>
          <div className={styles["user-info"]}>
            <div className={styles["first-row"]}>
              <div className={styles.username}>{data.username}</div>
              {isLoggedIn && isOwnProfile && (
                <div>
                  <EditProfileButton
                    onClickHandler={toggleModal}
                    screenWidth={width}
                  />
                </div>
              )}

              {!isOwnProfile && canLeaveRating && (
                <RateSellerButton
                  screenWidth={width}
                  onClickHandler={toggleRateUserModal}
                />
              )}
            </div>

            {width > 500 && (
              <div className={styles.numbers}>
                <ProfileNumber
                  onClick={() => setSelectedTab(0)}
                  category="auctions"
                  number={userAuctions.length}
                />
                <ProfileNumber
                  onClick={() => setSelectedTab(1)}
                  category="bids"
                  number={isFetchingUserBids ? 0 : userBids.length}
                />
                <ProfileNumber
                  onClick={() => setSelectedTab(2)}
                  category="wins"
                  number={
                    isFetchingWonUserAuctions ? 0 : userWonAuctions.length
                  }
                />
              </div>
            )}

            <div className={styles["name"]}>
              <strong>
                {data.first_name} {data.last_name}
              </strong>
            </div>
            <div className={styles.bio}>{data.bio}</div>
            {!isFetchingAverageRating && avgRating > 0 && (
              <div className={styles["avg-rating"]}>
                <strong>Average seller rating:</strong>{" "}
                {parseFloat(avgRating).toFixed(2)}/5
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles["tab-container"]}>
        <Tab
          name="Auctions"
          selected={selectedTab === 0}
          onClick={() => setSelectedTab(0)}
        />
        <Tab
          name="Bids"
          selected={selectedTab === 1}
          onClick={() => setSelectedTab(1)}
        />
        <Tab
          name="Won auctions"
          selected={selectedTab === 2}
          onClick={() => setSelectedTab(2)}
        />
      </div>

      <hr className={styles["horizontal-line"]} />

      {(isFetchingUserAuctions ||
        isFetchingUserBids ||
        isFetchingWonUserAuctions) && (
        <div className={styles["item-spinner"]}>
          <Spinner animation="border" role="status" variant="primary" />{" "}
        </div>
      )}

      <div className={styles["items-container"]}>
        {userAuctions.length > 0 &&
          selectedTab === 0 &&
          userAuctions.map((auction, idx) => (
            <AuctionCards auction={auction} key={idx} />
          ))}

        {userBids.length > 0 &&
          selectedTab === 1 &&
          userBids.map((bid, idx) => (
            <div key={idx}>
              <BidCard bid={bid} />
            </div>
          ))}

        {userWonAuctions.length > 0 &&
          selectedTab === 2 &&
          userWonAuctions.map((auction, idx) => (
            <AuctionCards auction={auction} key={idx} />
          ))}

        {selectedTab === 0 && userAuctions.length === 0 && (
          <div style={{ textAlign: "center" }}>
            This user has not listed any auctions yet
          </div>
        )}
        {selectedTab === 1 && userBids.length === 0 && (
          <div style={{ textAlign: "center" }}>
            This user has not made any bids yet.
          </div>
        )}
        {selectedTab === 2 && userWonAuctions.length === 0 && (
          <div style={{ textAlign: "center" }}>
            This user has not won an auction yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
