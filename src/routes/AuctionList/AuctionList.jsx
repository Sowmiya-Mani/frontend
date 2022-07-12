import React, { useEffect, useState } from "react";
import auctionsService from "../../services/auctions";
import AuctionCard from "./AuctionCards/AuctionCard";
import { Button } from "react-bootstrap";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import AddAuctionModal from "./AddAuctionModal/AddAuctionModal";
import SortDropdown from "./SortDropdown";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import styles from "./AuctionList.module.scss";

function AuctionList({ search, searchResults }) {
  const PAGE_SIZE = 6;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [exhausted, setExhausted] = useState(false);
  const [showAddAuctionModal, setShowAddAuctionModal] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    console.log(searchResults);
    setAuctions(searchResults);
  }, [searchResults]);

  //   const [search, setSearch] = useState("");

  const resetErrorAndSuccess = () => {
    setError("");
    setSuccess("");
  };

  const getAuctions = () => {
    auctionsService
      .getActiveAuctions({
        search: search,
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      })
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.data.length === 0) {
          setExhausted(true);
        }
        if (page !== 1) {
          setAuctions([...auctions, ...res.data]);
        } else {
          setAuctions(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setAuctions([]);
      });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const closeModal = () => {
    setShowAddAuctionModal(false);
  };

  const toggleAddModal = () => {
    setShowAddAuctionModal((prev) => !prev);
  };

  const addNewAuction = (payload, setLoading, setImages) => {
    resetErrorAndSuccess();
    auctionsService
      .postAuction(payload)
      .then((res) => {
        console.log("This is the response:");
        console.log(res);
        if (res.error) {
          console.log(res);
          setError("Something went wrong");
          setLoading(false);
          // setError(res.error);
        } else {
          setSuccess("Successfully added an auction");
          setLoading(false);
          setImages([]);
          getAuctions();
        }
        closeModal();
      })
      .catch((err) => {
        console.log("There is an error");
        console.log(err.response.data.error);
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAuctions();
  }, [page]);

  return (
    <div className={styles["list-wrapper"]}>
      {error.length > 0 && <ErrorAlert message={error} setMessage={setError} />}
      {success.length > 0 && <SuccessAlert message={success} />}

      <AddAuctionModal
        closeHandler={closeModal}
        showModal={showAddAuctionModal}
        addAuctionHandler={addNewAuction}
        userId={jwtDecode(localStorage.getItem("token")).uid}
      />

      <div className={styles["button-group"]}>
        {isLoggedIn && (
          <Button
            variant="outline-primary"
            onClick={toggleAddModal}
            style={{ marginLeft: "7.5%" }}
          >
            <i
              className="bi bi-file-earmark-plus"
              style={{ marginRight: "10px" }}
            ></i>
            Start an auction
          </Button>
        )}
        <SortDropdown />
      </div>

      <div
        className={styles["grid-container"]}
        style={{
          gridTemplateColumns:
            auctions.length > 1
              ? "repeat(auto-fit, minmax(250px, 1fr))"
              : "repeat(auto-fit, minmax(250px, calc(85% / 3)))",
        }}
      >
        {auctions.length > 0 ? (
          auctions.map((auction, index) => (
            <AuctionCard key={index} auction={auction} />
          ))
        ) : (
          <div>No auctions found!</div>
        )}
      </div>

      {!exhausted ? (
        <div className={styles.button}>
          <Button onClick={loadMore} variant="outline-primary">
            <i className="bi bi-caret-down" style={{ marginRight: "5px" }}></i>
            Load more
          </Button>
        </div>
      ) : (
        <div className={styles.message}>Thats it for now</div>
      )}
    </div>
  );
}

AuctionList.propTypes = {
  search: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
};

export default AuctionList;
