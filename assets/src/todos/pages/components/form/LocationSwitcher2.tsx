import React, { useState, useEffect, useRef } from "react";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import "./formstyles.css";

const hotels = [
  // List of hotels with their coordinates

  { name: "Granåsen", coordinates: [10.312402, 63.376447] },
  { name: "Quality Hotel Prinsen", coordinates: [10.391205, 63.430863] },
  { name: "P-Hotels Brattøra", coordinates: [10.39624, 63.436001] },
  { name: "Britannia Hotel", coordinates: [10.398753, 63.43171] },
  {
    name: "Radison Blu Royal Garden Hotel Trondheim",
    coordinates: [10.40534, 63.433639],
  },
  { name: "Scandic Nidelven", coordinates: [10.406703, 63.435788] },
  {
    name: "Clarion Hotel & Congress Trondheim",
    coordinates: [10.4022, 63.43984],
  },
  { name: "Scandic Bakklandet", coordinates: [10.40659, 63.4323] },
  { name: "Nidaros Pilegrimsgård", coordinates: [10.4004, 63.42663] },
  {
    name: "Comfort Hotel Park, Trondheim",
    coordinates: [10.39253, 63.42778],
  },
  {
    name: "City Living Schøller Hotell & Apartments, Trondheim",
    coordinates: [10.39555, 63.4321],
  },
  { name: "Scandic Lerkendal", coordinates: [10.40229, 63.41144] },
  { name: "Pensjonat Jarlen", coordinates: [10.3892, 63.43073] },
  { name: "Trondheim Vandrerhjem", coordinates: [10.42456, 63.43377] },
  { name: "Chesterfield Hotel", coordinates: [10.39972, 63.4344] },
  { name: "Scandic Solsiden", coordinates: [10.41404, 63.43477] },
  {
    name: "Quality Hotel Panorama, Trondheim",
    coordinates: [10.37467, 63.35921],
  },
  { name: "Thon Hotel Nidaros", coordinates: [10.39962, 63.43397] },
  {
    name: "City Living Sentrum Hotel & Apartments",
    coordinates: [10.39679, 63.43378],
  },
  { name: "Comfort Hotel Trondheim", coordinates: [10.40207, 63.43292] },
  { name: "Scandic Nidelven", coordinates: [10.40611, 63.43564] },
  { name: "Thon Hotel Trondheim", coordinates: [10.3927, 63.43042] },
  {
    name: "Best Western Plus Hotel Bakeriet",
    coordinates: [10.40263, 63.43397],
  },
  { name: "Hotell St Olav", coordinates: [10.39162, 63.42164] },
  { name: "Best Western Stav Hotel", coordinates: [10.72858, 63.42466] },
  {
    name: "Clarion Collection Hotel Grand Olav",
    coordinates: [10.40343, 63.43402],
  },
  { name: "Trondheim Apartment Hotel", coordinates: [10.43279, 63.44038] },
  { name: "Sandmoen Bed & Breakfast", coordinates: [10.35677, 63.31143] },
  { name: "Karivollen overnatting", coordinates: [10.29576, 63.29571] },
  { name: "Singsaker Sommerhotell", coordinates: [10.41328, 63.42423] },
];

