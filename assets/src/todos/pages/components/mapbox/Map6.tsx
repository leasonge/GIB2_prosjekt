import React, { useEffect, useState } from 'react';
import mapboxgl, { GeoJSONSource, LngLatLike } from 'mapbox-gl';
import './mapstyles.css'
import TravelMethod from '../form/TravelMethod';
import * as turf from '@turf/turf'; // Import Turf.js
import LocationSwitcher from '../form/LocationSwitcher';
import TravelDatePicker from '../form/TravelDatePicker';
import { FaWalking } from 'react-icons/fa';
import { FaBusSimple } from 'react-icons/fa6';
import { MdDirectionsBike } from 'react-icons/md';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';


export default function Map() {
    const [tripDuration, setTripDuration] = useState<number | null>(null);
    const [tripDistance, setTripDistance] = useState<number | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<'walk' | 'bike' | 'bus'>('bike');
    const [methodText, setMethodText] = useState<string>('walking');
    const [closestBusStopCoordinates, setClosestBusStopCoordinates] = useState<LngLatLike | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const handleButtonClick = () => {
        setIsPressed(!isPressed);
    };
    
    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1IjoiZW1tYWJlcmciLCJhIjoiY2xyeXZlaXM1MWtwOTJxbzZla2htZG13byJ9.6_pAhXgRmp5mGg2r29Q8iA';

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/streets-v11', // replace with your preferred style
            center: [10.391679, 63.405329], // starting position [lng, lat]
            zoom: 11, // starting zoom
        });

        const start: any[] = [10.407518,63.432170]; // Assuming start coordinates
        const end: any[] = [10.312402, 63.376447];

        async function initializeMap() {
            let walkingRoute, drivingRoute;
            let totalDuration = 0;
            let totalDistance = 0;
        
            if (selectedMethod === 'bus') {
                const closestBusStop = findClosestBusStop(start);
                setClosestBusStopCoordinates(closestBusStop.geometry.coordinates as LngLatLike);
                
                walkingRoute = await getRoute(start, closestBusStop.geometry.coordinates, 'walking');
                drivingRoute = await getRoute(closestBusStop.geometry.coordinates, end, 'driving');
                
                // Calculate total duration and distance
                totalDuration += walkingRoute.duration;
                totalDistance += walkingRoute.distance;
                totalDuration += drivingRoute.duration;
                totalDistance += drivingRoute.distance;

                map.addLayer({
                    id: 'bus-stop',
                    type: 'circle',
                    source: {
                        type: 'geojson',
                        data: {
                            type: 'FeatureCollection',
                            features: [
                                {
                                    type: 'Feature',
                                    properties: {},
                                    geometry: {
                                        type: 'Point',
                                        coordinates: closestBusStop.geometry.coordinates
                                    }
                                }
                            ]
                        }
                    },
                    paint: {
                        'circle-radius': 7,
                        'circle-color': '#3887be' // Color for bus stop marker
                    }
                });

            } else {
                walkingRoute = await getRoute(start, end, methodText);
                
                totalDuration = walkingRoute.duration;
                totalDistance = walkingRoute.distance;
            }
            
            map.addLayer({
                id: 'start-point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: start
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 7,
                    'circle-color': "#322592" // Color for start point marker
                }
            });
        
            map.addLayer({
                id: 'end-point',
                type: 'circle',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: [
                            {
                                type: 'Feature',
                                properties: {},
                                geometry: {
                                    type: 'Point',
                                    coordinates: end
                                }
                            }
                        ]
                    }
                },
                paint: {
                    'circle-radius': 7,
                    'circle-color': "#322592" // Color for end point marker
                }
            });

            setTripDuration(Math.floor(totalDuration / 60));
            setTripDistance(totalDistance / 1000);
        
            addRouteLayer(map, 'walking', walkingRoute.geometry.coordinates);
        
            if (selectedMethod === 'bus') {
                addRouteLayer(map, 'driving', drivingRoute.geometry.coordinates);
            }
           
            
            
        }
        

        map.on('load', initializeMap);

        return () => map.remove();
    }, [selectedMethod, methodText]);

    const findClosestBusStop = (start: any[]): turf.Feature<turf.Point> => {
        const busStops: turf.FeatureCollection<turf.Point> = turf.featureCollection([
            turf.point([10.312402, 63.376447]), // Granåsen
            turf.point([10.391906, 63.430873]), // Kongens
            turf.point([10.393635, 63.426131]) // Other bus stop coordinates
            // Add more bus stops as needed
        ]);
    
        const startPoint = turf.point(start);
        const nearestPoint = turf.nearestPoint(startPoint, busStops);
    
        return nearestPoint;
    };

    const getRoute = async (start: any[] , end: any[], methodText: string) => {
        const query = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/${methodText}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
            { method: 'GET' }
        );
        const json = await query.json();
        const data = json.routes[0];
        return data;
    };

    const addRouteLayer = (map: mapboxgl.Map, type: string, coordinates: any[]) => {
        const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: coordinates
            }
        };

        if (map.getSource(type)) {
            (map.getSource(type) as GeoJSONSource).setData(geojson);
        } else {
            map.addLayer({
                id: type,
                type: 'line',
                source: {
                    type: 'geojson',
                    data: geojson
                },
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75,
                    'line-dasharray': type === 'walking' ? [2,2] : [] // Set dash pattern for dotted line
                }
            });

            // Adjust line dash array for biking
            if (selectedMethod === 'bike' && type === 'walking') {
                map.setPaintProperty(type, 'line-dasharray', []);
            }
        }
    };

    

    
    

    const handleMethodChange = (method: 'walk' | 'bike' | 'bus') => {
        setSelectedMethod(method);
        if (method === 'walk') {
            setMethodText('walking');
        } else if (method === 'bike') {
            setMethodText('cycling');
        } else if (method === 'bus') {
            setMethodText('driving');
        }
    };



    return (
        <>
        <div className='container'>
            
            <div id='instructions'>
            
                <h3 className="heading">Hvor vil du reise?</h3>
                <LocationSwitcher />

                <div className='input_button'>
                <button className="input_submit" type="submit">Søk</button>
                </div>
                <h3>Når vil du reise?</h3>
                <TravelDatePicker/>
                
            
                <h3>Hvordan vil du reise?</h3>
                {/* Use TravelMethod component */}

                <TravelMethod selectedMethod={selectedMethod} onMethodChange={handleMethodChange} />
            
                
                <div className='travelcard'>
                    <div className='travelFigure'>
                        {selectedMethod === 'walk' && <div className="box"> <FaWalking /> </div>}
                        {selectedMethod === 'bike' && <div className="box "> <MdDirectionsBike /> </div>}
                        {selectedMethod === 'bus' && <div className="box"> <FaWalking /> <FaLongArrowAltRight /><FaBusSimple /> </div>}
                    </div>                  
                    <div className="box">{tripDuration && <p>Reisetid: <br />{tripDuration} min</p>}</div>
                    <div className="box ">{tripDistance && <p>Distanse: <br />{tripDistance.toFixed(2)} km</p>}</div>
                    <div className={`box ${isPressed ? "pressed" : ""}`} onClick={handleButtonClick}>
                    {isPressed ?  <FaStar className='staricon' color="white" /> : <FaStar className='staricon' color="#322592" />}
                </div>             
                </div>
                



            </div>
        </div>
        <div id="map" />
        </>
    );
};
