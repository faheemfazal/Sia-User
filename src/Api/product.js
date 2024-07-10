// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user"
const  axiosuser= clientAxiosIntercepter(url);



export const getProduct = async (hub) => {
    try {
      console.log('oo');
      const response = await axiosuser({
        url: '/getproducts',
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const getViewproduct = async (id) => {
    try {
      const response = await axiosuser({
        url:`/viewproduct?id=${id}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'khkhkh')
      return response;
    } catch (err){
        console.log(err)
    }
  };




