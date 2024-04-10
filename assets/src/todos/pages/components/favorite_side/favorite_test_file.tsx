import "./favorite_test_file.css";
import React, { useState } from "react";
import { FaStar } from 'react-icons/fa';



const FavoriteCard: React.FC = () => {

    const [isPressed, setIsPressed] = useState(false);


    const handleButtonClick = () => {
        setIsPressed(!isPressed);
    };

    return (
        <div className="container">
            <div className="favoriteCardStyle">
                <div className="box">Bilde av hotell</div>
                <div className="box">Navn på hotell/Granåsen</div>
                <div className="box">Fremkomstmiddel</div>
                <div className="box">Bilde av hotell</div>
                <div className="box">Navn på hotell/Granåsen</div>
                <div className={`box ${isPressed ? "pressed" : ""}`} onClick={handleButtonClick}>
                    {isPressed ? <FaStar color="yellow" /> : <FaStar color="black" />}
                </div>
            </div>
        </div>
    );
};

export default FavoriteCard;
