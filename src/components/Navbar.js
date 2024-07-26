import React, { useEffect, useState, useRef, useContext } from "react";
import { FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { findUniqueCategory } from "../Api/category";
import { CartContext } from "../context/CartContext";
import { searchProduct } from "../Api/search";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../Api/redux-toolkit/slice/userReducer";
import logo from "../assets/images/logg0.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHubs, setShowHubs] = useState(false);
  const [setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { fetchCartCount } = useContext(CartContext);
  const [reload, setReload] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const modalRef = useRef(null);
  const { count } = useContext(CartContext); // Use the context to get the cart count
  const token = localStorage.getItem("Token");
  const {name} = useSelector((state) => state.userSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    findUniqueCategory().then((res) => {
      setCategories(res.data.categories);
    });
    fetchCartCount();
  }, [reload]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // const handleCategoriesClick = () => {
  //   setShowHubs(!showHubs);
  // };

  const handleLogout = () => {
    dispatch(setLogout());
    setMenuOpen(!menuOpen);
    localStorage.removeItem("Token");
    navigate("/home"); // Navigate to the login page or any other page after logout
  };

  // const handleCategoryClick = (category) => {
  //
  //   setSelectedCategory(category);

  //   // fetchCategoryData(category.categoryName).then((res) => {
  //   //   // Handle the response data as needed
  //   //
  //   // });
  // };

  // const handleSubCategoryClick = (categoryName, subCategoryName) => {

  //   // fetchSubCategoryData(categoryName, subCategoryName).then((res) => {
  //   //   // Handle the response data as needed
  //   // });
  // };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const res = await searchProduct(searchQuery);
        setSearchResults(res.data.products);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    handleSearch();
  };

  const handleResultClick = (productId) => {
    const currentUrl = `/product-details/${productId}`;

    const reloadUrl = `${currentUrl}?reload=${new Date().getTime()}`;
    navigate(reloadUrl);
    setSearchResults([]);
    navigate(`/product-details/${productId}`);
    setShouldReload(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (showHubs) {
        setShowHubs(false);
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowHubs(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showHubs]);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="w-full h-20 flex justify-between md:px-14 px-4 font-sans font-semibold items-center ">
        <div>
        <img
          src={logo}
          alt="Pickupiko"
          className="h-8 md:h-12 w-28" // Adjust height based on text-3xl and text-5xl
        />
      {name &&  <p className="text-xl font-semibold text-black">{name}</p>}


        </div>


        <div className="flex gap-5 overflow-auto invisible md:visible md:static absolute md:mx-10">
          <div
            className="active text-[#747d88] hover:text-[#63247d]"
            onClick={() => navigate("/home")}
          >
            Home
          </div>
          {/* <button className="nav-item nav-link text-[#747d88] hover:text-[#81c408]">Shop</button> */}
          <div
            className="nav-item nav-link text-[#747d88] hover:text-[#63247d]"
            onClick={() => {
              if (token) {
                navigate("/order-Details");
              } else {
                navigate("/login-signup");
              }
            }}
          >
            Order Detail
          </div>
          <div
            className="nav-item nav-link text-[#747d88] hover:text-[#63247d]"
            onClick={() => navigate("/e-coin")}
          >
            E-coins
          </div>
        </div>
        <div className="flex m-3 mr-0 gap-2">
          <div className="relative w-full border-2 border-[#63247d] rounded-lg flex justify-between lg:visible invisible">
            <input
              type="search"
              className="rounded-lg outline-none w-full p-2"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search.."
            />
            <div className="hover:bg-[#63247d] p-2" onClick={handleSearch}>
              <FaSearch className="text-xl" />
            </div>
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-[#ffb524] rounded-lg mt-2 p-4 z-50">
                <ul>
                  {searchResults.map((result) => (
                    <li
                      key={result._id}
                      className="cursor-pointer hover:bg-gray-200 p-2"
                      onClick={() => handleResultClick(result._id)}
                    >
                      {result.productName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="relative p-2" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="text-[#63247d] text-2xl md:text-3xl" />
            <span
              className="absolute bg-slate-500 rounded-full flex items-center justify-center text-dark text-xs"
              style={{
                top: "-5px",
                left: "15px",
                height: "20px",
                minWidth: "20px",
              }}
            >
              {count}
            </span>
          </div>
          {!token && (
            <div
              className="p-2 visible md:invisible md:absolute static"
              onClick={() => {
                navigate("/login-signup");
              }}
            >
              <FaUser className="text-[#63247d]  visible md:invisible md:absolute static text-2xl md:text-3xl" />
            </div>
          )}
          {!token && (
            <div
              className="p-2 text-sm md:text-md bg-black text-white  rounded-xl whitespace-nowrap invisible md:visible md:static absolute"
              onClick={() => {
                navigate("/login-signup");
              }}
            >
              Login/sign up
            </div>
          )}
          <div
            className={`flex text-[#63247d] text-2xl md:text-3xl visible md:invisible md:absolute static border-4 rounded-xl active:border-gray-700 p-2 items-center text-center focus:outline-none focus:ring`}
          >
            <div onClick={handleMenuToggle} className="text-center">
              <AiOutlineMenu />
            </div>
            {menuOpen && (
              <div>
                <div className="bg-white shadow-md rounded-md p-2 absolute top-16 right-2 left-2">
                  <div className="bg-white">
                    <div className="flex flex-col items-start text-xl md:text-2xl font-normal gap-2 text-[#747d88]">
                      <div
                        className="nav-link active hover:text-[#63247d]"
                        onClick={() => {
                          navigate("/home");
                        }}
                      >
                        Home
                      </div>
                      {/* <button className="nav-link hover:text-[#81c408]">Shop</button> */}
                      <div
                        className="nav-link hover:text-[#63247d]"
                        onClick={() => {
                          if (token) {
                            navigate("/order-Details");
                          } else {
                            navigate("/login-signup");
                          }
                        }}
                      >
                        Order Detail
                      </div>
                      <div
                        className="nav-link hover:text-[#63247d]"
                        onClick={() => navigate("/e-coin")}
                      >
                        E-coin
                      </div>
                      {token && (
                        <div
                          className="nav-item nav-link hover:text-[#63247d]"
                          onClick={handleLogout}
                        >
                          Logout
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w h-10 flex justify-between md:px-14 px-4 font-sans mb-2 font-semibold items-center visible md:invisible md:absolute static">
        <div className="w-full border-2 border-[#63247d] rounded-lg flex justify-between pl-2">
          <input
            type="search"
            value={searchQuery}
            placeholder="Search..."
            onChange={handleInputChange}
            className="rounded-lg outline-none w-full"
          />
          <div className="hover:bg-[#63247d] p-2 " onClick={handleSearch}>
            <FaSearch className="text-xl" />
          </div>
          {searchResults.length > 0 && (
            <div className=" mx-4 absolute top-32 left-0 right-0 bg-white border border-[#63247d] rounded-lg mt-2 p-4 z-50">
              <ul>
                {searchResults.map((result) => (
                  <li
                    key={result._id}
                    className="cursor-pointer hover:bg-gray-200 p-2"
                    onClick={() => handleResultClick(result._id)}
                  >
                    {result.productName}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
