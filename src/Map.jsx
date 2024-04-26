import React from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function MapView() {
  const position = { lat: 44.1001, lng: -121.749 };
  const mapOptions = {
    Center: position,
    Zoom: 12,
    heading: 15,
    tilt: 65,
    UI: true,
    type: "terrain",
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_API_KEY}>
      <div className="map-Container" style={{ height: "100vh" }}>
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultCenter={mapOptions.Center}
          defaultZoom={mapOptions.Zoom}
          defaultHeading={mapOptions.heading}
          defaultTilt={mapOptions.tilt}
          mapTypeId={mapOptions.type}
          disableDefaultUI={mapOptions.UI}
        >
          <Marker position={position} />
        </Map>
      </div>
    </APIProvider>
  );
}

export default MapView;
