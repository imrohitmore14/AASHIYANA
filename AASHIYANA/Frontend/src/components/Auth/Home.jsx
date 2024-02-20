// Home.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import HotelCard from "./HotelCard";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch hotels when the component mounts
    axios.get("http://localhost:8080/hotels") // Update the URL based on your backend
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  return (
    <section>
      <div className="container">
        <h1>Hotels</h1>
        <div className="card-container">
          {hotels.map(hotel => (
            <HotelCard key={hotel.hotelId} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
