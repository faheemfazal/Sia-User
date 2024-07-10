// import axiosuser from "../axiosLink/axios";
import clientAxiosIntercepter from "../axiosLink/axios";
const url = "user"
const  axiosuser= clientAxiosIntercepter(url);


export const findUniqueCategory = async () => {
  try {
    console.log('oooooooooo');
    const response = await axiosuser.get("/uniquecategory", {
      // headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response,'ooooooooo');

    return response;
  } catch {}
};

export const categoryproducts = async (category) => {
  try {

    console.log(category,'ppppppppppppppppppp');

    const response = await axiosuser({
      url: `/categoryproducts?categoryName=${category}`,
      method: "get",
      // headers: { Authorization: `Bearer ${token}` },
    });
console.log(response.data,'..................')
    return response;
  } catch (err){
      console.log(err)
  }
};