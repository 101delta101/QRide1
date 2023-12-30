import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import "./Map.css";

const DEFAULT_LATITUDE = 10.0261;
const DEFAULT_LONGITUDE = 76.3125;

const Map = () => {
    {/*const markers = [
        {
          geocode: [10.0284, 76.3109],
          popUp: "Edapally Toll"
        },
        {
          geocode: [, 2.3522],
          popUp: "Hello, I am pop up 2"
        },
        {
          geocode: [48.855, 2.34],
          popUp: "Hello, I am pop up 3"
        }
      ];*/}
  return (
    <MapContainer center={[DEFAULT_LATITUDE, DEFAULT_LONGITUDE]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        )) */}

    </MapContainer>
  );
};

export default Map;
