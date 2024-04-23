import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./indexmapstyles.css";
import LocationSwitcher from "../form/LocationSwitcher";
import { Link } from "react-router-dom";
import supercluster from "supercluster";

const Map: React.FC = () => {
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZW1tYWJlcmciLCJhIjoiY2xyeXZlaXM1MWtwOTJxbzZla2htZG13byJ9.6_pAhXgRmp5mGg2r29Q8iA";

    const map = new mapboxgl.Map({
      container: "index-map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [10.391679, 63.405329],
      zoom: 11.2,
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
            {
              type: "Feature",
              properties: {
                description: "Quality Hotel Prinsen",
              },
              geometry: {
                type: "Point",
                coordinates: [10.391205, 63.430863],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "P-Hotels Brattøra",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39624, 63.436001],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Britannia Hotel",
              },
              geometry: {
                type: "Point",
                coordinates: [10.398753, 63.43171],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Radison Blu Royal Garden Hotel Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.40534, 63.433639],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Scandic Nidelven",
              },
              geometry: {
                type: "Point",
                coordinates: [10.406703, 63.435788],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Clarion Hotel & Congress Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.4022, 63.43984],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Nidaros Pilegrimsgård",
              },
              geometry: {
                type: "Point",
                coordinates: [10.4004, 63.42663],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Comfort Hotel Park, Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39253, 63.42778],
              },
            },
            {
              type: "Feature",
              properties: {
                description:
                  "City Living Schøller Hotell & Apartments, Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39555, 63.4321],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Pensjonat Jarlen",
              },
              geometry: {
                type: "Point",
                coordinates: [10.3892, 63.43073],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Trondheim Vandrerhjem",
              },
              geometry: {
                type: "Point",
                coordinates: [10.42456, 63.43377],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Chesterfield Hotel",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39972, 63.4344],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Quality Hotel Panorama, Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.37467, 63.35921],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Thon Hotel Nidaros",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39962, 63.43397],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "City Living Sentrum Hotel & Apartments",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39679, 63.43378],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Comfort Hotel Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.40207, 63.43292],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Thon Hotel Trondheim",
              },
              geometry: {
                type: "Point",
                coordinates: [10.3927, 63.43042],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Best Western Plus Hotel Bakeriet",
              },
              geometry: {
                type: "Point",
                coordinates: [10.40263, 63.43397],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Hotell St Olav",
              },
              geometry: {
                type: "Point",
                coordinates: [10.39162, 63.42164],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Best Western Stav Hotel",
              },
              geometry: {
                type: "Point",
                coordinates: [10.72858, 63.42466],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Clarion Collection Hotel Grand Olav",
              },
              geometry: {
                type: "Point",
                coordinates: [10.40343, 63.43402],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Trondheim Apartment Hotel",
              },
              geometry: {
                type: "Point",
                coordinates: [10.43279, 63.44038],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Sandmoen Bed & Breakfast",
              },
              geometry: {
                type: "Point",
                coordinates: [10.35677, 63.31143],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Karivollen overnatting",
              },
              geometry: {
                type: "Point",
                coordinates: [10.29576, 63.29571],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "Singsaker Sommerhotell",
              },
              geometry: {
                type: "Point",
                coordinates: [10.41328, 63.42423],
              },
            },
          ],
        },
        cluster: true, // Enable clustering
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 30, // Radius of each cluster when clustering points
      });

      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "places",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#322592",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            10,
            2,
            15,
            4,
            20,
            6,
            25,
            10,
            30,
          ],
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "places",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        },
        paint: {
          "text-color": "#ffffff", // Set text color to white
        },
      });

      map.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        filter: ["!", ["has", "point_count"]],
        paint: {
          "circle-color": "#322592",
          "circle-radius": 6,
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
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
