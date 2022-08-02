import React from "react";
import PropTypes from "prop-types";
import auctionsService from "../../services/auctions";
import { Button, FormControl, InputGroup } from "react-bootstrap";

function Search({
  search,
  setSearch,
  setSearching,
  setSearchResults,
  sort,
  direction,
  setPage,
  setExhausted,
}) {
  const PAGE_SIZE = 6;

  const onChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    setSearching(true);
    auctionsService
      .getActiveAuctions({
        search: search,
        skip: 0,
        limit: PAGE_SIZE,
        sort: sort,
        direction: direction,
      })
      .then((res) => {
        console.log(res.data);
        setSearchResults(res.data);
        setSearching(false);
        setPage(1);
        setExhausted(false);
      })
      .catch((err) => {
        console.log(err);
        setSearching(false);
        setPage(1);
        setExhausted(false);
      });
  };

  return (
    <>
      <InputGroup style={{ marginRight: "10px" }}>
        <FormControl
          value={search}
          onChange={onChange}
          placeholder="Search auctions"
          aria-label="Auction name"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-primary" id="button-addon2" onClick={onClick}>
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </>
  );
}

Search.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setSearching: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired,
  setExhausted: PropTypes.func.isRequired,
};

export default Search;
