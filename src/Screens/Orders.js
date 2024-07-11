import { FaShoppingBag } from "react-icons/fa";
import Navbar from "../components/Navbar";
import img from '../assets/images/fruite-item-5.jpg';
import coin from '../assets/images/GOLD.png';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../Api/cart";
import Footer from "../components/Footer";
import Silver from '../assets/images/SILVER.png';
import platinum from '../assets/images/PLATINUM.png';
import empty from "../assets/images/emptyOrder.jpg";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [coins, setCoins] = useState([]);

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    useEffect(() => {
      // Simulate data fetching
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Set a delay to simulate loading time
    }, []);
    let id = '6667454f926ecee4d29cac2d';

    useEffect(() => {
        getOrders(id).then((res) => {
            console.log(res, 'order');
            if (res?.status === 200) {
                console.log(res,';;');
                setOrders(res?.data?.order);
                setCoins(res?.data?.coins);


            }
        })
    }, []);

    console.log(orders,'orders');

    return (
        <>
            <Navbar />
            <div className={`min-h-screen ${orders.length === 0 ? 'h-screen' : 'h-auto'}`}>
                <div
                    className="container-fluid page-header h-28 py-5"
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <h1 className="text-center text-white text-6xl">Orders</h1>
                    <ol className="breadcrumb justify-center flex mb-0 text-white text-2xl gap-5">
                        <li className="breadcrumb-item">
                            <div
                                className="text-[#63247d] font-bold"
                                onClick={() => navigate("/home")}
                            >
                                Home /
                            </div>
                        </li>
                        <li className="breadcrumb-item active">Orders</li>
                    </ol>
                </div>

                <div className="mx-3 md:mx-20 py-5">
                    <div className="py-15 flex justify-between">
                        <h1 className="mb-8 text-3xl text-[#747d88] font-bold">
                        </h1>
                        <div className="flex lg:gap-5 gap-3">
                            <div className="flex lg:gap-1 align-middle items-center">
                                <h1 className="text-2xl font-bold text-[#63247d]">{coins.platinum}</h1>
                                <div className="px-2 lg:w-14 lg:h-14 h-10 w-10 mb-4 flex lg:gap-2 text-[#63247d] font-bold text-2xl"
                                    style={{
                                        backgroundImage: `url(${platinum})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                    }}>
                                </div>
                            </div>
                            <div className="flex lg:gap-1 align-middle items-center">
                                <h1 className="text-2xl font-bold text-[#63247d]">{coins.silver}</h1>
                                <div className="px-2 lg:w-14 lg:h-14 h-10 w-10 mb-4 flex lg:gap-2 text-[#63247d] font-bold text-2xl"
                                    style={{
                                        backgroundImage: `url(${Silver})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                    }}>
                                </div>
                            </div>
                            <div className="flex lg:gap-1 align-middle items-center">
                                <h1 className="text-2xl font-bold text-[#63247d]">{coins.gold}</h1>
                                <div className="px-2 lg:w-14 lg:h-14 h-10 w-10 mb-4 flex lg:gap-2 text-[#63247d] font-bold text-2xl"
                                    style={{
                                        backgroundImage: `url(${coin})`,
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                    }}>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:mx-10 justify-center w-full my-4 mx-2">
      <h1 className="mb-8 text-3xl text-[#747d88] font-bold">My Orders</h1>
      {loading ? (
        // Show skeleton loader while data is being fetched
        <>
          {Array(3).fill().map((_, index) => (
            <div key={index} className="w-full h-full flex justify-between items-center py-3 border-b-2 border-b-slate-200">
              <div className="w-[200px] h-full p-3">
                <h1 className="text-lg font-bold text-[#454a50] whitespace-nowrap">
                  <Skeleton width={100} />
                </h1>
                <h1 className="text-md font-medium text-[#747d88]">
                  <Skeleton width={150} />
                </h1>
                <h1 className="text-md font-medium text-[#747d88]">
                  <Skeleton width={150} />
                </h1>
                <h1 className="text-md font-medium text-[#747d88]">
                  <Skeleton width={150} />
                </h1>
                <h1 className="text-md font-medium text-[#747d88]">
                  <Skeleton width={150} />
                </h1>
              </div>
              <div className="w-[200px] h-full items-end text-end">
                <div className="flex gap-3 justify-end items-center pr-4">
                  <Skeleton circle height={12} width={12} />
                  <h1 className="text-bold"><Skeleton width={100} /></h1>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        orders?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={empty} alt="No orders" className="w-64 h-64" />
            <h1 className="text-2xl font-semibold mt-4">No orders</h1>
          </div>
        ) : (
          orders.map((data, i) => (
            <div key={data._id} className="w-full h-full flex justify-between items-center py-3 border-b-2 border-b-slate-200"
              onClick={() => navigate(`/order-details/${data._id}`)}>
              <div className="w-[200px] h-full p-3">
                <h1 className="text-lg font-bold text-[#454a50] whitespace-nowrap">Order ID: <span className="text-[#63247d]">{data._id.slice(0, 6)}</span></h1>
                <h1 className="text-md font-medium text-[#747d88]">Total Amount: <span className="font-bold">₹ {data.totalAmount}</span></h1>
                <h1 className="text-md font-medium text-[#747d88]">Total Items: <span className="font-bold">{data?.items?.length}</span></h1>
                <h1 className="text-md font-medium text-[#747d88]">Order Date: <span className="font-bold">{new Date(data.createdAt).toLocaleDateString()}</span></h1>
                <h1 className="text-md font-medium text-[#747d88]">Order Time: <span className="font-bold">{new Date(data.createdAt).toLocaleTimeString()}</span></h1>
              </div>
              <div className="w-[200px] h-full items-end text-end">
                <div className="flex gap-3 justify-end items-center pr-4">
                  <div className={`w-3 h-3 rounded-full ${data.status === 'Pending' ? 'bg-red-700' : 'bg-green-700'}`}></div>
                  <h1 className="text-bold">Order {data.status}</h1>
                </div>
              </div>
            </div>
          ))
        )
      )}
    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
