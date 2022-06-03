import React, { useEffect, useState } from "react";
import auctionsService from "../../services/auctions";
import Auction from "./Auction/Auction";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import Button from "../../components/Button";
import AddAuctionModal from "./AddAuctionModal/AddAuctionModal";
import styles from "./AuctionList.module.scss";

function AuctionList() {
  const PAGE_SIZE = 10;
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [exhausted, setExhausted] = useState(false);
  const [showAddAuctionModal, setShowAddAuctionModal] = useState(false);
  const isLoggedIn = useIsLoggedIn();

  //   const [search, setSearch] = useState("");

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const closeModal = () => {
    setShowAddAuctionModal(false);
  };

  const toggleAddModal = () => {
    setShowAddAuctionModal((prev) => !prev);
  };

  const addNewAuction = (payload) => {
    auctionsService
      .postAuction(payload)
      .then((res) => {
        console.log(res);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    auctionsService
      .getActiveAuctions({
        search: "",
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
      })
      .then((res) => {
        if (res.data.length === 0) {
          setExhausted(true);
        }
        setAuctions([...auctions, ...res.data]);
      })
      .catch((err) => {
        console.log(err);
        setAuctions([]);
      });
  }, [page]);

  return (
    <div className={styles["list-wrapper"]}>
      <AddAuctionModal
        closeHandler={closeModal}
        showModal={showAddAuctionModal}
        addAuctionHandler={addNewAuction}
      />
      {isLoggedIn && (
        <div className={styles["start-auction-btn"]}>
          <Button value="Start an auction" onClick={toggleAddModal} />
        </div>
      )}

      {auctions.length > 0 ? (
        auctions.map((auction, index) => (
          <Auction key={index} auction={auction} />
        ))
      ) : (
        <div>No auctions found!</div>
      )}

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
