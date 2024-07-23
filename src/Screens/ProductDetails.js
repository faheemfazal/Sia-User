import React, { useContext, useState, useEffect } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import img from '../assets/images/fruite-item-5.jpg';
import { getViewproduct } from '../Api/product';
import { addCart } from '../Api/cart';
import { CartContext } from '../context/CartContext';
import { message } from 'antd';
import Footer from '../components/Footer';
import { Toast } from 'antd-mobile';
import { TailSpin } from 'react-loader-spinner';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState(useParams());
  const [selectedOption, setSelectedOption] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useContext(CartContext);
  let userid = '6667454f926ecee4d29cac2d';
  const token = localStorage.getItem('Token');
  const navigate = useNavigate();
  const { id } = useParams();

  if (id != productId) {
    setProductId(id);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getViewproduct(id);
        const loadedProducts = res.data.singleProduct;

        setProduct(res.data.singleProduct);

        const defaultOptions = {};
        let options;
        if (loadedProducts.itemBehaviour === 'KG') {
          const pricePerGram = loadedProducts.price / 1000;
          options = [
            { unit: '100', unitType: 'G', price: `₹${(pricePerGram * 100).toFixed(2)}` },
            { unit: '250', unitType: 'G', price: `₹${(pricePerGram * 250).toFixed(2)}` },
            { unit: '500', unitType: 'G', price: `₹${(pricePerGram * 500).toFixed(2)}` },
            { unit: '1', unitType: 'KG', price: `₹${(pricePerGram * 1000).toFixed(2)}` },
          ];
          setSelectedOption(options[3]);
        } else {
          options = [{ unit: '1', unitType: 'PACK', price: `₹${product.price}` }];
          setSelectedOption(options[0]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [productId]);

  const handleCart = async (productId) => {
    setSpinner(true);
    if (!token) {
      setSpinner(false);
      return navigate('/login-signup');
    }
    if (selectedOption) {
      try {
        await addCart(product._id, userid, selectedOption);
        fetchCartCount();
        message.success('Added into cart');
        Toast.show({
          icon: 'success',
          content: 'Added to cart',
        });
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setSpinner(false);
      }
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  let options = [];
  if (product.itemBehaviour === 'KG') {
    const pricePerGram = product.price / 1000;
    options = [
      { unit: '100', unitType: 'G', price: `₹${(pricePerGram * 100).toFixed(2)}` },
      { unit: '250', unitType: 'G', price: `₹${(pricePerGram * 250).toFixed(2)}` },
      { unit: '500', unitType: 'G', price: `₹${(pricePerGram * 500).toFixed(2)}` },
      { unit: '1', unitType: 'KG', price: `₹${(pricePerGram * 1000).toFixed(2)}` },
    ];
  } else {
    options = [{ unit: '1', unitType: 'PACK', price: `₹${product.price}` }];
  }

  return (
    <>
      <Navbar />
      <div>
        <div
          className="container-fluid page-header h-28 py-5"
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <h1 className="text-center text-white text-6xl">Shop Detail</h1>
          <ol className="breadcrumb justify-center flex mb-0 text-white text-2xl gap-5">
            <li className="breadcrumb-item">
              <div className="text-[#63247d] font-bold" onClick={() => navigate('/home')}>
                Home
              </div>
            </li>
            <li className="breadcrumb-item active">Shop Detail</li>
          </ol>
        </div>

        <div className="py-5 mt-5 lg:mx-10 mx-2">
          <div className="container py-5">
            <div className="row g-4 mb-5">
              <div className="col-lg-8 col-xl-9">
                <div className="row g-4 md:flex">
                  <div className="col-lg">
                    <div className="border rounded-2xl">
                      <button>
                        {loading ? (
                          <Skeleton width={500} height={400} />
                        ) : (
                          <img
                            src={product.productImageUrl}
                            className="img-fluid rounded w-[500px] h-[400px]"
                            alt="Product"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="md:px-7">
                    <h4 className="font-bold text-3xl mt-3 text-[#45595b] mb-3">
                      {loading ? <Skeleton width={200} /> : product.productName}
                    </h4>
                    <p className="mb-3 text-[#747d88] text-lg">
                      Category: {loading ? <Skeleton width={100} /> : product.category}
                    </p>
                    <h5 className="font-bold mb-3 text-3xl text-[#747d88]">
                      {loading ? <Skeleton width={100} /> : `${product.price}Rs`}
                    </h5>
                    <p className="mb-4 text-[#747d88] flex w-full">
                      {loading ? (
                        <Skeleton count={3} />
                      ) : product?.discription ? (
                        product.discription
                      ) : (
                        'Welcome to our store! Here you will find a wide variety of high-quality products designed to meet your needs and preferences. Each item in our collection is carefully selected to ensure the best value and satisfaction for our customers.'
                      )}
                    </p>

                    <div className="bg-white border border-[#63247d] w-full rounded-lg mt-2 mb-3 p-4 z-50">
                      <div className="py-2 gap-3 flex flex-col">
                        {options.map((option, optionIdx) => (
                          <div
                            key={optionIdx}
                            className={`flex justify-between items-center border rounded-lg gap-2 p-1`}
                            onClick={() => handleOptionSelect(option)}
                          >
                            <div className="flex gap-3">
                              <p>{loading ? <Skeleton width={50} /> : `${option.unit} ${option.unitType}`}</p>
                              <p>{loading ? <Skeleton width={50} /> : option.price}</p>
                            </div>
                            {selectedOption.unit === option.unit && (
                              <div className="bg-[#63247d] text-white rounded-lg px-2 py-1">✓</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      className="rounded-full px-4 py-2 mb-4 flex gap-2 text-[#63247d] hover:text-white hover:bg-[#63247d] font-bold text-2xl border-2 border-[#63247d]"
                      onClick={handleCart}
                    >
                      {spinner ? (
                        <>
                        
                        <TailSpin color="#63247d" height={20} width={20} />
                        <h1>Add to cart</h1>
                        </>
                      ) : (
                        <>
                          <FaShoppingBag className="mr-2" />
                          <h1>Add to cart</h1>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`bg-[#4c1c61] relative 'top-96' 'top-52'`}>
        <Footer />
      </div>
    </>
  );
}
