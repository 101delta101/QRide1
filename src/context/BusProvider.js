import React, { useState, createContext, useContext } from "react";

const BusContext = createContext({});

export const BusProvider = ({ children }) => {
  const [buses, setBuses] = useState([{}]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentBusIds, setCurrentBusIds] = useState([]);

  const value = {
    buses,
    setBuses,
    selectedDestination,
    setSelectedDestination,
    currentLocation,
    setCurrentLocation,
    currentBusIds,
    setCurrentBusIds,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};

export const useBus = () => {
  return useContext(BusContext);
};
