import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

//Request
apiClient.interceptors.request.use(
  (config) => {
    console.log("Request Sent");
    return config;
  },
  (error) => {
    console.log(error.message);
    return Promise.reject(error);
  },
);

//Response

apiClient.interceptors.response.use(
  (response) => {
    console.log("response", response);
    return response;
  },
  (error) => {
    if (error.response?.status === 400 || error.response?.status === 404) {
      console.log("Unauthorized || Forbidden");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
