import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import {  cartViewForCheckout } from "../Api/cart";
import { placeOrder } from "../Api/order";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import scannerimg from '../assets/images/Screenshot 2024-07-24 092508.png';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../Api/redux-toolkit/slice/userReducer";
import SuccessModal from '../components/Modal/SuccessModal'; 
import { message } from 'antd';

export default function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [cartViews, setCartViews] = useState([]);
  const [name, setName] = useState("");
  const [secondPhoneNumber, setSecondPhoneNumber] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState("");
  const [errors, setErrors] = useState({});
  const [coinstate, setCoins] = useState({});
  const { fetchCartCount } = useContext(CartContext);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const reduxstate = useSelector((state)=>state.userSlice)


  const userId = "6667454f926ecee4d29cac2d"; // Example user ID
  const upload_preset = 'vytol9u4';
  const cloud_name = 'djbokpgy8';

  const coinFind=()=>{
    try{
      let coins={Platinum:0,Gold:0,Silver:0}
      cartViews.forEach((data)=>{
        if(data.unitType == 'KG' || data.unitType=='G'){
             if(data.unit=="1"){
               const coin=  data.product.coin1kg * data.quantity
               if(data.product.coinType1kg == "PLATINUM"){
                coins.Platinum = coin+coins.Platinum
               }else if(data.product.coinType1kg=="GOLD"){
                coins.Gold = coin+coins.Gold
               }else if(data.product.coinType1kg=="SILVER"){
                coins.Silver = coin+coins.Silver

               }
             }
             if(data.unit=="100"){
              const coin=  data.product.coin100g * (data.quantity / data.unit)
              if(data.product.coinType100g == "PLATINUM"){
               coins.Platinum = coin+coins.Platinum
              }else if(data.product.coinType100g=="GOLD"){
               coins.Gold = coin+coins.Gold
              }else if(data.product.coinType100g=="SILVER"){
               coins.Silver = coin+coins.Silver

              }
            }
            if(data.unit=="250"){
              const coin=  data.product.coin250g *  (data.quantity / data.unit)
              if(data.product.coinType250g == "PLATINUM"){
               coins.Platinum = coin+coins.Platinum
              }else if(data.product.coinType250g=="GOLD"){
               coins.Gold = coin+coins.Gold
              }else if(data.product.coinType250g=="SILVER"){
               coins.Silver = coin+coins.Silver

              }
            }
            if(data.unit=="500"){
              const coin=  data.product.coin500g * (data.quantity / data.unit)
              if(data.product.coinType500g == "PLATINUM"){
               coins.Platinum = coin+coins.Platinum
              }else if(data.product.coinType500g=="GOLD"){
               coins.Gold = coin+coins.Gold
              }else if(data.product.coinType500g=="SILVER"){
               coins.Silver = coin+coins.Silver

              }
            }
          
        }else{
          const coin=  data.product.coin * data.quantity
          if(data.product.coinType == "PLATINUM"){
           coins.Platinum = coin+coins.Platinum
          }else if(data.product.coinType=="GOLD"){
           coins.Gold = coin+coins.Gold
          }else if(data.product.coinType=="SILVER"){
           coins.Silver = coin+coins.Silver

          }

        }

      })
      setCoins(coins)

    }catch{

    }
  }

  const handlePaymentChange = (event) => {
    const { value } = event.target;
    setSelectedPayment(value);
  };

  // const handleFileChange = (event) => {
  //   setScreenshot(event.target.files[0]);
  // };

  const handleFile = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', upload_preset);
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
      if (response?.data?.secure_url) {
        setScreenshot(response.data.secure_url);
      }
    } catch (error) {
    }
  };


  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "Name is required";
    if (!/^\d{10}$/.test(secondPhoneNumber)) errors.mobile = "Invalid mobile number";
    if (!selectedPayment) errors.payment = "Payment method is required";
    if (selectedPayment === "scanner payment" && !transactionId.trim()) errors.transactionId = "Transaction ID is required";
    if (selectedPayment === "scanner payment" && !screenshot) errors.screenshot = "Screenshot is required";
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!cartViews){
      return message.error('Failed to place ')

    }
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      try {
        const orderData = {
          userId: userId,
          name: name,
          secondPhoneNumber: secondPhoneNumber,
          paymentMethod: selectedPayment,
        };

        if (selectedPayment === "scanner payment") {
          orderData.transactionId = transactionId;
          orderData.screenshot = screenshot;
        }


        const res = await placeOrder(orderData,coinstate);
      
        if (res.status === 200) {
          fetchCartCount();
          // setSuccessopen(false);
          setModalIsOpen(true); // Close the modal after 3 seconds

          dispatch(setLogin({
            ...reduxstate,
            name:res.data.name,
            
        }))
        setTimeout(() => {
          // setSuccessopen(true);
          setModalIsOpen(false); // Close the modal after 3 seconds
          navigate('/home');
        }, 4000);
          
        }else{
        message.error('Failed to place order')
        }
  
      } catch (error) {
        console.error('Error placing order:', error);
        // alert('Failed to place order');
        message.error('Failed to place order')

      }
    }
  };
  useEffect(()=>{
    
    coinFind()

  },[cartViews])

  useEffect(() => {
    cartViewForCheckout(userId).then((response) => {
      setCartViews(response.data.cartItems);
    });
    
  }, [userId]);

  return (
    <>
  
      <Navbar />
      {/* {successopen ? ( */}
          <>
        <div className="mx-3 md:mx-10 py-10">
          <div className="py-10">
            <h1 className="mb-8 text-3xl text-[#747d88] font-bold">
              Billing details
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-7/12 px-6">
                  <div className="flex flex-wrap -mx-6">
                    <div className="w-full lg:w-1/2 px-6">
                      <div className="mb-6">
                        <label className="block mb-2">
                          Name<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-6">
                      <div className="mb-6">
                        <label className="block mb-2">
                          Mobile<sup>*</sup>
                        </label>
                        <input
  type="number"
  className="w-full p-3 border rounded"
  value={secondPhoneNumber}
  onChange={(e) => setSecondPhoneNumber(e.target.value)}
/>

                        {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-5/12 px-">
                  <div className="overflow-x-auto h-96 overflow-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th className="py-2">Products</th>
                          <th className="py-2">Name</th>
                          <th className="py-2">Price</th>
                          <th className="py-2">Quantity</th>
                          <th className="py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartViews?.map((data, i) => (
                          <tr key={i}>
                            <td className="py-4 pr-4">
                              <div className="flex items-center mt-2">
                                <img
                                  src={data?.product?.productImageUrl}
                                  className="w-20 h-20 rounded-full"
                                  alt={data?.product?.productName}
                                />
                              </div>
                            </td>
                            <td className="py-4 pr-4">{data?.product?.productName}</td>
                            <td className="py-4 pr-4">₹ {data?.unitType === "G" ? data?.product?.price * data?.unit / 1000 : data?.product?.price / data?.unit}</td>
                            <td className="py-4 pr-4">{data?.unitType === 'G' ? data?.quantity / data?.unit : data?.quantity}</td>
                            <td className="py-4 pr-4">₹ {data?.total.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-4 pr-4"></td>
                          <td className="py-4 pr-4"></td>
                          <td className="py-4 pr-4"></td>
                          <td className="py-4 pr-4">
                            <p className="mb-0 py-3 text-gray-700">Subtotal</p>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="py-3 border-t border-b">
                            <p className="mb-0 text-gray-700 whitespace-nowrap">
  ₹ {cartViews?.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
</p>

                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-4 pr-4"></td>
                          <td className="py-4 pr-4">
                            <p className="mb-0 text-gray-700 text-uppercase py-3">
                              TOTAL
                            </p>
                          </td>
                          <td className="py-4 pr-4"></td>
                          <td className="py-4 pr-4"></td>
                          <td className="py-4 pr-4">
                            <div className="py-3 border-t border-b">
                            <p className="mb-0 text-gray-700 whitespace-nowrap">
  ₹ {cartViews?.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
</p>

                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="border-b py-6">
                    <div className="mb-6">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          id="Delivery-1"
                          name="Delivery"
                          value="cash on delivery"
                          checked={selectedPayment === "cash on delivery"}
                          onChange={handlePaymentChange}
                        />
                        <span className="ml-2">Cash on pickup-hub</span>
                      </label>
                    </div>
                  </div>
                  <div className="border-b py-6">
                    <div className="mb-6">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          id="Scanner-1"
                          name="Scanner"
                          value="scanner payment"
                          checked={selectedPayment === "scanner payment"}
                          onChange={handlePaymentChange}
                        />
                        <span className="ml-2">Scanner Payment</span>
                      </label>
                    </div>
                    {errors.payment && <p className="text-red-500">{errors.payment}</p>}
                  </div>
                  {selectedPayment === "scanner payment" && (
                    <div className="border-t pt-6 text-">
                      <img
                        src={scannerimg}
                        alt="Scanner"
                        width={50}
                        height={50}
                        className="md:h-64 md:w-64 h-32 w-32 hover:border-[0.3rem] border"
                      />
                      <a
                        href={scannerimg}
                  
                        download="scanner.png"
                        className="inline-block py-2 px-4 bg-[#63247d] text-white rounded hover:bg-[#63247d] transition"
                      >
                        Download Scanner
                      </a>
                      <div className="mt-4">
                        <label className="block mb-2">
                          Transaction ID<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border rounded"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                        {errors.transactionId && <p className="text-red-500">{errors.transactionId}</p>}
                      </div>
                      <div className="mt-4">
                        <label className="block mb-2">
                          Upload Screenshot<sup>*</sup>
                        </label>
                        <input
                          type="file"
                          className="w-full p-3 border rounded"
                          onChange={handleFile}
                        />
                        {errors.screenshot && <p className="text-red-500">{errors.screenshot}</p>}
                      </div>
                    </div>
                  )}
                  <div className="text-center pt-6">
                    <button
                      type="submit"
                      className="py-3 px-6 uppercase w-full text-[#63247d] hover:text-white hover:bg-[#63247d] border-[#63247d] font-bold text-2xl border-2 "
                    >
                      Place Order
                    </button>
                  </div>
                </div> 
              </div>
            </form>
          </div>
        </div>
        <SuccessModal coinstate={coinstate} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
        <Footer />
        </>

        
    </>
  );
}
