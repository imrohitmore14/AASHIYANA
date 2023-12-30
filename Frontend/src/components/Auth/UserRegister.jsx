import { useState } from "react";
import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";

function UserRegister() {
    
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
    //   setErrorMessage('Invalid email address');
    //   return;
    // }


    // // Basic password validation (at least 6 characters)
    // if (password.length < 6) {
    //   setErrorMessage('Password must be at least 6 characters');
    //   return;
    // }


    // // Clear any previous error
    // setError('');

    function register(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/user/register', userData).then((response => {
            console.log(response);
            console.log(response.data);
            if(response.data.status) {
                sessionStorage.setItem('userId', response.data.userId);
                navigate('/userregistrationconfirmation')
            }
            else {
                setErrorMessage(response.data.messageIfAny);
            }
        }))
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <form onSubmit={register}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="userName" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <input type="email" name="gender" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="number" name="phoneNo" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city.city_name" className="form-control" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Pincode</label>
                    <input type="number" name="city.pincode" className="form-control" onChange={handleUserInput} />
                </div>
                <button className="btn btn-danger">Signup</button>
            </form>
        </div>
    )
}

export default UserRegister