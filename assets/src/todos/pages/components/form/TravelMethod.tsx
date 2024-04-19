import React, { useState } from 'react';
import { FaWalking } from 'react-icons/fa';
import { FaBusSimple } from 'react-icons/fa6';
import { MdDirectionsBike } from 'react-icons/md';
import "./formstyles.css"



interface TravelMethodProps {
    selectedMethod: 'walk' | 'bike' | 'bus';
    onMethodChange: (method: 'walk' | 'bike' | 'bus') => void;
}

const TravelMethod: React.FC<TravelMethodProps> = ({ selectedMethod, onMethodChange }): React.ReactElement  => {
    const handleButtonClick = (method: 'walk' | 'bike' | 'bus') => {
        console.log('Button clicked with method:', method);
        onMethodChange(method);
    };

    

    return (
        <div className='travel_buttons'>
            <button id="walk" onClick={() => handleButtonClick('walk')} className={selectedMethod === 'walk' ? 'selected' : ''}><FaWalking /></button>
            <button id="bike" onClick={() => handleButtonClick('bike')} className={selectedMethod === 'bike' ? 'selected' : ''}><MdDirectionsBike /></button>
            <button id="bus" onClick={() => handleButtonClick('bus')} className={selectedMethod === 'bus' ? 'selected' : ''}><FaBusSimple /></button>
        </div>
    );
};

export default TravelMethod;