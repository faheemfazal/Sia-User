// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user"
const  axiosuser= clientAxiosIntercepter(url);


export const searchProduct = async (searchString) => {
    try {
      const response = await axiosuser({
        url: `/searchProducts?searchString=${searchString}`,
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };