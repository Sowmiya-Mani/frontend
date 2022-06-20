import React from "react";
import PropTypes from "prop-types";
import { Button, FormControl, InputGroup } from "react-bootstrap";

function Search({ onChange }) {
  return (
    <>
      <InputGroup style={{ marginRight: "10px" }}>
        <FormControl
          onChange={onChange}
          placeholder="Search auctions"
          aria-label="Auction name"
          aria-describedby="basic-addon2"
        />
        <Button variant="outline-primary" id="button-addon2">
          <i className="bi bi-search"></i>
        </Button>
      </InputGroup>
    </>
  );
}

Search.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Search;
