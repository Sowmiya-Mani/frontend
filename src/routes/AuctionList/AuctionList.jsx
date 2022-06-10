import React, { useEffect, useState } from "react";
import auctionsService from "../../services/auctions";
import AuctionCard from "./AuctionCards/AuctionCard";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import Button from "../../components/Button";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import AddAuctionModal from "./AddAuctionModal/AddAuctionModal";
import jwtDecode from "jwt-decode";
import styles from "./AuctionList.module.scss";

function AuctionList() {
  const PAGE_SIZE = 6;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [exhausted, setExhausted] = useState(false);
  const [showAddAuctionModal, setShowAddAuctionModal] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  //   const [search, setSearch] = useState("");

  const resetErrorAndSuccess = () => {
    setError("");
    setSuccess("");
  };

  const getAuctions = () => {
    auctionsService
      .getActiveAuctions({
        search: "",
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

  const addNewAuction = (payload, setLoading) => {
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
          getAuctions();
        }
        closeModal();
      })
      .catch((err) => {
        console.log("There is an error");
        console.log(err.response.data.error);
        setError(err.response.data.error);
        setLoading(false);
        // setError(err.error);
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
      {isLoggedIn && (
        <div className={styles["start-auction-btn"]}>
          <Button value="Start an auction" onClick={toggleAddModal} />
        </div>
      )}

      <div className={styles["grid-container"]}>
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
          <Button onClick={loadMore} value="Load more..." />
        </div>
      ) : (
        <div className={styles.message}>Thats it for now</div>
      )}
    </div>
  );
}

export default AuctionList;
