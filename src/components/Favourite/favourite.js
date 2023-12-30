import React from 'react';
import Layout1 from '../Layout1/layout1';
import { useBus } from '../../context/BusProvider';
import BusCard from '../BusCard.js';

const Favourite = () => {
    const {currentBusIds} = useBus();
    const { currentLocation, selectedDestination, buses, setBuses } = useBus();
    const filteredBuses = buses.filter(bus => currentBusIds.includes(bus.bus_id));
  return (
    <div>
    <Layout1>
        <div className="flex flex-col justify-center m-auto mt-[200]">
        {/* Check if there are any buses to display */}
        {filteredBuses.length > 0 ? (
          // If buses exist, map through them and render BusCard for each
          filteredBuses.map((bus) => (
            <BusCard 
              key={bus.bus_id} 
              bus={bus} 
              currentLocation={currentLocation} 
              selectedDestination={selectedDestination} 
              className="bus-card w-full" 
            />
          ))
        ) : (
          // If no buses are found, render a message instead
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">No buses found!</strong>
            <span className="block sm:inline"> We couldn't find any favourite buses for your route.</span>
          </div>
        )}
      </div>
        
    </Layout1>
    </div>
  )
}

export default Favourite