const LocationSwitcher2: React.FC<{
  onSearch: (
    fromLocation: string,
    toLocation: string,
    fromCoordinates: any[],
    toCoordinates: any[]
  ) => void;
}> = ({ onSearch }) => {
  const [fromLocation, setFromLocation] = useState<string>("");
  const [toLocation, setToLocation] = useState<string>("");
  const [matchingFromHotels, setMatchingFromHotels] = useState<
    { name: string; coordinates: any[] }[]
  >([]);
  const [matchingToHotels, setMatchingToHotels] = useState<
    { name: string; coordinates: any[] }[]
  >([]);
  const refFrom = useRef(null);
  const refTo = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refFrom.current && !refFrom.current.contains(event.target)) {
        setMatchingFromHotels([]);
      }
      if (refTo.current && !refTo.current.contains(event.target)) {
        setMatchingToHotels([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const fromHotel = hotels.find(
      (hotel) => hotel.name.toLowerCase() === fromLocation.toLowerCase()
    );
    const toHotel = hotels.find(
      (hotel) => hotel.name.toLowerCase() === toLocation.toLowerCase()
    );
    if (fromHotel && toHotel) {
      onSearch(
        fromLocation,
        toLocation,

        fromHotel.coordinates,
        toHotel.coordinates
      );
    }
    setMatchingFromHotels([]);
    setMatchingToHotels([]);
  };

  const handleInputChange = (inputType: "from" | "to", value: string) => {
    const matchedHotels = hotels.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    if (inputType === "from") {
      setMatchingFromHotels(matchedHotels);
      setFromLocation(value);
    } else {
      setMatchingToHotels(matchedHotels);
      setToLocation(value);
    }
  };

  const handleHotelClick = (hotelName: string, inputType: "from" | "to") => {
    if (inputType === "from") {
      setFromLocation(hotelName);
      setMatchingFromHotels([]);
    } else {
      setToLocation(hotelName);
      setMatchingToHotels([]);
    }
  };

  return (
    <div className="locationInput">
      <label htmlFor="fromLocation">Fra:</label>
      <div ref={refFrom}>
        <input
          type="text"
          id="fromLocation"
          placeholder="Hotel"
          value={fromLocation}
          onChange={(e) => handleInputChange("from", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setMatchingFromHotels([]);
          }}
        />
        {matchingFromHotels.length > 0 && (
          <ul className="hotel-dropdown">
            {matchingFromHotels.map((hotel, index) => (
              <li
                key={index}
                onClick={() => handleHotelClick(hotel.name, "from")}
              >
                {hotel.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <label htmlFor="toLocation">Til:</label>
      <div ref={refTo}>
        <input
          type="text"
          id="toLocation"
          placeholder="Granåsen"
          value={toLocation}
          onChange={(e) => handleInputChange("to", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setMatchingToHotels([]);
          }}
        />
        {matchingToHotels.length > 0 && (
          <ul className="hotel-dropdown">
            {matchingToHotels.map((hotel, index) => (
              <li
                key={index}
                onClick={() => handleHotelClick(hotel.name, "to")}
              >
                {hotel.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => {
          const temp = fromLocation;
          setFromLocation(toLocation);
          setToLocation(temp);
        }}
      >
        <HiOutlineSwitchVertical />
      </button>
      <button className="input_submit" onClick={handleSearch}>
        Søk
      </button>
    </div>
  );
};

export default LocationSwitcher2;

// import React, { useState } from "react";
// import { HiOutlineSwitchVertical } from "react-icons/hi";
// import "./formstyles.css";

// const hotels = [
//   // List of hotels with their coordinates

//   { name: "Granåsen", coordinates: [10.312402, 63.376447] },
//   { name: "Quality Hotel Prinsen", coordinates: [10.391205, 63.430863] },
//   { name: "P-Hotels Brattøra", coordinates: [10.39624, 63.436001] },
//   { name: "Britannia Hotel", coordinates: [10.398753, 63.43171] },
//   {
//     name: "Radison Blu Royal Garden Hotel Trondheim",
//     coordinates: [10.40534, 63.433639],
//   },
//   { name: "Scandic Nidelven", coordinates: [10.406703, 63.435788] },
//   {
//     name: "Clarion Hotel & Congress Trondheim",
//     coordinates: [10.4022, 63.43984],
//   },
//   { name: "Scandic Bakklandet", coordinates: [10.40659, 63.4323] },
//   { name: "Nidaros Pilegrimsgård", coordinates: [10.4004, 63.42663] },
//   {
//     name: "Comfort Hotel Park, Trondheim",
//     coordinates: [10.39253, 63.42778],
//   },
//   {
//     name: "City Living Schøller Hotell & Apartments, Trondheim",
//     coordinates: [10.39555, 63.4321],
//   },
//   { name: "Scandic Lerkendal", coordinates: [10.40229, 63.41144] },
//   { name: "Pensjonat Jarlen", coordinates: [10.3892, 63.43073] },
//   { name: "Trondheim Vandrerhjem", coordinates: [10.42456, 63.43377] },
//   { name: "Chesterfield Hotel", coordinates: [10.39972, 63.4344] },
//   { name: "Scandic Solsiden", coordinates: [10.41404, 63.43477] },
//   {
//     name: "Quality Hotel Panorama, Trondheim",
//     coordinates: [10.37467, 63.35921],
//   },
//   { name: "Thon Hotel Nidaros", coordinates: [10.39962, 63.43397] },
//   {
//     name: "City Living Sentrum Hotel & Apartments",
//     coordinates: [10.39679, 63.43378],
//   },
//   { name: "Comfort Hotel Trondheim", coordinates: [10.40207, 63.43292] },
//   { name: "Scandic Nidelven", coordinates: [10.40611, 63.43564] },
//   { name: "Thon Hotel Trondheim", coordinates: [10.3927, 63.43042] },
//   {
//     name: "Best Western Plus Hotel Bakeriet",
//     coordinates: [10.40263, 63.43397],
//   },
//   { name: "Hotell St Olav", coordinates: [10.39162, 63.42164] },
//   { name: "Best Western Stav Hotel", coordinates: [10.72858, 63.42466] },
//   {
//     name: "Clarion Collection Hotel Grand Olav",
//     coordinates: [10.40343, 63.43402],
//   },
//   { name: "Trondheim Apartment Hotel", coordinates: [10.43279, 63.44038] },
//   { name: "Sandmoen Bed & Breakfast", coordinates: [10.35677, 63.31143] },
//   { name: "Karivollen overnatting", coordinates: [10.29576, 63.29571] },
//   { name: "Singsaker Sommerhotell", coordinates: [10.41328, 63.42423] },
// ];

// const LocationSwitcher2: React.FC<{
//   onSearch: (
//     fromLocation: string,
//     toLocation: string,
//     fromCoordinates: any[],
//     toCoordinates: any[]
//   ) => void;
// }> = ({ onSearch }) => {
//   const [fromLocation, setFromLocation] = useState<string>("");
//   const [toLocation, setToLocation] = useState<string>("");
//   const [matchingFromHotels, setMatchingFromHotels] = useState<
//     { name: string; coordinates: any[] }[]
//   >([]);
//   const [matchingToHotels, setMatchingToHotels] = useState<
//     { name: string; coordinates: any[] }[]
//   >([]);

//   const handleSearch = () => {
//     const fromHotel = hotels.find(
//       (hotel) => hotel.name.toLowerCase() === fromLocation.toLowerCase()
//     );
//     const toHotel = hotels.find(
//       (hotel) => hotel.name.toLowerCase() === toLocation.toLowerCase()
//     );
//     if (fromHotel && toHotel) {
//       onSearch(
//         fromLocation,
//         toLocation,
//         fromHotel.coordinates,
//         toHotel.coordinates
//       );
//     }
//   };

//   const handleInputChange = (inputType: "from" | "to", value: string) => {
//     const matchedHotels = hotels.filter((hotel) =>
//       hotel.name.toLowerCase().includes(value.toLowerCase())
//     );
//     if (inputType === "from") {
//       setMatchingFromHotels(matchedHotels);
//       setFromLocation(value);
//     } else {
//       setMatchingToHotels(matchedHotels);
//       setToLocation(value);
//     }
//   };

//   const handleHotelClick = (hotelName: string, inputType: "from" | "to") => {
//     if (inputType === "from") {
//       setFromLocation(hotelName);
//       setMatchingFromHotels([]);
//     } else {
//       setToLocation(hotelName);
//       setMatchingToHotels([]);
//     }
//   };

//   return (
//     <div className="locationInput">
//       <label htmlFor="fromLocation">Fra:</label>
//       <input
//         type="text"
//         id="fromLocation"
//         placeholder="Hotell"
//         value={fromLocation}
//         onChange={(e) => handleInputChange("from", e.target.value)}
//       />
//       {matchingFromHotels.length > 0 && (
//         <ul className="hotel-dropdown">
//           {matchingFromHotels.map((hotel, index) => (
//             <li
//               key={index}
//               onClick={() => handleHotelClick(hotel.name, "from")}
//             >
//               {hotel.name}
//             </li>
//           ))}
//         </ul>
//       )}
//       <label htmlFor="toLocation">Til:</label>
//       <input
//         type="text"
//         id="toLocation"
//         placeholder="Granåsen"
//         value={toLocation}
//         onChange={(e) => handleInputChange("to", e.target.value)}
//       />
//       {matchingToHotels.length > 0 && (
//         <ul className="hotel-dropdown">
//           {matchingToHotels.map((hotel, index) => (
//             <li key={index} onClick={() => handleHotelClick(hotel.name, "to")}>
//               {hotel.name}
//             </li>
//           ))}
//         </ul>
//       )}
//       <button
//         onClick={() => {
//           const temp = fromLocation;
//           setFromLocation(toLocation);
//           setToLocation(temp);
//         }}
//       >
//         <HiOutlineSwitchVertical />
//       </button>
//       <button onClick={handleSearch}>Søk</button>
//     </div>
//   );
// };

// export default LocationSwitcher2;
