// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);

export const postlogin = async (inputValue, mailOrPhone) => {
  try {
    const res = await axiosuser({
      url: "/login",
      method: "post",
      data: { inputValue, mailOrPhone },
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

export const verifyOtp = async (otp, inputValue, mailOrPhone) => {
  try {
    const res = await axiosuser({
      url: "/varifyotp",
      method: "post",
      data: { otp, inputValue, mailOrPhone },
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
