import React, { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";






function BookingPage() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomType, setRoomType] = useState("standard");
  const [roomRate, setRoomRate] = useState(100); // Set your default room rate

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const handleRoomTypeChange = (e) => {
    setRoomType(e.target.value);
    // Set room rate based on the selected room type
    // Add logic to set the correct rates for each room type
    switch (e.target.value) {
      case "standard":
        setRoomRate(100);
        break;
      case "deluxe":
        setRoomRate(150);
        break;
      // Add more room types and rates as needed
      default:
        setRoomRate(100);
    }
  };

  const calculateTotalAmount = () => {
    if (!checkInDate || !checkOutDate) {
      return "Select check-in and check-out dates";
    }

    const totalDays = Math.floor(
      (checkOutDate - checkInDate) / (24 * 60 * 60 * 1000)
    );

    if (totalDays <= 0) {
      return "Invalid date range";
    }

    const totalAmount = totalDays * roomRate;

    return `₹${totalAmount}`;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const totalAmount = calculateTotalAmount();
    // Add logic to handle the booking submission
    console.log("Booking submitted with total amount:", totalAmount);
  };

  return (
    <div>
      <h2>Hotel Room Booking</h2>
      <form onSubmit={handleBookingSubmit}>
        <div>
          <label>Check-in Date:</label>
          <DatePicker selected={checkInDate} onChange={handleCheckInChange} />
        </div>
        <div>
          <label>Check-out Date:</label>
          <DatePicker selected={checkOutDate} onChange={handleCheckOutChange} />
        </div>
        <div>
          <label>Room Type:</label>
          <select value={roomType} onChange={handleRoomTypeChange}>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            {/* Add more room types as needed */}
          </select>
        </div>
        <div>
          <label>Total Invoice Amount:</label>
          <div>{calculateTotalAmount()}</div>
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookingPage;
