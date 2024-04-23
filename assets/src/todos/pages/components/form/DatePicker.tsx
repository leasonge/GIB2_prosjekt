import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./formstyles.css";

const TravelDatePicker: React.FC<{}> = (): JSX.Element => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeButton, setActiveButton] = useState<
    "now" | "departure" | "arrival" | null
  >(null);

  const handleNowClick = () => {
    setSelectedDate(new Date());
    setActiveButton("now");
  };

  const handleDepartureClick = () => {
    // Set the selected date to the current time if it's in the future
    if (selectedDate.getTime() < new Date().getTime()) {
      setSelectedDate(new Date());
    }
    setActiveButton("departure");
  };

  const handleArrivalClick = () => {
    // Set the selected date to the current time if it's in the past
    if (selectedDate.getTime() < new Date().getTime()) {
      setSelectedDate(new Date());
    }
    setActiveButton("arrival");
  };

  return (
    <div className="departure">
      <div className="departureButtons">
        {/* Apply the 'active-button' class conditionally */}
        <button
          onClick={handleNowClick}
          className={activeButton === "now" ? "active-button" : ""}
        >
          Nå
        </button>
        <button
          onClick={handleDepartureClick}
          className={activeButton === "departure" ? "active-button" : ""}
        >
          Avgang
        </button>
        <button
          onClick={handleArrivalClick}
          className={activeButton === "arrival" ? "active-button" : ""}
        >
          Ankomst
        </button>
      </div>

      <DatePicker
        className="departureDateTime"
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        placeholderText="dd.mm.yyyy; hh:mm"
        dateFormat="dd.MM.yyyy; HH:mm"
        minDate={new Date()}
        showTimeSelect
        timeIntervals={5}
        timeFormat="hh:mm"
      />
    </div>
  );
};

export default TravelDatePicker;
