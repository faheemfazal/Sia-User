// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);

export const addCart = async (productId, userId, data) => {
  try {
    const response = await axiosuser({
      url: `/addtocart?productId=${productId}&userId=${userId}&unit=${data.unit}&unitType=${data.unitType}`,

      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
export const cartView = async (userId) => {
  try {
    const response = await axiosuser({
      url: `/cartitems?userId=${userId}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};

export const cartViewForCheckout = async (userId) => {
  try {
    const response = await axiosuser({
      url: `/cartdetail-checkout`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};

export const cartIncrement = async (productId, unit, unitType, userId) => {
  try {
    const response = await axiosuser({
      url: `/increment?productId=${productId}&userId=${userId}&unit=${unit}&unitType=${unitType}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
export const cartDecrement = async (productId, unit, unitType, userId) => {
  try {
    const response = await axiosuser({
      url: `/decrement?productId=${productId}&userId=${userId}&unit=${unit}&unitType=${unitType}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};

export const cartCounts = async (userId) => {
  try {
    const response = await axiosuser({
      url: `/CartItemsCount?userId=${userId}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};

export const getOrders = async (id) => {
  try {
    const response = await axiosuser({
      url: `/getorder?userId=${id}`,
      method: "get",
      // headers: { Authorization : `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};

export const checkCart = async () => {
  try {
    const response = await axiosuser({
      url: `/checkout`,
      method: "get",
      // headers: { Authorization : `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
