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
                // navigate('/hotellogin')
                navigate('/addRoom');
            }
            else {
                setErrorMessage(response.data.messageIfAny);
            }
        }))
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>Hotel Registration</h2>

            <form onSubmit={register}>
                <div className="form-group">
                    <label>Hotel Name</label>
                    <input type="text" name="hotelName" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Hotel Description</label>
                    <input type="text" name="hotelDescription" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Hotel Image</label>
                    <input type="file" name="hotelImages" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="dateOfBirth" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Pincode</label>
                    <input type="number" name="city.pincode" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input type="text" name="country" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Country Code</label>
                    <input type="text" name="countryCode" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Number of Rooms</label>
                    <input type="number" name="numberOfRooms" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="number" name="contactNumber" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleUserInput} />
                </div>
                <button className="btn btn-danger">Signup</button>
            </form>
        </div>
    )
}

export default HotelRegister