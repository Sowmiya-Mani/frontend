import React, { useEffect, useState } from "react";
import auctionsService from "../../services/auctions";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Auction from "./Auction/Auction";
import { Button } from "react-bootstrap";
import styles from "./AuctionList.module.scss";

function AuctionList() {
  const PAGE_SIZE = 10;
  const [auctions, setAuctions] = useState([]);
  const [page, setPage] = useState(1);
  const [exhausted, setExhausted] = useState(false);

  //   const [search, setSearch] = useState("");

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    auctionsService
      .getAuctions({
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
      <NavigationBar />
      {auctions.length > 0 ? (
        auctions.map((auction, index) => (
          <Auction key={index} auction={auction} />
        ))
      ) : (
        <div>No auctions found!</div>
      )}

      {!exhausted ? (
        <div className={styles.button}>
          <Button onClick={loadMore} variant="primary">
            Load more
          </Button>
        </div>
      ) : (
        <div>Thats it for now</div>
      )}
    </div>
  );
}

export default AuctionList;
