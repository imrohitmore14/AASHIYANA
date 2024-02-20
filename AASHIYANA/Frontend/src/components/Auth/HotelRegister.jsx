import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HotelRegister() {
    
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState();

    const [userData, setUserData] = useState(new FormData());

    function handleUserInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        if(event.target.type == 'file')
        value = event.target.files[0];
        setUserData(formData => {
            formData.set(name, value);
            return formData;
        })        
    }

    // // Basic email validation using regex
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   setError('Invalid email address');
    //   return;
    // }


    // // Basic password validation (at least 6 characters)
    // if (password.length < 6) {
    //   setError('Password must be at least 6 characters');
    //   return;
    // }


    // // Clear any previous error
    // setError('');

    function register(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/hotelregister', userData).then((response => {
            console.log(response);
            console.log(response.data);
            if(response.data.status) {
                sessionStorage.setItem('hotelId', response.data.hotelId);
                 navigate('/hotellogin')
               // navigate('/hoteldashboard');
            }
            else {
                setErrorMessage(response.data.messageIfAny);
            }
        }))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '180vh' }}>
        <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Hotel Registration</h2>
            <form onSubmit={register}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Hotel Name</label>
                    <input type="text" name="hotelName" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Hotel Name" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Hotel Description</label>
                    <input type="text" name="hotelDescription" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Hotel Description" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Hotel Image</label>
                    <input type="file" name="hotelImages" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Address</label>
                    <input type="text" name="address" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Address" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Pincode</label>
                    <input type="number" name="city.pincode" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Pincode" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Country</label>
                    <input type="text" name="country" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Country" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Country Code</label>
                    <input type="text" name="countryCode" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Country Code" onChange={handleUserInput} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Number of Rooms</label>
                    <input type="number" name="numberOfRooms" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} placeholder="Enter Number of Rooms" onChange={handleUserInput} />
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
                <button type="submit" className="btn btn-danger" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ff5252', color: 'white', border: 'none' }}>Signup</button>
            </form>
        </div>
    </div>
    
    )
}

export default HotelRegister