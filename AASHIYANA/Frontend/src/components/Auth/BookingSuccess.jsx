import React, { useEffect } from "react";

function BookingSuccess({ hotelName, roomType, roomPrice, checkInDate, checkOutDate,totalAmount }) {
  // Use useEffect to log the details when the component mounts
  useEffect(() => {
    console.log("Booking Success Details:");
    console.log("Hotel Name:", hotelName);
    console.log("Room Type:", roomType);
    console.log("Room Price: ₹", roomPrice);
    console.log("Check-in Date:", checkInDate && checkInDate.toDateString());
    console.log("Check-out Date:", checkOutDate && checkOutDate.toDateString());
  }, [hotelName, roomType, roomPrice, checkInDate, checkOutDate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Booking Successful!</h2>
      <p>Hotel Name: {hotelName}</p>
      <p>Room Type: {roomType}</p>
      <p>Room Price: ₹{roomPrice}</p>
      <p>Check-in Date: {checkInDate && checkInDate.toDateString()}</p>
      <p>Check-out Date: {checkOutDate && checkOutDate.toDateString()}</p>
      <p>Total Invoice Amount: {totalAmount}</p>
    </div>
  );
}

export default BookingSuccess;
