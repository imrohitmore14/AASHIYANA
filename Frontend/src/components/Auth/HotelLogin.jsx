import { useState } from 'react';
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function HotelLogin() {
    
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    function handleInput(event) {
        setLoginData(prevData => {
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
        })        
    }

    function validateForm() {
        if (!loginData.email || !loginData.password) {
            setErrorMessage("Please enter both email address and password.");
            return false;
        }
        return true;
    }

    function login(event) {
        event.preventDefault();

        if (validateForm()) {
            axios.post('http://localhost:8080/hotellogin', loginData)
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    if (response.data.status) {
                        sessionStorage.setItem('hotelId', response.data.hotelId);
                        sessionStorage.setItem('name', response.data.name);
                        navigate('/hoteldashboard')
                    } else {
                        setErrorMessage(response.data.messageIfAny);
                    }
                })
                .catch(error => {
                    console.error("Error during hotel login:", error);
                    setErrorMessage("Error during hotel login");
                });
        }
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>Hotel Login</h2>
            <form onSubmit={login}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" className="form-control" onChange={handleInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleInput} />
                </div>
                <button className="btn btn-danger">Login</button>
            </form>
        </div>
    )
}

export default HotelLogin;
