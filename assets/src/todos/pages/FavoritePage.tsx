import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaWalking } from "react-icons/fa";
import { FaBusSimple } from "react-icons/fa6";
import { MdDirectionsBike } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";

export const FavoritePage = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  // useEffect(() => {
  //   const storedFavorites = JSON.parse(
  //     localStorage.getItem("favorites") || "[]"
  //   );
  //   if (Array.isArray(storedFavorites)) {
  //     setFavorites(storedFavorites);
  //     console.log("Loaded favorites from storage:", storedFavorites);
  //   } else {
  //     console.log("Stored favorites are not an array:", storedFavorites);
  //   }
  // }, []);

  const removeFavorite = (indexToRemove) => {
    // Filter out the favorite at the given index
    const updatedFavorites = favorites.filter(
      (_, index) => index !== indexToRemove
    );

    // Update state
    setFavorites(updatedFavorites);

    // Update local storage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    if (Array.isArray(storedFavorites)) {
      // Normalize the data to ensure all entries have startName, endName, and selectedMethod
      const normalizedFavorites = storedFavorites.map((fav) => ({
        startName: fav.startName || fav.start?.[0] || "Unknown",
        endName: fav.endName || fav.end?.[0] || "Unknown",
        selectedMethod: fav.selectedMethod || "Unknown",
      }));
      setFavorites(normalizedFavorites);
      console.log("Loaded favorites from storage:", normalizedFavorites);
    } else {
      console.log("Stored favorites are not an array:", storedFavorites);
    }
  }, []);
  console.log("Rendering favorites", favorites);

  return (
    <div className="favorites-container">
      <h1 className="title">Favoritt ruter</h1>
      {favorites.map((fav, index) => (
        <div className="favorite-card" key={index}>
          <div className="favorite-column">
            {fav.selectedMethod === "walk" ? (
              <>
                <FaWalking />
              </>
            ) : fav.selectedMethod === "bike" ? (
              <MdDirectionsBike />
            ) : (
              <FaBusSimple />
            )}
          </div>
          <div className="favorite-column">Til: {fav.endName || "Unknown"}</div>
          <div className="favorite-column">
            Fra: {fav.startName || "Unknown"}
          </div>

          <div className="favorite-column icon">
            <FaStar
              onClick={() => removeFavorite(index)}
              style={{ cursor: "pointer", color: "#322592" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
