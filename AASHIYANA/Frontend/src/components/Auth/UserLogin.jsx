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
                        navigate('/')
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
        <h2 style={{ color: '#333', marginBottom: '20px' }}>User Login</h2>
        <form onSubmit={login}>
            <div className="form-group" style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email Address</label>
                <input type="email" name="email" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} onChange={handleInput} />
            </div>
            <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
                <input type="password" name="password" className="form-control" style={{ fontSize: '1.2rem', padding: '10px', width: '100%', borderRadius: '4px' }} onChange={handleInput} />
            </div>
            <div className="form-group">
                <button className="btn btn-danger" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ff5252', color: 'white', border: 'none' }}>Login</button>
            </div>
        </form>
    </div>
</div>

    
    )
}

export default UserLogin;
