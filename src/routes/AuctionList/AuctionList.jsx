import React, { useEffect, useState } from "react";
import auctionsService from "../../services/auctions";
import AuctionCard from "./AuctionCards/AuctionCard";
import { Button } from "react-bootstrap";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import SuccessAlert from "../../components/Alerts/SuccessAlert";
import AddAuctionModal from "./AddAuctionModal/AddAuctionModal";
import CategoryDropdown from "./CategoryDropdown";
import SortDropdown from "./SortDropdown";
import OptionsOffcanvas from "./OptionsOffcanvas";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import useDebounce from "../../hooks/useDebounce";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import styles from "./AuctionList.module.scss";

function AuctionList({
  search,
  searchResults,
  setSort,
  setDirection,
  sort,
  direction,
  category,
  setCategory,
  from,
  setFrom,
  to,
  setTo,
  page,
  setPage,
  exhausted,
  setExhausted,
}) {
  const PAGE_SIZE = 6;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [auctions, setAuctions] = useState([]);
  const [showAddAuctionModal, setShowAddAuctionModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const isLoggedIn = useIsLoggedIn();
  const { width } = useWindowDimensions();

  const debouncedFrom = useDebounce(from, 800);
  const debouncedTo = useDebounce(to, 800);

  useEffect(() => {
    setAuctions(searchResults);
  }, [searchResults]);

  const resetErrorAndSuccess = () => {
    setError("");
    setSuccess("");
  };

  const openOffcanvas = () => {
    setShowOffcanvas(true);
  };

  const getAuctions = () => {
    auctionsService
      .getActiveAuctions({
        search: search,
        skip: (page - 1) * PAGE_SIZE,
        limit: PAGE_SIZE,
        sort: sort,
        direction: direction,
        category: category,
        from: debouncedFrom,
        to: debouncedTo,
      })
      .then((res) => {
        if (res.error) {
          setError(res.error);
        } else if (res.data.length === 0) {
          if (page > 1) {
            setExhausted(true);
          } else {
            setError("No results found");
          }
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

  useEffect(() => {
    if (page === 1) {
      getAuctions();
    }
    setPage(1);
    setExhausted(false);
  }, [sort, direction, category, debouncedFrom, debouncedTo]);

  return (
    <div className={styles["list-wrapper"]}>
      {error.length > 0 && <ErrorAlert message={error} setMessage={setError} />}
      {success.length > 0 && (
        <SuccessAlert message={success} setMessage={setSuccess} />
      )}

      <OptionsOffcanvas
        show={showOffcanvas}
        setShow={setShowOffcanvas}
        setDirection={setDirection}
        setSort={setSort}
        direction={direction}
        setCategory={setCategory}
        category={category}
        sort={sort}
        from={from}
        setFrom={setFrom}
        to={to}
        setTo={setTo}
      />

      {isLoggedIn && (
        <AddAuctionModal
          closeHandler={closeModal}
          showModal={showAddAuctionModal}
          addAuctionHandler={addNewAuction}
          userId={jwtDecode(localStorage.getItem("token")).uid}
        />
      )}

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

        {width > 700 ? (
          <>
            <SortDropdown
              setDirection={setDirection}
              setSort={setSort}
              direction={direction}
              sort={sort}
            />
            <CategoryDropdown setCategory={setCategory} category={category} />
          </>
        ) : (
          <>
            <Button
              style={{ float: "right", marginRight: "7.5%" }}
              variant="outline-primary"
              onClick={openOffcanvas}
            >
              <i className="bi bi-sliders2" style={{ marginRight: "10px" }}></i>
              Options
            </Button>
          </>
        )}
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
        {auctions.length > 0 &&
          auctions.map((auction, index) => (
            <AuctionCard key={index} auction={auction} />
          ))}
      </div>

      {auctions.length === 0 && (
        <div className={styles["no-auctions-message"]}>No auctions found!</div>
      )}

      {!exhausted ? (
        <div className={styles.button}>
          <Button onClick={loadMore} variant="outline-primary">
            <i className="bi bi-caret-down" style={{ marginRight: "5px" }}></i>
            Load more
          </Button>
        </div>
      ) : (
        <div className={styles.message}>That&apos;s it for now</div>
      )}
    </div>
  );
}

AuctionList.propTypes = {
  search: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
  direction: PropTypes.string.isRequired,
  setDirection: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  from: PropTypes.number.isRequired,
  setFrom: PropTypes.func.isRequired,
  to: PropTypes.number.isRequired,
  setTo: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  exhausted: PropTypes.bool.isRequired,
  setExhausted: PropTypes.func.isRequired,
};

export default AuctionList;
