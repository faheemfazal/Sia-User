import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);

export const getdate = async (userId) => {
  try {
    const response = await axiosuser({
      url: `/getdate`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
