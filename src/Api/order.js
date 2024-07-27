// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);

export const placeOrder = async (formData, coins) => {
  try {
    Object.assign(formData, { coins });
    const res = await axiosuser({
      url: "/placeorder",
      method: "post",
      data: formData,
      // headers: { Authorization : `Bearer ${token}` },
    });
    // const token = res.data.token;
    // if (token) {
    //   localStorage.setItem("token", JSON.stringify(token));
    //   return res;
    // } else {
    return res;
    // }
  } catch {}
};

export const getOrderView = async (orderId) => {
  try {
    const response = await axiosuser({
      url: `/vieworder?orderId=${orderId}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};


export const cancelOrder = async (orderId) => {
  try {
    const response = await axiosuser({
      url: `/cancelorder?orderId=${orderId}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
