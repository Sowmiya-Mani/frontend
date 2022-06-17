function getIcon(name) {
  if (name === "Auctions") {
    return "bi bi-cash";
  } else if (name === "Bids") {
    return "bi bi-bag-heart";
  } else return "bi bi-bag-check-fill";
}

export default getIcon;
