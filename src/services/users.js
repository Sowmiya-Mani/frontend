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
};
