import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserLogin() {
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
                [event.target.name]: event.target.value
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
            axios.post('http://localhost:8080/userlogin', loginData)
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    if (response.data.status) {
                        sessionStorage.setItem('userId', response.data.userId);
                        sessionStorage.setItem('name', response.data.name);
                        navigate('/userdashboard')
                    } else {
                        setErrorMessage(response.data.messageIfAny);
                    }
                })
                .catch(error => {
                    console.error("Error during login:", error);
                    setErrorMessage("Error during login");
                });
        }
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>User Login</h2>
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

export default UserLogin;
