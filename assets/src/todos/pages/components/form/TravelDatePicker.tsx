import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import styles
import './formstyles.css'; // Import your custom styles

const TravelDatePicker: React.FC<{}> = (): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [activeButton, setActiveButton] = useState<'now' | 'departure' | 'arrival' | null>(null);

    const handleNowClick = () => {
        setSelectedDate(new Date());
        setActiveButton('now');
    };

    const handleDepartureClick = () => {
        setActiveButton('departure');
    };

    const handleArrivalClick = () => {
        setActiveButton('arrival');
    };

    return (
        <div className='departure'>
            <div className='departureButtons'>
                <button
                    onClick={handleNowClick}
                    className={activeButton === 'now' ? 'active-button' : ''}
                >
                    Nå
                </button>
                <button
                    onClick={handleDepartureClick}
                    className={activeButton === 'departure' ? 'active-button' : ''}
                >
                    Avgang
                </button>
                <button
                    onClick={handleArrivalClick}
                    className={activeButton === 'arrival' ? 'active-button' : ''}
                >
                    Ankomst
                </button>
            </div>

            {/*
            <DatePicker
                className='departureDateTime'
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                placeholderText='dd.mm.yyyy; hh:mm'
                dateFormat="dd.MM.yyyy; HH:mm" // Correct format
                minDate={new Date()}
                showTimeSelect
                timeIntervals={5} // Adjust as needed
                timeFormat='HH:mm' // Use 24-hour format
    />*/}
        </div>
    );
};

export default TravelDatePicker;

