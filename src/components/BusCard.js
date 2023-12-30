// BusCard.js
import React from "react";
import heart_1 from "./Assets/heart.png";
import heart_3 from "./Assets/heart3.png";
import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { useBus } from "../context/BusProvider";

const BusCard = ({ bus, currentLocation, selectedDestination}) => {
  const [timeDifference, setTimeDifference] = useState("");
  const [whiteHeartVisible, setWhiteHeartVisible] = useState(true);
  const [redHeartVisible, setRedHeartVisible] = useState(false);
  const [busId, setBus_id] = useState();
  const {currentBusIds, setCurrentBusIds} = useBus();
  //console.log(bus.bus_id)


  const handleWhiteHeartClick = () => {
    setBus_id(bus.bus_id);
    setWhiteHeartVisible(false);
    setRedHeartVisible(true);
    //add to favourites table
    
    console.log(busId);
    const currentBusId = busId;
    addFavourite(currentBusId);
    setCurrentBusIds(prevData => [...prevData, currentBusId]);

        
    
  };

  const addFavourite = async (currentBusId) => {
    const {data, error } =  await supabase
    .from('busdetail')
    .update({ favourite: '1' })
    .eq('bus_id',currentBusId)
    //.select()
    //.eq("bus_id", currentBusId);
    if(data){
      console.log(data);
    }
   

  }
  const handleRedHeartClick = (bus) => {
    setWhiteHeartVisible(true);
    setRedHeartVisible(false);
    //delete from favourites table
  };
  
  useEffect(() => {
    const systemTime = new Date(); // Get current system time
    const busTimeFromDatabase = bus.timing || "HELLO"; // Replace this with your actual time from the database
    console.log(busTimeFromDatabase);
    const busTimeSplit = busTimeFromDatabase.split(":");
    const busTime = new Date();
    busTime.setHours(parseInt(busTimeSplit[0], 10));
    busTime.setMinutes(parseInt(busTimeSplit[1], 10));
    busTime.setSeconds(parseInt(busTimeSplit[2], 10));
  
    const differenceInMillis = busTime.getTime() - systemTime.getTime();
  
    if (differenceInMillis < 0) {
      // Bus has already left
      setTimeDifference(`Bus left at ${busTime.toLocaleTimeString()}`);
        } else {
      const hoursDifference = Math.floor(differenceInMillis / (1000 * 60 * 60));
      const minutesDifference = Math.floor(
        (differenceInMillis % (1000 * 60 * 60)) / (1000 * 60)
      );
  
      const formattedTimeDifference = `${
        hoursDifference >= 10 ? hoursDifference : "0" + hoursDifference
      }:${minutesDifference >= 10 ? minutesDifference : "0" + minutesDifference}`;
  
      setTimeDifference(`Bus arrives at ${formattedTimeDifference}`);
    }
  }, []);
  
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 w-[80rem] fle flex-col items-center justify-center">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          {/* <span className="text-sm text-gray-500">Bus ID: {bus.bus_id}</span> */}
          <span className="text-l text-gray-500">Bus Name: {bus.bus_name}</span>
        </div>
        <div className="text-green-600 font-bold text-xl">{timeDifference}</div>
        {/* <div className="text-sm">
          <div className="text-gray-500">duration</div>
          <div className="text-gray-500">departure_time</div>
        </div> */}
        <div className="flex flex-col items-start">
          {/* <span className="text-sm text-gray-500">date</span> */}
          <span className="text-sm text-gray-500">{currentLocation}</span>
        </div>
        <div className="flex flex-col items-start">
          {/* <span className="text-sm text-gray-500">bus_number</span> */}
          <span className="text-sm text-gray-500">{selectedDestination}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            {/* <span className="bg-green-200 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
              {bus.rating}
            </span> */}
            {/* <span className="text-sm text-gray-500">Fare</span> */}
          </div>
          <div className="text-green-600 font-bold text-xl">
            ₹{bus.price}/KM
          </div>
        </div>
        <div className="flex flex-col items-end">
          {whiteHeartVisible && (
            <img
              src={heart_3}
              alt="White Heart"
              onClick={handleWhiteHeartClick}
            />
          )}
          {redHeartVisible && (
            <img src={heart_1} alt="Red Heart" onClick={handleRedHeartClick} />
          )}
          <span className="text-sm text-gray-500">45 Seats</span>
          {/* <span className="text-sm text-gray-500"> single</span> */}
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center space-x-2">
          <i className="fas fa-wifi text-gray-400"></i>
          <i className="fas fa-utensils text-gray-400"></i>
          <i className="fas fa-glass-martini text-gray-400"></i>
          <i className="fas fa-toilet text-gray-400"></i>
          <i className="fas fa-charging-station text-gray-400"></i>
          <span className="text-sm text-blue-500 border border-blue-500 py-0.5 px-2 rounded">
            Safety+
          </span>
          <span className="text-sm text-blue-500 border border-blue-500 py-0.5 px-2 rounded">
            Live Tracking
          </span>
        </div>
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          BOOK NOW{" "}
        </button>
      </div>

      <div className="flex items-center justify-start space-x-4 mt-2">
        <span className="text-sm text-gray-500 cursor-pointer">Safety+</span>
        <span className="text-sm text-gray-500 cursor-pointer">Amenities</span>
        <span className="text-sm text-gray-500 cursor-pointer">Bus Photos</span>
        <span className="text-sm text-gray-500 cursor-pointer">
          Boarding & Dropping Points
        </span>
        <span className="text-sm text-gray-500 cursor-pointer">Reviews</span>
        <span className="text-sm text-gray-500 cursor-pointer">
          Booking policies
        </span>
      </div>
    </div>
  );
};

export default BusCard;
