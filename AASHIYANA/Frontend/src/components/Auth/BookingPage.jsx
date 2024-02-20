import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BookingPage() {
  const { hotelId } = useParams();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("standard");
  const [roomRate, setRoomRate] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios.get(`http://localhost:8080/rooms/fetchRoomTypes/${hotelId}`)
      .then(response => {
        if (isMounted) {
          setRoomTypes(response.data);
        }
      })
      .catch(error => {
        console.error("Error fetching room types:", error.message);
        if (isMounted) {
          setError("Error fetching room types. Please try again later.");
        }
      });

    return () => {
      isMounted = false;
    };
  }, [hotelId]);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);
  };

  const handleRoomTypeChange = (e) => {
    const selectedType = e.target.value;
    setSelectedRoomType(selectedType);

    axios.get(`http://localhost:8080/rooms/fetchRoomRate/${hotelId}/${selectedType}`)
      .then(response => {
        setRoomRate(response.data);
      })
      .catch(error => {
        console.error(`Error fetching room rate for ${selectedType}:`, error.message);
        setError(`Error fetching room rate for ${selectedType}. Please try again later.`);
      });
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
    const calculatedTotalAmount = calculateTotalAmount();
    setTotalAmount(calculatedTotalAmount);
    setShowConfirmation(true);
  };

  // const handleBookingConfirm = () => {
  //   const bookingDetails = {
  //     hotelName: "Hotel XYZ", // Replace with actual hotel name
  //     roomType: selectedRoomType,
  //     roomPrice: roomRate,
  //     checkInDate: checkInDate,
  //     checkOutDate: checkOutDate,
  //     totalAmount: totalAmount,
  //   };
  //   console.log("Booking Details:", bookingDetails);
  //   setBookingDetails(bookingDetails);
  //   setShowConfirmation(false);
  // };
  const handleBookingConfirm = () => {
    // const bookingDetailsToSend = {
    //     hotelName: "Hotel XYZ", // Replace with actual hotel name
    //     roomType: selectedRoomType,
    //     roomPrice: roomRate,
    //     checkInDate: checkInDate,
    //     checkOutDate: checkOutDate,
    //     totalAmount: totalAmount,
    // };

    axios.post("http://localhost:8080/booking", bookingDetails)
        .then(response => {
            console.log("Booking created successfully:", response.data);
           // setBookingDetails(bookingDetailsToSend); // Update state with sent data
            setShowConfirmation(false);
        })
        .catch(error => {
            console.error("Error creating booking:", error.message);
            // Handle error, show a message, etc.
        });
};


  const handleBookingCancel = () => {
    setShowConfirmation(false);
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2>Hotel Room Booking</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleBookingSubmit}>
          <div className="form-group">
            <label>Check-in Date:</label>
            <DatePicker className="form-control" selected={checkInDate} onChange={handleCheckInChange} />
          </div><br />
          <div className="form-group">
            <label>Check-out Date:</label>
            <DatePicker className="form-control" selected={checkOutDate} onChange={handleCheckOutChange} />
          </div> <br />
          <div className="form-group">
            <label>Room Type:</label>
            <select className="form-control" value={selectedRoomType} onChange={handleRoomTypeChange}>
              {roomTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select> <br />
          </div>
          <div className="form-group">
            <label>Total Invoice Amount:</label> <br />
            <div>{calculateTotalAmount()}</div> <br />
          </div>
          <button type="submit" className="btn btn-danger">Book Now</button>
        </form>

        {showConfirmation && (
          <div className="confirmation-popup">
            <p>Confirm booking?</p>
            <button className="btn btn-success" onClick={handleBookingConfirm}>
              Yes
            </button>
            <button className="btn btn-danger" onClick={handleBookingCancel}>
              No
            </button>
          </div>
        )}

        {bookingDetails && (
          <div className="booking-details">
            <h3>Booking Details</h3>
            <p>Hotel Name: {bookingDetails.hotelName}</p>
            <p>Room Type: {bookingDetails.roomType}</p>
            <p>Room Price: ₹{bookingDetails.roomPrice}</p>
            <p>Check-in Date: {bookingDetails.checkInDate && new Date(bookingDetails.checkInDate).toDateString()}</p>
            <p>Check-out Date: {bookingDetails.checkOutDate && new Date(bookingDetails.checkOutDate).toDateString()}</p>
            <p>Total Amount: {bookingDetails.totalAmount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
