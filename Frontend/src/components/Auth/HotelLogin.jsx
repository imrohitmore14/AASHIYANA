import { useState } from 'react';
import axios from "axios"; 
import { Navigate, useHistory, useNavigate } from 'react-router-dom';
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

    function login(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/hotel/login', loginData).then((response => {
            console.log(response);
            console.log(response.data);
            if(response.data.status) {
                sessionStorage.setItem('hotelId', response.data.hotelId);
                sessionStorage.setItem('name', response.data.name);
                navigate('/hoteldashboard')
            }
            else {
                setErrorMessage(response.data.messageIfAny);
            }
        }))
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
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

export default HotelLogin

// After login -----> Dashboards
// After Registrations -----> Confirmations