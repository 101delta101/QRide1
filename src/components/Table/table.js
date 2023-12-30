import React, { useEffect, useState } from "react";
import Layout1 from "../Layout1/layout1";
import supabase from "../../config/supabaseClient";
import BusCard from "../BusCard";
import { useBus } from "../../context/BusProvider";
import loadingSvg from "../Assets/loading.svg"
const Table = () => {
  const { currentLocation, selectedDestination, buses, setBuses } = useBus();
  const [loading, setLoading] = useState(true);

  // Function to get the stop ID from the Supabase database
  const getId = async (stopName) => {
    const { data, error } = await supabase
      .from("busstop")
      .select("stop_id")
      .eq("stop_name", stopName);

    if (error) {
      console.error(`Error fetching stop ID for ${stopName}: `, error);
      return null;
    }

    if (data && data.length > 0) {
      return data[0].stop_id;
    } else {
      console.warn(`No stop ID found for ${stopName}`);
      return null;
    }
  };

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        setLoading(true); // Set loading to true before fetching data

        const startId = await getId(currentLocation);
        const endId = await getId(selectedDestination);

        // Fetch route IDs based on start and end stop IDs
        const { data: busrouteids, error } = await supabase
          .from("busroutes")
          .select("id")
          .contains("busroutes", [startId, endId]);

        if (busrouteids && busrouteids.length > 0) {
          const routeIds = busrouteids.map((route) => route.id);

          // Fetch bus details for the obtained route IDs
          const { data: buslist, error } = await supabase
            .from("busdetail")
            .select()
            .in("bus_route", routeIds);

          if (buslist) {
            setBuses(buslist);
          }
          if (error) {
            console.error(error);
          }
        } else {
          console.error("Error fetching buses:", error);
          setBuses([]);
        }
      } catch (error) {
        console.error("Error fetching buses:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchBuses();
  }, [currentLocation, selectedDestination]);

  return (
    <Layout1>
      <div className="flex flex-col justify-center m-auto mt-[200]">
        {loading ? (
                  <img src={loadingSvg} alt="Loading..." />
        ) : buses.length > 0 ? (
          buses.map((bus) => (
            <BusCard
              key={bus.bus_id}
              bus={bus}
              currentLocation={currentLocation}
              selectedDestination={selectedDestination}
              className="bus-card w-full"
            />
          ))
        ) : (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">No buses found!</strong>
            <span className="block sm:inline"> We couldn't find any buses for your route.</span>
          </div>
        )}
      </div>
    </Layout1>
  );
};

export default Table;
