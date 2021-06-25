import axios from "axios";

//URL for the backend (API).
//const baseURL = "http://localhost:8000/api/";

//Creates a axios instance with some settings for our app.
const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Authorization: sessionStorage.getItem("access")
      ? "Bearer " + sessionStorage.getItem("access")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

//Spesific interceptors set up to handle when having to update access token due to it expiering.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred. " +
          "Looks like CORS might be the problem. " +
          "Sorry about this - we will get it fixed shortly."
      );
      return Promise.reject(error);
    }

    //If the previous request was trying to refresh the tokenpair, but it was rejected.
    //Logs the user out, since the refresh token then probably was expiered.
    if (
      error.response.status === 401 &&
      originalRequest.url === "api/users/refresh/"
    ) {
      window.location.href = "/";
      return Promise.reject(error);
    }

    //If the users access token is expiered.
    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = sessionStorage.getItem("refresh");

      if (refreshToken) {
        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);

        if (tokenParts.exp > now) {
          //Token not expiered, tries to refresh the tokenpair, and then tries to perform the original request again.
          return axiosInstance
            .post("api/users/refresh/", { refresh: refreshToken })
            .then((response) => {
              sessionStorage.setItem("access", response.data.access);
              sessionStorage.setItem("refresh", response.data.refresh);

              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              //Performs the original request after gaining new tokens.
              return axiosInstance(originalRequest);
            })
            .catch((err) => {});
        } else {
          //Refresh token is expiered.
          window.location.href = "/";
        }
      } else {
        //Refresh token is not available in localstorage.
        window.location.href = "/";
      }
    }
    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
