import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
    switch (e.target.value) {
      case "standard":
        setRoomRate(3000);
        break;
      case "deluxe":
        setRoomRate(5000);
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
        <div className="form-group">
          <label>Check-in Date:</label>
          <DatePicker className="form-control" selected={checkInDate} onChange={handleCheckInChange} />
        </div><br/>
        <div className="form-group">
          <label>Check-out Date:</label>
          <DatePicker className="form-control" selected={checkOutDate} onChange={handleCheckOutChange} />
        </div> <br/>
        <div className="form-group">
          <label>Room Type:</label>
          <select className="form-control" value={roomType} onChange={handleRoomTypeChange}>
            <option value="standard">Standard</option>
            <option value="deluxe">Deluxe</option>
            {/* Add more room types as needed */}
          </select> <br/>
        </div>
        <div className="form-group">
          <label>Total Invoice Amount:</label> <br/>
          <div>{calculateTotalAmount()}</div> <br/>
        </div>
        <button type="submit" className="btn btn-danger">Book Now</button>
      </form>
    </div>
  );
}

export default BookingPage;
