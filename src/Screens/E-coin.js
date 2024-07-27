import Navbar from "../components/Navbar";
import img from '../assets/images/fruite-item-5.jpg';


import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getdate } from "../Api/coin";
import coin from '../assets/images/GOLD.png';
import Silver from '../assets/images/SILVER.png';
import platinum from '../assets/images/PLATINUM.png';

export default function ECoin() {
    const [date, setDate] = useState('');
    const [coins, setCoins] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        getdate().then((res) => {
            if (res?.status === 200) {
                console.log(res,';;');
                setDate(res.data.date);
                setCoins(res.data.client)
            }
        });
    }, []);

    console.log(date,'6-6-6-6-');


    return (
        <div className="">
            <Navbar />
            <div
                className="container-fluid page-header h-28 py-5"
                style={{
                    backgroundImage: `url(${img})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
                <h1 className="text-center text-white text-6xl">E-coin</h1>
                <ol className="breadcrumb justify-center flex mb-0 text-white text-2xl gap-5">
                    <li className="breadcrumb-item">
                        <div
                            className="text-[#63247d] font-bold"
                            onClick={() => navigate("/home")}
                        >
                            Home /
                        </div>
                    </li>
                    <li className="breadcrumb-item active">E-coin</li>
                </ol>
            </div>
            

            <div className="flex items-center justify-center h-[500px] ">
                
                <div className="text-center">
                <div className="py-15 flex justify-center">
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
                {date ?<>  <p className="text-2xl font-semibold mb-4">You can collect this coin's money on</p>
                    <p className="text-4xl font-bold text-[#63247d]">{date}</p></> :"Now you are not given a date to receive your coins"}
                </div>
            </div>

        </div>
    );
}
