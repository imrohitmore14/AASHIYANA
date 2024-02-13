import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateUser() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();
    
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

    useEffect(() => {
        // Fetch the current user details when the component mounts
        axios.get(`http://localhost:8080/users/${sessionStorage.getItem('userId')}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const updateUser = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/users/${sessionStorage.getItem('userId')}`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log(response.data);
            if (response.data.status) {
                navigate('/userDashboard');
            } else {
                setErrorMessage(response.data.messageIfAny);
            }
        })
        .catch(error => {
            console.error("Error during updating user:", error);
            setErrorMessage("Error during updating user");
        });
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>Update User Details</h2>
            <form onSubmit={updateUser}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="userName" className="form-control" value={userData.userName} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" className="form-control" value={userData.dateOfBirth} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" name="gender" className="form-control" value={userData.gender} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="number" name="phoneNo" className="form-control" value={userData.phoneNo} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" value={userData.email} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" value={userData.password} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" value={userData.address} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Aadhar ID</label>
                    <input type="number" name="aadharId" className="form-control" value={userData.aadharId} onChange={handleUserInput} />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
}

export default UpdateUser;
