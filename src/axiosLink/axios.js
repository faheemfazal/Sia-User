import axios from "axios";

// Create an instance of axios
const axiosuser = axios.create({
  // baseURL: "https://sia-backend-eight.vercel.app",
  baseURL: "http://localhost:5000",
  
  // http://localhost:3000/cart
  
 
  headers: {
    "Content-Type": "application/json",
  },
});

const clientAxiosIntercepter = (url) => {
  axiosuser.interceptors.request.use(
    config => {
      const tokenData = localStorage.getItem('Token');
      if (tokenData) {
        config.headers['Authorization'] = `Bearer ${tokenData}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosuser.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('Token');
        // Redirect to login or appropriate page
      }
      //  else if (error.response && error.response.status === 500) {
      //   window.location.href = "/error500";
      // } else if (error.response) {
      //   console.log("HTTP ERROR CODE:", error.response.status);
      // } else if (error.request) {
      //   console.log("Network Error:", error.message);
      // } else {
      //   console.log("Error:", error.message);
      // }
      return Promise.reject(error);
    }
  );

  return axiosuser;
}

export default clientAxiosIntercepter;
