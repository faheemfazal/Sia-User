import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);


export const getBanner = async () => {
    try {
      const response = await axiosuser({
        url: `/getBanner`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    } catch (err) {}
  };