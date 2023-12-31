import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegister() {
    
    const navigate = useNavigate();

    // const [errorMessage, setErrorMessage] = useState();

    // const [userData, setUserData] = useState(new FormData());
    const [errorMessage, setErrorMessage] = useState();


    const [userData, setUserData] = useState({
            userName : '',
            dateOfBirth : '',
            gender : '',
            phoneNo : '',
            email : '',
            password : '',
            address : '',
            aadharId : ''
           
    })

    // function handleUserInput(event) {
    //     let name = event.target.name;
    //     let value = event.target.value;
    //     if(event.target.type == 'file')
    //     value = event.target.files[0];
    //     setUserData(formData => {
    //         formData.set(name, value);
    //         return formData;
    //     })        
    // }

    function handleUserInput(event) {
        setUserData(prevData => {
            return {
                ...prevData,
                [event.target.name] : event.target.value
            }
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
        axios.post('http://localhost:8080/userregister', userData).then((response => {
            console.log(response);
            console.log(response.data);
            if(response.data.status) {
                sessionStorage.setItem('userId', response.data.userId);
                navigate('/userlogin')
            }
            else {
                setErrorMessage(response.data.messageIfAny);
            }
        }))
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>User Registration</h2>

            <form onSubmit={register}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="userName" className="form-control" placeholder="Enter Name" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" className="form-control" placeholder="Date of Birth" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <input type="text" name="gender" className="form-control" placeholder="Male, Female, Other" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="number" name="phoneNo" className="form-control" placeholder="Enter Phone Number" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter Email" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter Password" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" placeholder="Enter Address" onChange={handleUserInput} />
                </div>
                {/* <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city.cityName" className="form-control" placeholder="Enter City" onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Pincode</label>
                    <input type="number" name="pincode" className="form-control" placeholder="Enter Pincode" onChange={handleUserInput} />
                </div> */}
                <div className="form-group">
                    <label>Aadhar ID</label>
                    <input type="number" name="aadharId" className="form-control" placeholder="Enter Aadhaar ID" onChange={handleUserInput} />
                </div>
                <button className="btn btn-danger">Signup</button>
            </form>
        </div>
    )
}

export default UserRegister