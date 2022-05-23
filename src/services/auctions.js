import Api from "./api";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default {
  getAuctions(payload) {
    return Api.get(`${baseURL}/auctions`, payload).then((json) => json);
  },
};
