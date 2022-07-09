import Api from "./api";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default {
  postNewBid(payload) {
    return Api.post(`${baseURL}/bids`, payload).then((json) => json);
  },

  getBidById(id) {
    return Api.get(`${baseURL}/bid/` + id).then((json) => json);
  },
};
