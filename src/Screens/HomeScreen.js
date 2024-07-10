import { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaAngleDown, FaMinus, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getProduct } from "../Api/product";
import { addCart, cartDecrement, cartIncrement } from "../Api/cart";
import { CartContext } from "../context/CartContext";
import { message } from "antd";
import { categoryproducts, findUniqueCategory } from "../Api/category";
import Footer from "../components/Footer";
import LazyLoad from 'react-lazyload';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomeScreen() {
  const [count, setCount] = useState(1);
  const [reducing, setReducing] = useState(false);
  const [ms, setMs] = useState();
  const [products, setProducts] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOption, setSelectedOption] = useState({});
  const [categories, setCategories] = useState([]);
  const { fetchCartCount } = useContext(CartContext); // Use the context function
  const navigate = useNavigate();
  let id = "6667454f926ecee4d29cac2d";

  const [menuOpen, setMenuOpen] = useState(false);
  const [showHubs, setShowHubs] = useState(false);
  // const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // const { fetchCartCount } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("ALL PRODUCTS");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [reload, setReload] = useState(false);
  const location = useLocation();
  const [shouldReload, setShouldReload] = useState(false);
  const [productload, setProductload] = useState(false);
  const modalRef = useRef(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartData, setCartData] = useState({});

  const token = localStorage.getItem("Token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Set a delay to simulate loading time
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProduct();
        const loadedProducts = res.data.products;
        setProducts(loadedProducts);

        // Set default selected options
        const defaultOptions = {};
        loadedProducts.forEach((product) => {
          let options;
          if (product.itemBehaviour === "KG") {
            const pricePerGram = product.price / 1000;
            options = [
              {
                unit: "100",
                unitType: "G",
                price: `₹${(pricePerGram * 100).toFixed(2)}`,
              },
              {
                unit: "250",
                unitType: "G",
                price: `₹${(pricePerGram * 250).toFixed(2)}`,
              },
              {
                unit: "500",
                unitType: "G",
                price: `₹${(pricePerGram * 500).toFixed(2)}`,
              },
              {
                unit: "1",
                unitType: "KG",
                price: `₹${(pricePerGram * 1000).toFixed(2)}`,
              },
            ];
            defaultOptions[product._id] = options[3];
          } else {
            options = [
              { unit: "1", unitType: "PACK", price: `₹${product.price}` },
            ];
            defaultOptions[product._id] = options[0];
          }
          // setLoading(false);
        });

        setSelectedOption(defaultOptions);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [productload]);

  useEffect(() => {
    findUniqueCategory().then((res) => {
      setCategories(res?.data?.categories);
    });
  }, [reload]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    // fetchCategoryData(category.categoryName).then((res) => {
    //   // Handle the response data as needed
    //   console.log('Category Data:', res);
    // });
  };

  const handleSubCategoryClick = (categoryName, subCategoryName) => {
    // fetchSubCategoryData(categoryName, subCategoryName).then((res) => {
    //   // Handle the response data as needed
    //   console.log('SubCategory Data:', res);
    // });
  };

  const handleCategoriesClick = () => {
    setShowHubs(!showHubs);
  };

  const handleCartAdd = (productId) => {
    setOpenDropdown(openDropdown === productId ? null : productId);
  };

  const handleCart = async (productId) => {
    if (selectedOption[productId]) {
      try {
        if (!token) {
          navigate("/login-signup");
        } else {
          const res = await addCart(productId, id, selectedOption[productId]);
          if (res?.status === 200) {
            fetchCartCount(); // Fetch and update the cart count
            message.success("Added into cart");
            setCartProducts((prev) => [...prev, productId]);
            setCartData((prevCartData) => ({
              ...prevCartData,
              [productId]: res.data, // Update the cart data state with the response data
            }));
          }
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    }
  };

  const handleIncrement = async (productId, unit, unitType) => {
    try {
      setReducing(true); // Optionally set a state to show loading or processing state
      setMs("Increasing.."); // Optionally set a message or state to indicate operation
      const res = await cartIncrement(productId, unit, unitType, id); // Assuming cartIncrement is an async function
      if (res?.status === 200) {
        message.success("Added into cart");
        setReducing(false); // Reset the loading state
        setMs(""); // Clear any message state if needed
        setCartData((prevCartData) => ({
          ...prevCartData,
          [productId]: res.data, // Update the cart data state with the response data
        }));
        // Optionally update local state or perform other actions upon success
        setCount(count + 1); // Update count state or any other local state
      }
    } catch (error) {
      setReducing(false); // Reset loading state on error
      setMs(""); // Clear any message state if needed
      // Handle errors or show error message to the user
    }
  };

  const handleDecrement = async (productId, unit, unitType) => {
    try {
      setReducing(true); // Optionally set a state to show loading or processing state
      setMs("Reducing.."); // Optionally set a message or state to indicate operation
      const res = await cartDecrement(productId, unit, unitType, id); // Assuming cartDecrement is an async function
      if (res?.status === 200) {
        message.success("reduced from the cart");

        setReducing(false); // Reset the loading state
        setMs(""); // Clear any message state if needed
        setCartData((prevCartData) => ({
          ...prevCartData,
          [productId]: res.data, // Update the cart data state with the response data
        }));
        // Optionally update local state or perform other actions upon success
        setCount(count - 1); // Update count state or any other local state
      } else if (res?.status === 202) {
        message.success("product has removed from the cart");

        setCartData((prevCartData) => {
          const updatedCartData = { ...prevCartData };
          delete updatedCartData[productId];
          return updatedCartData;
        });
        setCartProducts((prevCartProducts) =>
          prevCartProducts.filter((id) => id !== productId)
        );

        setReload(!reload);
      }
    } catch (error) {
      setReducing(false); // Reset loading state on error
      setMs(""); // Clear any message state if needed
      // Handle errors or show error message to the user
    }
  };

  const handleOptionSelect = (productId, option) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [productId]: option,
    }));
    setOpenDropdown(null);
  };

  const handleCategoryProduct = (tabId, category) => {
    setActiveTab(tabId);
    categoryproducts(category).then((res) => {
      if (res.status === 200) {
        setProducts(res.data.products);
      } else {
        message.error(res.data.message);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="text-center ">
        <div className="md:flex gap-4 justify-between">
          <div>
            {/* <div className="m-2 p-2 px-4 bg-[#f4f6f8] text-[#747d88] rounded-full flex gap-2" onClick={handleCategoriesClick}>
              <p className="w-full whitespace-nowrap">Categories</p>
              <FaAngleDown className="p-1 text-2xl" />
            </div> */}
          </div>
          {showHubs && (
            <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div
                className="bg-white shadow-md rounded-md p-4 max-w-lg w-full"
                ref={modalRef}
              >
                <div className="bg-white flex">
                  <div className="w-1/2">
                    <div className="flex flex-col items-start text-xl font-normal gap-2 text-[#747d88]">
                      {categories?.map((category, index) => (
                        <button
                          key={index}
                          className="w-full text-left font-bold hover:text-[#63247d]"
                          onClick={() => handleCategoryClick(category)}
                        >
                          {category.categoryName}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2 pl-4">
                    {selectedCategory && (
                      <div>
                        <p className="font-bold">
                          {selectedCategory.categoryName}
                        </p>
                        <ul className="pl-4">
                          {selectedCategory.subCategory?.map(
                            (subCategory, subIndex) => (
                              <li
                                key={subIndex}
                                className="hover:text-[#63247d] cursor-pointer"
                                onClick={() =>
                                  handleSubCategoryClick(
                                    selectedCategory.categoryName,
                                    subCategory
                                  )
                                }
                              >
                                {subCategory}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {/* <button className="mt-4 p-2 bg-[#81c408] text-white rounded-md" onClick={handleCategoriesClick}>Close</button> */}
              </div>
            </div>
          )}




          <div className="overflow-auto">
      <div className="flex justify-start">
        {loading ? (
          // Show loading skeletons while categories are being loaded
          <>
            {Array(5).fill().map((_, index) => (
              <div className="pl-1" key={index}>
                <Skeleton height={40} width={120} style={{ margin: '8px 16px', borderRadius: '9999px' }} />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="pl-1">
              <button
                className={`m-2 p-2 px-4 bg-[#f4f6f8] flex text-[#747d88] rounded-full 
                      ${activeTab === "ALL PRODUCTS" ? "bg-[#63247d] text-white" : ""}
                    `}
                onClick={() => setActiveTab("ALL PRODUCTS")}
              >
                <span className="whitespace-nowrap">ALL PRODUCTS</span>
              </button>
            </div>
            {categories?.map((item, index) => {
              const tabId = `tab-${index + 1}`;
              return (
                <div className="pl-1" key={index}>
                  <button
                    className={`m-2 p-2 px-4 bg-[#f4f6f8] flex text-[#747d88] rounded-full 
                      ${activeTab === tabId ? "bg-[#63247d] text-white" : ""}
                    `}
                    onClick={() => handleCategoryProduct(tabId, item.categoryName)}
                  >
                    <span className="whitespace-nowrap">{item.categoryName}</span>
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
        </div>
      </div>





      <div className="px-4">
      <div className="py-2">
        <div className="w-full lg:px-20 flex flex-col">
          <div className="flex gap-6 justify-center flex-wrap items-center py-5 w-[100%]">
            {loading ? (
              // Show loading skeletons while data is being loaded
              Array(6).fill().map((_, index) => (
                <div
                  key={index}
                  className="relative w-90 h-full m bg-white rounded-t-2xl border-2 border-[#E8EFF2]"
                >
                  <div className="h-52">
                    <Skeleton height={200} width={320} />
                  </div>
                  <div className="p-4">
                    <Skeleton height={30} width={200} />
                    <Skeleton height={20} width={150} style={{ marginTop: 10 }} />
                    <Skeleton height={40} width={100} style={{ marginTop: 10 }} />
                    <Skeleton height={40} width={100} style={{ marginTop: 10 }} />
                  </div>
                </div>
              ))
            ) : (
              products.map((data, index) => {
                let options = [];
                if (data.itemBehaviour === "KG") {
                  const pricePerGram = data.price / 1000;
                  options = [
                    {
                      unit: "100",
                      unitType: "G",
                      price: `₹${(pricePerGram * 100).toFixed(2)}`,
                    },
                    {
                      unit: "250",
                      unitType: "G",
                      price: `₹${(pricePerGram * 250).toFixed(2)}`,
                    },
                    {
                      unit: "500",
                      unitType: "G",
                      price: `₹${(pricePerGram * 500).toFixed(2)}`,
                    },
                    {
                      unit: "1",
                      unitType: "KG",
                      price: `₹${(pricePerGram * 1000).toFixed(2)}`,
                    },
                  ];
                } else {
                  options = [
                    { unit: "1", unitType: "PACK", price: `₹${data.price}` },
                  ];
                }

                const selected = selectedOption[data._id] || options[0];

                return (
                  <div
                    key={index}
                    className="relative w-90 h-full m bg-white rounded-t-2xl border-2 border-[#E8EFF2]"
                  >
                    <LazyLoad height={200} offset={100} once>
                    <div className="h-52">
                      <div
                        className={`rounded-t-2xl h-full z-10 w-80 flex flex-col`}
                        onClick={() => navigate(`/product-details/${data._id}`)}
                        style={{
                          backgroundImage: `url(${data.productImageUrl})`,
                          backgroundPosition: "center",
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat", // Ensure the image doesn't repeat
                        }}
                      >
                        <div className="p-2 h-10 text-white m-2 bg-[#63247d] z-20 rounded-2xl w-32">
                          <p className="text-center ">{data.category}</p>
                        </div>
                      </div>
                    </div>
                      </LazyLoad>

                    <h1 className="text-black pt-2 pl-2 ml-1">
                      {data.productName}
                    </h1>
                    <div className="flex justify-between w-90 px-3">
                      <div className="flex items-center text-sm gap-2">
                        <p className="items-center text-[#989090] h-10 w-72">
                          {data?.brand ? data.brand : ""}
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-12 mt-2 px-3">
                      <div
                        className="w-full h-10 border-2 rounded-lg items-center px-2 flex justify-between"
                        onClick={() => handleCartAdd(data._id)}
                      >
                        <div className="flex gap-2">
                          <h1 className="text-[#989090]">
                            {selected.unit} {selected.unitType}
                          </h1>
                          <h1 className="text-[#989090]">{selected.price}</h1>
                        </div>
                        <FaAngleDown className="p-1 text-2xl text-[#696262]" />
                      </div>
                      {openDropdown === data._id && (
                        <div className="absolute left-0 right-0 bg-white border border-[#63247d] rounded-lg mt-2 p-4 z-50">
                          <div className="py-2 gap-3 flex flex-col">
                            {options.map((option, optionIdx) => (
                              <div
                                key={optionIdx}
                                className={`flex justify-between items-center border rounded-lg p-1 ${
                                  selectedOption[data._id] === option
                                    ? "border-[#63247d]"
                                    : "border-[#d3cdcd]"
                                }`}
                                onClick={() =>
                                  handleOptionSelect(data._id, option)
                                }
                              >
                                <div className="flex gap-3">
                                  <p>
                                    {option.unit} {option.unitType}
                                  </p>
                                  <p>{option.price}</p>
                                </div>
                                {selectedOption[data._id] === option && (
                                  <div className="bg-[#63247d] text-white rounded-lg px-2 py-1">
                                    ✓
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-full h-20 flex px-3 items-center gap-7">
                      <h1 className="pl-2 whitespace-nowrap items-center ">
                        {selected.price}
                      </h1>
                      <div
                        className="w-full h-10 border-2 rounded-lg items-center border-[#63247d] flex justify-center px-2 cursor-pointer"
                        onClick={() => handleCart(data._id)}
                      >
                        <p>Add</p>
                      </div>
                    </div>
                    <div className=" w-full flex justify-end">
                      {(cartProducts.includes(data._id) ||
                        cartData[data._id]) && (
                        <div className="w-60 h-10 flex px-3 items-center gap-7 justify-between mb-4 ">
                          <h1>
                            {cartData[data._id]?.existingProduct?.total ||
                              selected.price}
                          </h1>
                          <div
                            className="w-2/6 h-10 bg-red-600 flex items-center justify-center rounded-l-lg"
                            onClick={() =>
                              handleDecrement(
                                data._id,
                                selected.unit,
                                selected.unitType
                              )
                            }
                          >
                            <FaMinus />
                          </div>
                          <div className="w-2/6 h-full bg-white flex items-center justify-center">
                            {cartData[data._id]?.existingProduct?.quantity || 1}
                            {console.log(cartData[data._id], "klklklkk")}
                          </div>
                          <div
                            className="w-2/6 h-full bg-red-600 flex items-center justify-center rounded-r-lg"
                            onClick={() =>
                              handleIncrement(
                                data._id,
                                selected.unit,
                                selected.unitType
                              )
                            }
                          >
                            <FaPlus />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>

      <div
        className={`relative   ${products.length === 0 ? "top-96" : "top-52"}`}
      >
        <Footer />
      </div>
    </>
  );
}