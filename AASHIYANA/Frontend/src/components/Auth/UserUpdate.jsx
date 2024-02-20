import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserUpdate() {
    
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    
    const userId = sessionStorage.getItem('userId');

    const [userData, setUserData] = useState({
        userName: '',
        dateOfBirth: '',
        gender: '',
        phoneNo: '',
        email: '',
        password: '',
        address: '',
        aadharId: ''
    });

    // Function to fetch existing user details when the component mounts
    useEffect(() => {
        // Make an HTTP request to get existing user details based on userId
        axios.get(`http://localhost:8080/user/fetch/${userId}`)

            .then(response => {
                const existingUserData = response.data; // Assuming the response contains user details
                setUserData(existingUserData);
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
    }, [userId]);

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const updateUserDetails = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/userupdate/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.data);
            if (response.data.status) {
                setErrorMessage(null);
                navigate('/userlogin');
            } else {
                setErrorMessage(response.data.messageIfAny);
            }
        })
        .catch(error => {
            console.error("Error during user details update:", error);
            setErrorMessage("Error during user details update");
        });
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '150vh' }}>
            <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Edit User Details</h2>
                <form onSubmit={updateUserDetails}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Name</label>
                    <input type="text" name="userName" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Name" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Date of Birth</label>
                    <input type="date" name="dateOfBirth" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Date of Birth" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Gender</label>
                    <input type="text" name="gender" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Male, Female, Other" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Phone Number</label>
                    <input type="number" name="phoneNo" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Phone Number" onChange={handleUserInput} />
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
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Address</label>
                    <input type="text" name="address" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Address" onChange={handleUserInput} />
                </div>
                {/* Additional form fields can be added here with similar styling */}
                <div className="form-group">
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Aadhar ID</label>
                    <input type="number" name="aadharId" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Aadhaar ID" onChange={handleUserInput} />
                </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <button type="submit" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#2196f3', color: 'white', border: 'none' }}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserUpdate;
