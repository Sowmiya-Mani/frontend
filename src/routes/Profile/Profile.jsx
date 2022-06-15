import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import usersService from "../../services/users";
import ProfileNumber from "./ProfileNumber";
import EditProfileModal from "./EditProfileModal";
import { Spinner } from "react-bootstrap";
import "./../../App.css";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import jwt_decode from "jwt-decode";
import Tab from "./Tab";
import styles from "./Profile.module.scss";

function Profile() {
  const { id } = useParams();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [data, setData] = useState({
    username: "",
    bio: "",
    profile_picture: "",
  });

  const toggleModal = () => {
    setShowEditProfileModal((prev) => !prev);
  };

  useEffect(() => {
    if (useIsLoggedIn()) {
      setIsLoggedIn(true);

      const decoded_token = jwt_decode(localStorage.getItem("token"));
      console.log(decoded_token);
      if (decoded_token.uid === id) {
        setIsOwnProfile(true);
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
  }, []);

  console.log(data);

  return (
    <div>
      <EditProfileModal
        userData={data}
        closeHandler={toggleModal}
        showModal={showEditProfileModal}
      />
      {isFetching ? (
        <div className={styles.spinner}>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <div className={styles["upper-div"]}>
          <div
            className={styles["profile-pic"]}
            style={{ backgroundImage: 'url("' + data.profile_picture + '")' }}
          ></div>
          <div className={styles["user-info"]}>
            <div className={styles["first-row"]}>
              <div className={styles.username}>{data.username}</div>
              {isLoggedIn && isOwnProfile && (
                <div>
                  <Button onClick={toggleModal} value="Edit profile" />
                </div>
              )}
            </div>
            <div className={styles.numbers}>
              <ProfileNumber category="auctions" number={10} />
              <ProfileNumber category="bids" number={100} />
              <ProfileNumber category="wins" number={1000000} />
            </div>
            <div className={styles["name"]}>
              <strong>
                {data.first_name} {data.last_name}
              </strong>
            </div>
            <div className={styles.bio}>{data.bio}</div>
          </div>
        </div>
      )}

      <div className={styles["tab-container"]}>
        <Tab name="Amar" />
      </div>

      <hr className={styles["horizontal-line"]} />
    </div>
  );
}

export default Profile;
