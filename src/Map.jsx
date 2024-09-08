import React, { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import ThreeSistersElevationChart from "./components/Elevation";
import WeatherApp from "./components/Weather";
import MtnSelection from "./components/MtnSelection";

function MapView() {
  const [mapInfo, setMapInfo] = useState({ tilt: 65, lat: 44.1206495810377, lng: -121.73174145920665 });
  const position = { lat: mapInfo.lat, lng: mapInfo.lng };
  const marker = {lat: 44.1001, lng: -121.749};
  const mapOptions = {
    Center: position,
    Zoom: 12,
    heading: 231,
    tilt: 65,
    UI: true,
    type: "terrain",
  };
  
  const handleMapChange = (e) => {
    let mapCoordinates = e.map.center;
    console.log(e.map);
    setMapInfo({
      tilt: e.map.tilt,
      lat: mapCoordinates.lat(),
      lng: mapCoordinates.lng()
    })
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
      <div className="map-Container" style={{ height: "100vh", position: "relative" }}>
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultCenter={mapOptions.Center}
          defaultZoom={mapOptions.Zoom}
          defaultHeading={mapOptions.heading}
          defaultTilt={mapOptions.tilt}
          mapTypeId={mapOptions.type}
          disableDefaultUI={mapOptions.UI}
          onDrag={handleMapChange}
        >
          <Marker position={marker} />
        </Map>
        <MtnSelection onSelectPoint={(point) => console.log(point)} />
        <ThreeSistersElevationChart />
        <WeatherApp />
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          padding: '5px',
          borderRadius: '3px',
          fontSize: '12px'
        }}>
          Tilt: {mapInfo.tilt}° | Lat: {mapInfo.lat} | Lng: {mapInfo.lng}
        </div>
      </div>
    </APIProvider>
  );
}

export default MapView;
