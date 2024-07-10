import Navbar from "../components/Navbar";
import img from "../assets/images/fruite-item-5.jpg";
import { useNavigate } from "react-router-dom";



export default function ErrorScreen(){

    const navigate = useNavigate()
  return(
    <>
    <Navbar />
    <div
          className="container-fluid page-header h-28 py-5  "
          style={{
            backgroundImage: `url(${img})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <h1 className="text-center text-white text-6xl ">Cart</h1>
          <ol className="breadcrumb justify-center flex mb-0 text-white text-2xl gap-5">
            <li className="breadcrumb-item">
              <button
                className="text-[#81c408] font-bold"
                onClick={() => navigate("/home")}
              >
                Home
              </button>
            </li>

            <li className="breadcrumb-item active ">/ pages / 404</li>
          </ol>
        </div>
        <div className="container  py-10 md:mx-20 mx-2">
      <div className="text-center py-20 flex justify-center">
        <div className="flex justify-center">
          <div className="lg:w-1/2">
            <i className="bi bi-exclamation-triangle text-9xl text-gray-500"></i>
            <h1 className="text-9xl">404</h1>
            <h1 className="mb-4 text-4xl">Page Not Found</h1>
            <p className="mb-4 text-lg">We’re sorry, the page you have looked for does not exist on our website! Maybe go to our home page or try to use a search?</p>
            <button className=" rounded-full px-4 py-2 mb-4   text-[#63247d] font-bold text-2xl border-2 border-[#63247d] text-center items-center align-middle" onClick={()=>navigate('/home')}>Go Back To Home</button>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}