import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

export default function Map() {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZW1tYWJlcmciLCJhIjoiY2xyeXZlaXM1MWtwOTJxbzZla2htZG13byJ9.6_pAhXgRmp5mGg2r29Q8iA";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // replace with your preferred style
      center: [10.389162, 63.428895], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      "Granåsen skistadion"
    );

    const marker1 = new mapboxgl.Marker()
      .setLngLat([10.312402, 63.376447])
      .setPopup(popup)
      .addTo(map);

    // Clean up the map when the component unmounts
    return () => map.remove();
  }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

  return (
    <div
      id="map"
      style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
    />
  );
}
