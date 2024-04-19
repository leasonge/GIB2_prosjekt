import React, { useState } from 'react';
import { HiOutlineSwitchVertical } from "react-icons/hi";
import "./formstyles.css"


const LocationSwitcher: React.FC = (): React.ReactElement | null => {
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');

  const switchLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  return (
    <div className='locationInput'>
      <label htmlFor="fromLocation">Fra:</label>
      <input 
        type="text" 
        id="fromLocation" 
        placeholder="Hotel"
        value={fromLocation} 
        onChange={(e) => setFromLocation(e.target.value)} 
      />
      <button type="button" onClick={switchLocations}><HiOutlineSwitchVertical/></button>
      
      <label htmlFor="toLocation">Til:</label>
      <input 
        type="text" 
        id="toLocation" 
        placeholder="Granåsen"
        value={toLocation} 
        onChange={(e) => setToLocation(e.target.value)} 
      />
    </div>
  );
};

export default LocationSwitcher;