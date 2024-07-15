// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);

export const getProduct = async (hub) => {
  try {
    const response = await axiosuser({
      url: "/getproducts",
      method: "get",
      // headers: { Authorization : `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};

export const getViewproduct = async (id) => {
  try {
    const response = await axiosuser({
      url: `/viewproduct?id=${id}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
