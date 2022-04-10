import axios from "axios";

const accessToken = "";

const Api = {
  service: axios.create({
    // eslint-disable-next-line no-undef
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // csrf: 'token',
    },
  }),

  get(endpoint, params = {}) {
    return this.service
      .get(endpoint, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response);
  },

  post(endpoint, payload, params = {}) {
    return this.service
      .post(endpoint, payload, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response);
  },

  patch(endpoint, payload, params = {}) {
    return this.service
      .patch(endpoint, payload, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response);
  },

  put(endpoint, payload, params = {}) {
    return this.service
      .put(endpoint, payload, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response);
  },

  delete(endpoint, params = {}) {
    return this.service
      .delete(endpoint, {
        params,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => response);
  },
};

export default Api;
