import Axios from "axios";

export const userId = "63c1d25713afc67d0128c166";
const api = Axios.create({
  baseURL: "https://dummyapi.io/data/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "app-id": "63c080950376760758406683",
  },
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (err) {
    try {
      if (!err.response.data?.message) {
        err.response.data = {
          message: "Something went wrong. Try again later",
        };
      }
      return Promise.reject(err);
    } catch (error) {
      return Promise.reject(err);
    }
  }
);

export default api;
