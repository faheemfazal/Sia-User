import Navbar from "../components/Navbar";
import img from "../assets/images/fruite-item-5.jpg";
import empty from "../assets/images/empty.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { cartDecrement, cartIncrement, cartView, checkCart } from "../Api/cart";
import Footer from "../components/Footer";
import { Toast } from 'antd-mobile';
import { message, Modal, Button } from 'antd';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function Cart() {
  const [reducing, setReducing] = useState(false);
  const [ms, setMs] = useState();
  const [carts, setCarts] = useState([]);
  const [reload, setReload] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const navigate = useNavigate();
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(1);
  let id = '6667454f926ecee4d29cac2d';

  const handleCheckout = async () => {
    try {
      if (carts.length) {
        const response = await checkCart();
        if (response?.status === 200) {
          setIsModalOpen(true); // Open modal on success
          setDeletedProducts(response?.data?.cart);
        } else if (response?.status === 202) {
          // message.success('Checkout successful');
          Toast.show({
            icon: 'success',
            content: 'Checkout successful',
          });
          navigate('/checkout');
        }
      } else {
        // message.error('Cart is empty');
        Toast.show({
          icon: 'fail',
          content: 'Cart is empty',
        });
      }
    } catch (error) {
      message.error('Checkout failed');
      console.error(error);
    }
  };

  const handleProceed = () => {
    // Remove deleted products from cart
    if (deletedProducts?.length < carts?.length) {
      navigate('/checkout');
      Toast.show({
        icon: 'success',
        content: 'Removed unavailable products and proceeded with checkout',
      });
      // message.success('Removed unavailable products and proceeded with checkout');
    } else {
      message.error('This product has no available').then((res) => setIsModalOpen(false));
    }
  };

  const handleIncrement = (productId, unit, unitType) => {
    setReducing(true);
    setMs('Increasing..');
    cartIncrement(productId, unit, unitType, id).then((res) => {
      setReducing(false);
      setMs('');
      setCount(count + 1);
    });
  };

  const handleDecrement = (productId, unit, unitType) => {
    setReducing(true);
    setMs('Reducing..');
    cartDecrement(productId, unit, unitType, id).then((res) => {
      setCount(count - 1);
      setReducing(false);
      setMs('');
    });
    if (count === 1) {
      setReload(!reload);
      return;
    }
  };

  useEffect(() => {
    cartView(id).then((response) => {
      if (response?.status === 200) {
        setCarts(response?.data?.cartItems);
      } else {
        setCarts([]);
      }
      setLoading(false);
    });
  }, [count, reload]);

  return (
    <div>
      <Navbar />
      <div className="h-[1000px]">
        <div
          className="container-fluid page-header h-28 py-5 "
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-center text-white text-6xl ">Cart</h1>
          <ol className="breadcrumb justify-center flex mb-0 text-white text-2xl gap-5">
            <li className="breadcrumb-item">
              <div
                className="text-[#63247d] font-bold"
                onClick={() => navigate("/home")}
              >
                Home
              </div>
            </li>
            <li className="breadcrumb-item active ">Cart Detail</li>
          </ol>
        </div>
        <div className="md:mx-24 mx-2 ">
          <div className="">
            <h1 className="text-2xl font-semibold mt-4">Your Basket</h1>
            <div
              className="rounded-xl my-3 w-full bg-black h-full p-5 flex justify-between"
            >
              <div>
                <h1 className="text-lg text-white">
                  {loading ? <Skeleton width={100} /> : `Subtotal (${carts?.length})`}
                </h1>
                <h1 className="text-lg text-white">
                  {loading ? (
                    <Skeleton width={100} />
                  ) : (
                    `₹ ${carts?.reduce((acc, item) => acc + item.total, 0)}`
                  )}
                </h1>
              </div>
              <button
                className="items-center text-white text-lg bg-red-700 rounded-lg p-2"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </div>

          {loading ? (
            <Skeleton count={5} height={100} />
          ) : carts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={empty} alt="Cart is empty" className="w-64 h-64" />
              <h1 className="text-2xl font-semibold mt-4">Cart is empty</h1>
            </div>
          ) : (
            carts?.map((data, i) => (
              <div
                key={i}
                className="w-full h-full flex justify-between items-center py-3 border-b-2 border-b-slate-200"
              >
                <div className="h-full">
                  <img
                    src={data.product.image}
                    alt=""
                    width={20}
                    height={20}
                    className="md:h-20 md:w-20 h-16 w-16 hover:border-[0.3rem] border"
                  />
                </div>
                <div className="w-[200px] h-full p-3">
                  <>
                    <h1 className="font-bold text-2xl text-[#454a50]">{data.product.name}</h1>
                    <h1 className="font-bold text-[#747d88]">
                      ₹{" "}
                      {data.unitType === "G"
                        ? (data.product.price * data.unit) / 1000
                        : data.product.price / data.unit}
                    </h1>
                    <h1 className="font-bold text-[#747d88]">
                      {" "}
                      {data.unit} {data.unitType}
                    </h1>
                    <div className=""></div>
                  </>
                </div>
                <div className="w-[200px] h-full items-end text-end">
                  {reducing ? (
                    <h1 className="flex items-end justify-end space-x-4">loading..</h1>
                  ) : (
                    <div className="flex items-end justify-end space-x-4">
                      <button
                        onClick={() => handleDecrement(data.product.id, data.unit, data.unitType)}
                        className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition"
                      >
                        <FaMinus />
                      </button>
                      <input
                        type="text"
                        className="w-12 text-center text-gray-700 border border-gray-300 rounded focus:outline-none"
                        value={
                          data.unitType === "G" ? data.quantity / data.unit : data.quantity
                        }
                        readOnly
                      />
                      <button
                        onClick={() => handleIncrement(data.product.id, data.unit, data.unitType)}
                        className="bg-gray-200 text-gray-800 p-2 rounded-full hover:bg-gray-300 transition"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  )}
                  <h1 className="font-bold text-[#747d88] p-5">
                    ₹{" "}
                    {data.unitType === "G"
                      ? (data.product.price * data.unit) / 1000
                      : data.product.price / data.unit}{" "}
                    * {data.unitType === "G" ? data.quantity / data.unit : data.quantity} = ₹{" "}
                    {data.total.toFixed(2)}
                  </h1>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <div
        className={`bg-[#4c1c61] relative ${
          carts?.length === 0 ? "top-[500px]" : "top-96"
        }`}
      >
        <Footer />
      </div>

      <Modal
        title={<h2 style={{ color: "red" }}>Unavailable Products</h2>}
        visible={isModalOpen}
        onOk={handleProceed}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="proceed" type="primary" onClick={handleProceed}>
            Proceed
          </Button>,
        ]}
      >
        <p style={{ color: "red" }}>The following products are not available:</p>
        <ul>
          {deletedProducts.map((product, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <img
                src={product?.product?.productImageUrl[0]}
                alt={product?.productName}
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  filter: "grayscale(100%)",
                }}
              />
              <div>
                <h3>{product?.product?.productName}</h3>
                <p>Quantity: {product?.quantity}</p>
                <p>Total: ₹{product?.total}</p>
              </div>
            </li>
          ))}
        </ul>
        <p style={{ color: "red" }}>Please remove these products and proceed?</p>
      </Modal>
    </div>
  );
}
