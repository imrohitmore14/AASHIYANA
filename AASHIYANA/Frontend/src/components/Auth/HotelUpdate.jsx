import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HotelUpdate() {
    
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    
    const hotelId = sessionStorage.getItem('hotelId');

    const [hotelData, setHotelData] = useState({
        hotelName: '',
        address: '',
        country: '',
        countryCode: '',
        contactNumber: '',
        email: '',
        password: '',
        hotelDescription: ''
    });

    // Function to fetch existing user details when the component mounts
    useEffect(() => {
        // Make an HTTP request to get existing user details based on userId
        axios.get(`http://localhost:8080/user/fetch/${hotelId}`)

            .then(response => {
                const existingHotelData = response.data; // Assuming the response contains user details
                setHotelData(existingHotelData);
            })
            .catch(error => {
                console.error("Error fetching Hotel details:", error);
            });
    }, [hotelId]);

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setHotelData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const updateHotelDetails = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/hotel/update/${hotelId}`, hotelData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.data);
            if (response.data.status) {
                setErrorMessage(null);
                navigate('/hotellogin');
            } else {
                setErrorMessage(response.data.messageIfAny);
            }
        })
        .catch(error => {
            console.error("Error during Hotel details update:", error);
            setErrorMessage("Error during Hotel details update");
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150vh' }}>
            <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Edit Hotel Details</h2>
                <form onSubmit={updateHotelDetails}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Hotel Name</label>
                    <input type="text" name="hotelName" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Hotel Name" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Address</label>
                    <input type="text" name="address" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Address" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Pin Code</label>
                    <input type="number" name="pinCode" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Pin Code" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Country</label>
                    <input type="text" name="country" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Country" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Country Code</label>
                    <input type="number" name="countryCode" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Country Code" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Contact Number</label>
                    <input type="number" name="contactNumber" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Contact Number" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email</label>
                    <input type="email" name="email" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Email" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
                    <input type="password" name="password" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Password" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Hotel Description</label>
                    <input type="text" name="hotelDescription" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Hotel Description" onChange={handleUserInput} />
                </div>
                {/* Additional form fields can be added here with similar styling */}
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <button type="submit" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#2196f3', color: 'white', border: 'none' }}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default HotelUpdate;
