// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user";
const axiosuser = clientAxiosIntercepter(url);

export const findUniqueCategory = async () => {
  try {
    const response = await axiosuser.get("/uniquecategory", {
      // headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch {}
};

export const categoryproducts = async (category) => {
  try {
    const response = await axiosuser({
      url: `/categoryproducts?categoryName=${category}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (err) {}
};
