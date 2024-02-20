import React from "react";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Pass the hotel ID as a parameter when navigating
    navigate(`/booking/${hotel.hotelId}`);
    console.log(`hotel id is : ${hotel.hotelId}`)
    console.log(`Book Now clicked for ${hotel.hotelName}`);
  };

  return (
    <div className="hotel-card">
      <img src={`http://localhost:8080/hotel/image/${hotel.hotelImages}`} alt={hotel.hotelName} className="card-img" />
      <div className="card-info-flex">
        <h3 className="card-title">{hotel.hotelName}</h3>
        <div className="card-rating">
          <StarRateRoundedIcon />
          <p>{hotel.rating}</p>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{hotel.hotelDescription}</p>
      <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black)" }}>
        <span style={{ fontWeight: "600" }}>₹{hotel.price}</span> per night
      </p>
      <Button className="btn btn-danger" onClick={handleBookNow}>
        Book Now
      </Button>
    </div>
  );
};

export default HotelCard;
