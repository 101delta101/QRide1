import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import qr_image from "../Assets/qr.png";

const Layout = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const qrImageStyles = {
    width: windowWidth <= 768 ? "80%" : "45%",
    height: "auto",
    marginBottom: "20px",
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-y-auto">
      <div className='flex w-full md:w-[55%] flex-shrink-0 h-full bg-green-200 flex-col justify-center items-center rounded-r-5xl'>
        <h1 className="font-poppins font-semibold md:font-bold text-6xl mb-20">QRide</h1>
        <img src={qr_image} alt="qr" style={qrImageStyles} />
      </div>

      <div className='flex flex-col flex-shrink-0 w-full md:w-[45%] h-full'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
