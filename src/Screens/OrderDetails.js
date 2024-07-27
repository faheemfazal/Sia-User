import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { cancelOrder, getOrderView } from "../Api/order";
import img from "../assets/images/fruite-item-5.jpg";
import coin from "../assets/images/9948668.png";
import Footer from "../components/Footer";
import Swal from 'sweetalert2';
import { Toast } from "antd-mobile";

export default function OrderDetails() {
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    getOrderView(orderId).then((res) => {
      console.log(res,'opopopopopofg');
      setOrder(res?.data[0]);
    });
  }, [orderId,loading]);

  console.log(order.status,'oogsjgkfdmgh');

  const handleCancelOrder =async ()=>{
    try{
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This will cancel the order. Do you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No, keep it',
        customClass: {
          container: "fixed inset-0 flex justify-center items-center",
          popup: "p-4 rounded-lg bg-white",
          confirmButton: "bg-red-500 text-white px-4 py-2 rounded m-2",
          cancelButton: "bg-gray-500 text-white px-4 py-2 rounded ml-2 m-2",
        },
      });
  
      if (result.isConfirmed) {
       const res=await cancelOrder(orderId)
       if(res.status===200){
        Toast.show({
          icon: "success",
          content: "Order successfully cancelled",
        });
        setLoading(!loading)

       }
       }
    }catch{

    }
  }


  return (
    <>
      <Navbar />
      <div className={`"min-h-screen ${order.length === 0 ? 'h-screen' : 'h-auto'}`}>
        <div
          className="container-fluid page-header h-28 py-5"
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-center text-white text-6xl">Order Details </h1>
          <ol className="breadcrumb justify-center flex mb-0 text-white text-2xl gap-5">
            <li className="breadcrumb-item">
              <div
                className="text-[#63247d] font-bold"
                onClick={() => navigate("/home")}
              >
                Home /
              </div>
            </li>
            <li
              className="breadcrumb-item active cursor-pointer"
              onClick={() => navigate("/order-Details")}
            >
              Orders /
            </li>
            <li className="breadcrumb-item active">Order Detail</li>
          </ol>
        </div>
        <div className="mx-3 md:mx-20 py-10">
          {/* User Details and Rewards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


           <div className="p-4 border rounded-lg shadow-md lg:flex justify-between">
  <div>
    <h2 className="text-xl font-bold">User Details</h2>
    <p>
      <span className="font-bold">Phone Number:</span> {order.userId?.secondPhoneNumber},{" "}
      {order.userId?.phoneNumber}
    </p>
    <p>
      <span className="font-bold">Order ID:</span> {order._id ? order._id.slice(0, 4) : ""}
    </p>
    <p>
      <span className="font-bold">Total Amount:</span> ₹ {order.totalAmount}
    </p>
    <p>
      <span className="font-bold">Total Products:</span> {order.items ? order.items.length : 0}
    </p>
    <div className="flex items-center">
      <span className="font-bold">Order Status:</span>
      <p
        className={
          order.status === "Pending"
            ? "text-gray-500"
            : order.status === "Confirmed"
            ? "text-blue-500"
            : order.status === "Packed"
            ? "text-orange-500"
            : order.status === "Completed"
            ? "text-green-500"
            : ""
        }
      >
        {order.status ? order.status : 0}
      </p>
    </div>
  </div>
  {/* <div>
    <img src={img} alt="Product Image" className="w-24 h-24 object-cover mb-4" />
    <p>
      <span className="font-bold">Transaction ID:</span> {order.transactionId}
    </p>
  </div> */}
</div>


            
<div className="p-4 border rounded-lg shadow-md">
  {(order.status === 'Pending' || order.status === 'Packed' || order.status === 'Confirmed') && (
    <button
      onClick={handleCancelOrder}
      className="bg-red-500 text-white px-2 py-2 rounded whitespace-nowrap"
    >
      Cancel Order
    </button>
  )}
</div>
          </div>

          {/* Your Products Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Your Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.items &&
                order?.items?.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 border rounded-lg shadow-md flex justify-between items-center"
                  >
                    <div>
                      <h2 className="text-xl font-bold">
                        {item.product.productName}
                      </h2>
                      <p>Category: {item?.product?.category}</p>
                      <p>Sub-Category: {item?.product?.subCategory}</p>
                      <p>
                        Quantity: {item?.quantity} {item?.unitType}
                      </p>
                      <p>Price: ₹ {item?.price}</p>
                      <p>Total: ₹ {item?.total}</p>
                    </div>
                    <img
                      src={item?.product?.productImageUrl}
                      alt={item?.product?.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`relative ${order?.length === 0 ? "top-96" : "top-52"}`}> */}
        <Footer />
      {/* </div> */}
    </>
  );
}
