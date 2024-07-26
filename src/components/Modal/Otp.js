import React, { useEffect, useState } from "react";
import OtpInput from "react18-input-otp";
import { postlogin, verifyOtp } from "../../Api/Login";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../Api/redux-toolkit/slice/userReducer";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Otp({ mailOrPhone, inputValue, setOtp, handleLogin,name }) {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const reduxstate = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [load]);

  const handleChange = (otp) => setCode(otp);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if()
      const res = await verifyOtp(code, inputValue, mailOrPhone,name);
      if (res.status === 200) {
        localStorage.setItem("Token", res.data.token);
        dispatch(
          setLogin({
            ...reduxstate,
            id: res.data.id,
            token: res.data.token,
            name: res.data.name,
            
          })
        );
        navigate("/home");
      }
      if (res.status === 202) {
        setMsg("Invalid otp");
        setCode("");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    }
  };

  const resetOtp = async () => {
    setCode("");
    setTimer(30);
    setCanResend(false);
    try {
      const res = await postlogin(inputValue, mailOrPhone);
      if (res.status === 200) {
        setOtp(true);
        setLoad(!load);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMsg("An error occurred during login.");
    }
    // Logic to resend OTP can be added here
  };

  return (
    <div className="w-full h-full">
      <div className="flex h-[500px] items-center justify-center mx-4 md:mx-12 my-3">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl text-white flex flex-col bg-[#6d208f] bg-opacity-25 border h-72 border-[#360c48] rounded-3xl"
        >
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full flex flex-col justify-center text-center">
              <h1 className="m-8 text-blue-950 font-bold">ENTER YOUR OTP</h1>
              <div className="flex w-full justify-center">
                <OtpInput
                  value={code}
                  onChange={handleChange}
                  numInputs={6}
                  separator={<span style={{ width: "8px" }}></span>}
                  isInputNum={true}
                  shouldAutoFocus={true}
                  inputStyle={{
                    border: "1px solid transparent",
                    borderRadius: "8px",
                    width: "40px",
                    height: "40px",
                    fontSize: "12px",
                    color: "#000",
                    fontWeight: "400",
                    caretColor: "blue",
                  }}
                  inputContainerStyle={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
              </div>
              <div className="flex justify-between  px-10 items-center mt-2">
                <div
                  type="button"
                  onClick={resetOtp}
                  className={`text-white hover:underline ${
                    canResend ? "" : "cursor-not-allowed text-gray-500"
                  }`}
                  disabled={!canResend}
                >
                  Reset OTP
                </div>
                <span className="text-blue-950 font-bold">{timer}s</span>
              </div>
              <div className="flex justify-between  px-10 items-center mt-2">
                <h1 className={`text-red-500 font-bold  text-sm `}>
                  {msg && msg}
                </h1>
              </div>
              <div className="flex justify-center items-center mt-2 mb-2">
                <div
                  type="button"
                  onClick={() => setOtp(false)}
                  className="text-white hover:underline flex items-center"
                >
                  <AiOutlineArrowRight className="mr-2" />
                  Change Number
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[30%] rounded-3xl">
            <button
              type="submit"
              className=" text-[#63247d] hover:text-white hover:bg-[#63247d] border-[#63247d] border-2  focus:ring-4 focus:outline-none  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
