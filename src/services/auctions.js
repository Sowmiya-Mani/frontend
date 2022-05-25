import Api from "./api";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default {
  getAuctions(payload) {
    return Api.get(`${baseURL}/auctions`, payload).then((json) => json);
  },
  getActiveAuctions(payload) {
    return Api.get(`${baseURL}/active-auctions`, payload).then((json) => json);
  },
  postAuction(payload) {
    return Api.post(`${baseURL}/auctions`, payload).then((json) => json);
  },
};
