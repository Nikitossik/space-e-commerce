// import React from "react";

import GoogleMap from "google-map-react";

const greatPlaceStyle = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  zIndex: "100",
};

const AnyReactComponent = ({ text }) => (
  <div style={greatPlaceStyle}>{text}</div>
);

export const Map = () => {
  const defaultProps = {
    center: {
      lat: 48.429152,
      lng: 35.064802,
    },
    zoom: 14,
    marker: {
      lat: 48.429152,
      lng: 35.064802,
    },
  };

  const googleMapKey = import.meta.env.VITE_GOOGLE_MAP_KEY;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMap
        bootstrapURLKeys={{ key: googleMapKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMap>
    </div>
  );
};
