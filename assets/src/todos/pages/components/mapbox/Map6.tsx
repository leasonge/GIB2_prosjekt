import React, { useEffect, useState } from "react";
import mapboxgl, { GeoJSONSource, LngLatLike } from "mapbox-gl";
import "./mapstyles.css";
import TravelMethod from "../form/TravelMethod";
import * as turf from "@turf/turf"; // Import Turf.js
import LocationSwitcher from "../form/LocationSwitcher";

import { FaWalking } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { MdDirectionsBike } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import TravelDatePicker from "../form/DatePicker";
import LocationSwitcher2 from "../form/LocationSwitcher2";

export default function Map() {
  const [tripDuration, setTripDuration] = useState<number | null>(null);
  const [tripDistance, setTripDistance] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"walk" | "bike" | "bus">(
    "bus"
  );
  const [methodText, setMethodText] = useState<string>("walking");
  const [closestBusStopCoordinates, setClosestBusStopCoordinates] =
    useState<LngLatLike | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const [start, setStart] = useState<any[]>([10.398753, 63.43171]); // Default start coordinates
  const [end, setEnd] = useState<any[]>([10.312402, 63.376447]); // Default end coordinates
  const [startName, setStartName] = useState<string>(""); // Add this
  const [endName, setEndName] = useState<string>(""); // And this

  const handleButtonClick = () => {
    setIsPressed((prevState) => !prevState);

    // Save data to local storage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    console.log("Current favorites before update:", favorites);

    if (!isPressed) {
      // Add to favorites
      favorites.push({ startName, endName, selectedMethod });
      console.log("Added to favorites:", {
        startName,
        endName,
        selectedMethod,
      });
    } else {
      // Remove from favorites
      const index = favorites.findIndex(
        (fav) =>
          fav.startName === startName &&
          fav.endName === endName &&
          fav.selectedMethod === selectedMethod
      );
      if (index !== -1) {
        favorites.splice(index, 1);
        console.log("Removed from favorites:", {
          startName,
          endName,
          selectedMethod,
        });
      }
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZW1tYWJlcmciLCJhIjoiY2xyeXZlaXM1MWtwOTJxbzZla2htZG13byJ9.6_pAhXgRmp5mGg2r29Q8iA";

    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // replace with your preferred style
      center: [10.39032, 63.41212], // starting position [lng, lat]
      zoom: 11, // starting zoom
    });

    async function initializeMap() {
      let walkingRoute, drivingRoute;
      let totalDuration = 0;
      let totalDistance = 0;

      if (selectedMethod === "bus") {
        const closestBusStop = findClosestBusStop(start);
        setClosestBusStopCoordinates(
          closestBusStop.geometry.coordinates as LngLatLike
        );

        walkingRoute = await getRoute(
          start,
          closestBusStop.geometry.coordinates,
          "walking"
        );
        drivingRoute = await getRoute(
          closestBusStop.geometry.coordinates,
          end,
          "driving"
        );

        // Calculate total duration and distance
        totalDuration += walkingRoute.duration;
        totalDistance += walkingRoute.distance;
        totalDuration += drivingRoute.duration;
        totalDistance += drivingRoute.distance;

        map.addLayer({
          id: "bus-stop",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: closestBusStop.geometry.coordinates,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 7,
            "circle-color": "#322592", // Color for bus stop marker
          },
        });
      } else {
        walkingRoute = await getRoute(start, end, methodText);

        totalDuration = walkingRoute.duration;
        totalDistance = walkingRoute.distance;
      }

      map.addLayer({
        id: "start-point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 7,
          "circle-color": "#3C6835", // Color for start point marker
        },
      });

      map.addLayer({
        id: "end-point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: end,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 7,
          "circle-color": "#D12828", // Color for end point marker
        },
      });

      setTripDuration(Math.floor(totalDuration / 60));
      setTripDistance(totalDistance / 1000);

      addRouteLayer(map, "walking", walkingRoute.geometry.coordinates);

      if (selectedMethod === "bus") {
        addRouteLayer(map, "driving", drivingRoute.geometry.coordinates);
      }
    }

    map.on("load", initializeMap);

    return () => map.remove();
  }, [selectedMethod, methodText, start, end]);

  const findClosestBusStop = (start: any[]): turf.Feature<turf.Point> => {
    const busStops: turf.FeatureCollection<turf.Point> = turf.featureCollection(
      [
        turf.point([10.393739, 63.43191]), // Dronningens Gate
        turf.point([10.392114, 63.43119]), // Prinsens Gate P2
        turf.point([10.400269, 63.438577]), // Hurtigbåtterminalen
        turf.point([10.39593, 63.4033]), // Bratsbergvegen
        turf.point([10.407245, 63.432389]), // Bakkegata
        turf.point([10.426798, 63.437044]), // Buran
        turf.point([10.416334, 63.427876]), // Festningata
        turf.point([10.407573, 63.416935]), // Gløshaugen
        turf.point([10.35368, 63.33024]), // Sandmoen E6
        turf.point([10.444617, 63.409503]), // Voll studentby
        turf.point([10.371848, 63.429693]), // Skansen
        turf.point([10.367634, 63.429236]), // Ila
        turf.point([10.37424, 63.36134]), // City Syd E6
        turf.point([10.400111, 63.433685]), // Søndre Gate
        turf.point([10.72972, 63.42407]), // Stav
        turf.point([10.413494, 63.43403]), // Solsiden
        turf.point([10.399042, 63.41174]), // Lerkendal
        turf.point([10.419624, 63.430483]), // Gyldenløves Gate
        turf.point([10.393375, 63.425805]), // Nidarosdomen
        turf.point([10.404815, 63.399141]), // Nidarvoll skole
        turf.point([10.404167, 63.420853]), // Høgskoleringen
        turf.point([10.413246, 63.422706]), // Jonsvannsveien
        turf.point([10.445192, 63.428598]), // Tyholtveien
        turf.point([10.450099, 63.437218]), // Dalen Hageby
        turf.point([10.395042, 63.420861]), // Olav ækyrres Gate
        turf.point([10.427586, 63.422063]), // Strinda Videregående
        turf.point([10.386658, 63.430301]), // Kongens Gate
        turf.point([10.397803, 63.433293]), // Olav Trygvassons Gate
        turf.point([10.394391, 63.422226]), // Studentersamfunnet
        turf.point([10.397095, 63.416758]), //Hesthagen
        turf.point([10.316986, 63.378816]), //Granåsen
      ]
    );

    const startPoint = turf.point(start);
    const nearestPoint = turf.nearestPoint(startPoint, busStops);

    return nearestPoint;
  };

  const getRoute = async (start: any[], end: any[], methodText: string) => {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/${methodText}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
      { method: "GET" }
    );
    const json = await query.json();
    const data = json.routes[0];
    return data;
  };

  const addRouteLayer = (
    map: mapboxgl.Map,
    type: string,
    coordinates: any[]
  ) => {
    const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: coordinates,
      },
    };

    if (map.getSource(type)) {
      (map.getSource(type) as GeoJSONSource).setData(geojson);
    } else {
      map.addLayer({
        id: type,
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
          "line-dasharray": type === "walking" ? [2, 2] : [], // Set dash pattern for dotted line
        },
      });

      // Adjust line dash array for biking
      if (selectedMethod === "bike" && type === "walking") {
        map.setPaintProperty(type, "line-dasharray", []);
      }
    }
  };

  const handleMethodChange = (method: "walk" | "bike" | "bus") => {
    setSelectedMethod(method);
    if (method === "walk") {
      setMethodText("walking");
    } else if (method === "bike") {
      setMethodText("cycling");
    } else if (method === "bus") {
      setMethodText("driving");
    }
  };

  const handleSearch = (
    fromLocation: string,
    toLocation: string,
    fromCoordinates: any[],
    toCoordinates: any[]
  ) => {
    setStartName(fromLocation); // Assumes you have state for these, or directly use setStart, setEnd
    setEndName(toLocation);
    setStart(fromCoordinates);
    setEnd(toCoordinates);
  };

  return (
    <>
      <div className="container">
        <div id="instructions">
          <h3 className="heading">Hvor vil du reise?</h3>
          <LocationSwitcher2 onSearch={handleSearch} />

          {/*<h3>Når vil du reise?</h3>
           <TravelDatePicker /> */}

          <h3>Hvordan vil du reise?</h3>
          {/* Use TravelMethod component */}

          <TravelMethod
            selectedMethod={selectedMethod}
            onMethodChange={handleMethodChange}
          />

          <div className="travelcard">
            <div className="travelFigure">
              {selectedMethod === "walk" && (
                <div className="box">
                  {" "}
                  <FaWalking />{" "}
                </div>
              )}
              {selectedMethod === "bike" && (
                <div className="box ">
                  {" "}
                  <MdDirectionsBike />{" "}
                </div>
              )}
              {selectedMethod === "bus" && (
                <div className="box">
                  {" "}
                  <FaWalking /> <FaLongArrowAltRight />
                  <FaBusSimple />{" "}
                </div>
              )}
            </div>
            <div className="box">
              {tripDuration && (
                <p id="map_p">
                  Reisetid: <br />
                  {tripDuration} min
                </p>
              )}
            </div>
            <div className="box ">
              {tripDistance && (
                <p id="map_p">
                  Distanse: <br />
                  {tripDistance.toFixed(2)} km
                </p>
              )}
            </div>
            <div
              className={`box ${isPressed ? "pressed" : ""}`}
              onClick={handleButtonClick}
            >
              {isPressed ? (
                <FaStar className="staricon" color="#322592" />
              ) : (
                <FaStar className="staricon" color="#C8C8C8" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div id="map" />
    </>
  );
}
