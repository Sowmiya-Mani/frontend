import Api from "./api";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_API_BASE_URL;

export default {
  register(payload) {
    return Api.post(`${baseURL}/register`, payload).then((json) => json);
  },
  login(payload) {
    return Api.post(`${baseURL}/login`, payload).then((json) => json);
  },
  getUserById(payload) {
    return Api.get(`${baseURL}/users/` + payload.id).then((json) => json);
  },
  updateUser(id, payload) {
    return Api.put(`${baseURL}/users/` + id, payload).then((json) => json);
  },
  getUserAuctions(userId) {
    return Api.get(`${baseURL}/user-auctions/` + userId).then((json) => json);
  },
  getUserBids(userId) {
    return Api.get(`${baseURL}/user-bids/` + userId).then((json) => json);
  },
  getUsersWonAuctions(userId) {
    return Api.get(`${baseURL}/won-auctions/` + userId).then((json) => json);
  },
  getAverageRatingByUserId(userId) {
    return Api.get(`${baseURL}/rating/` + userId).then((json) => json);
  },
  postRating(userId, rating) {
    return Api.post(`${baseURL}/rating/` + userId, rating).then((json) => json);
  },
  canUserLeaveRating(sellerId) {
    return Api.get(`${baseURL}/canLeaveRating/` + sellerId).then(
      (json) => json
    );
  },
  getUsersSellerRating(sellerId) {
    return Api.get(`${baseURL}/usersSellerRating/` + sellerId).then(
      (json) => json
    );
  },
};
