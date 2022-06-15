import React from "react";
import PropTypes from "prop-types";

function Tab({ name }) {
  return <div>{name}</div>;
}

Tab.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Tab;
