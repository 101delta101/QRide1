// Layout1.js
import React, { useState, useEffect } from "react";
import "./layout1.css";
import home_image from "../Assets/home.png";
import heart_image from "../Assets/favourite.png";
import scan_image from "../Assets/qrcode.png";
import user_image from "../Assets/profile.png";
import { useNavigate } from "react-router-dom";
import bg_image from "../Assets/bg.png";
import supabase from "../../config/supabaseClient";
import PayPal from "../PayPal"; // Import the PayPal component

const Layout1 = ({ children }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
    credits: 0, // Assuming you have a credits field in your user data
  });
  const [checkout, setCheckOut] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (user) {
          setUserData({
            email: user.email,
            name: user.user_metadata.name,
          });

          const userId = user.id;
          const { data: namedata, error: nameerror } = await supabase
            .from("user_details")
            .select("first_name, last_name")
            .eq("user_id", userId);

          if (nameerror) {
            throw nameerror;
          }

          if (namedata) {
            setUserData((prevData) => ({
              ...prevData,
              first_name: namedata[0].first_name,
              last_name: namedata[0].last_name,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchuser();
  }, []);

  const navigateToHome = () => {
    navigate("/");
  };

  const navigateToQr = () => {
    navigate("/QR");
  };

  const navigateToFav = () => {
    navigate("/Fav");
  };

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  return (
    <div className="bg-[#c9e9e1]">
      <div className="bg-image">
        <img src={bg_image} alt="Background" />
      </div>
      <div className="row">
        <div
          className="user-info"
          onMouseEnter={openUserModal}
          onMouseLeave={closeUserModal}
        >
          <img src={user_image} alt="User" className="user-icon" />
        </div>
        <div className="container">
          <div className="icons">
            <img
              src={home_image}
              onClick={navigateToHome}
              className="icon"
              alt="Home"
            />
            <img
              src={scan_image}
              onClick={navigateToQr}
              className="icon"
              alt="QR Code"
            />
            <img
              src={heart_image}
              onClick={navigateToFav}
              className="icon"
              alt="Favorite"
            />
          </div>
        </div>
        {isUserModalOpen && (
          <div
            className="user-modal"
            onMouseEnter={openUserModal}
            onMouseLeave={closeUserModal}
          >
            <p>
              {userData.first_name} {userData.last_name}
            </p>
            <p>{userData.email}</p>
            <p>Credits: {userData.credits}</p>
            <div className="pay">
              {checkout ? (
                <PayPal />
              ) : (
                <button className="paybutton"
                  onClick={() => {
                    setCheckOut(true);
                  }}
                >
                  Buy Credits
                </button>
              )}
              <button onClick={() => supabase.auth.signOut()}>Logout</button>
            </div>
          </div>
        )}
        <div
          className="right-container"
          style={{
            margin: "auto",
            marginTop: "8rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout1;
