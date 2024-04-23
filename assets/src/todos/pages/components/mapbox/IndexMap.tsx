import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./indexmapstyles.css";
import LocationSwitcher from "../form/LocationSwitcher";
import { Link } from "react-router-dom";

const Map: React.FC = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZW1tYWJlcmciLCJhIjoiY2xyeXZlaXM1MWtwOTJxbzZla2htZG13byJ9.6_pAhXgRmp5mGg2r29Q8iA";

    const map = new mapboxgl.Map({
      container: "index-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [10.391679, 63.405329],
      zoom: 11,
    });

    map.on("load", () => {
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description: "Scandic Lerkendal",
              },
              geometry: {
                type: "Point",
                coordinates: [10.403216, 63.411465],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Scandic Solsiden",
              },
              geometry: {
                type: "Point",
                coordinates: [10.414301, 63.434765],
              },
            },
          ],
        },
      });

      map.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        paint: {
          "circle-color": "#322592",
          "circle-radius": 6,
          // 'circle-stroke-width': 0,
          //  'circle-stroke-color': '#ffffff'
        },
      });

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mouseenter", "places", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Få popupens bredde og høyde
        const popupWidth = 0; // juster denne verdien etter behov
        const popupHeight = 780; // juster denne verdien etter behov

        // Beregn offset for å plassere popupen rett over punktet
        const offset = [-(popupWidth / 2), -popupHeight];

        popup
          .setLngLat(coordinates)
          .setHTML(description)
          .setOffset(offset)
          .addTo(map);
      });

      // Lukk popupen når musen forlater punktet
      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    // Clean up
    return () => map.remove();
  }, []);

  const instructions = document.getElementById("instructions");
  /*
    const steps = data.legs[0].steps;

    let tripInstructions = '';
    for (const step of steps) {
    tripInstructions += `<li>${step.maneuver.instruction}</li>`;
    }
    */

  return (
    <>
      <div
        id="index-map"
        style={{ width: "100%", height: "750px", top: 88 }}
      ></div>
      <div id="index-instructions">
        <h3>Hvor vil du reise?</h3>
        <p id="map_p">
          Hold over punktene i kartet for å finne navn på hotellene
        </p>

        <LocationSwitcher />
        <Link to="/reiseplanlegger">
          <button id="search_button">Se reiseruter</button>
        </Link>
      </div>
    </>
  );
};

export default Map;
