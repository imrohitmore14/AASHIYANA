import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
    const userId = sessionStorage.getItem('userId');
    const name = sessionStorage.getItem('name');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();

    const handleEditClick = () => {
        navigate('/userupdate');
    };

    const handleDeleteClick = () => {
        // Make a DELETE request to delete the user's account
        axios.delete(`http://localhost:8080/userdelete/${userId}`)
            .then(response => {
                console.log(response.data);
                if (response.data.status) {
                    setErrorMessage(null);
                    
                    navigate('/');
                } else {
                    setErrorMessage(response.data.messageIfAny);
                }
            })
            .catch(error => {
                console.error("Error during user account deletion:", error);
                setErrorMessage("Error during user account deletion");
            });
    };

    const handleLogout = () => {
       
        sessionStorage.clear();
        navigate('/userlogin');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ color: '#2196f3' }}>Registration Done!</h1>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Your registered User id is: {userId}</h2>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Your name: {name}</h2>
                <button onClick={handleEditClick} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#4caf50', color: 'white', border: 'none', marginRight: '10px' }}>
                    Edit
                </button>
                <button onClick={handleDeleteClick} className="btn btn-danger" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#f44336', color: 'white', border: 'none', marginRight: '10px' }}>
                    Delete account
                </button>
                <button onClick={handleLogout} className="btn btn-secondary" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#607d8b', color: 'white', border: 'none' }}>
                    Logout
                </button>
            </div>
        </div>
    );
}

export default UserDashboard;
