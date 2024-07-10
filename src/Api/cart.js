// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user"
const  axiosuser= clientAxiosIntercepter(url);





export const addCart = async (productId,userId,data) => {
    try {

      console.log(productId,userId,data,'ooo');
      const response = await axiosuser({
        url: `/addtocart?productId=${productId}&userId=${userId}&unit=${data.unit}&unitType=${data.unitType}`,

        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'..................')
      return response;
    } catch (err){
        console.log(err)
    }
  };
export const cartView = async (userId) => {
    try {

      const response = await axiosuser({
        url: `/cartitems?userId=${userId}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'..................')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const cartViewForCheckout = async (userId) => {
    try {

      const response = await axiosuser({
        url: `/cartdetail-checkout`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'..................')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const cartIncrement = async (productId,unit,unitType,userId) => {
    try {

      console.log(productId,unit,unitType,userId,'22');

      const response = await axiosuser({
        url: `/increment?productId=${productId}&userId=${userId}&unit=${unit}&unitType=${unitType}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response,'ppppppp')
      return response;
    } catch (err){
        console.log(err)
    }
  };
  export const cartDecrement = async (productId,unit,unitType,userId) => {
    try {

      const response = await axiosuser({
        url: `/decrement?productId=${productId}&userId=${userId}&unit=${unit}&unitType=${unitType}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response.data,'..................')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  export const cartCounts = async (userId) => {
    try {

      console.log('id');
      const response = await axiosuser({
        url: `/CartItemsCount?userId=${userId}`,
        method: "get",
        // headers: { Authorization: `Bearer ${token}` },
      });
  console.log(response.data,'..................')
      return response;
    } catch (err){
        console.log(err)
    }
  };

  export const getOrders = async (id) => {
    try {
      console.log('id.....................sd');
      const response = await axiosuser({
        url: `/getorder?userId=${id}`,
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh....')
      return response;
    } catch (err){
        console.log(err)
    }
  };

  export const checkCart = async () => {
    try {
    
      const response = await axiosuser({
        url: `/checkout`,
        method: "get",
        // headers: { Authorization : `Bearer ${token}` },
      });
  console.log(response,'khkhkh....')
      return response;
    } catch (err){
        console.log(err)
    }
  };


  


  