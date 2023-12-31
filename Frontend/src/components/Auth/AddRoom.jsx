import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function AddRoom() {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState();

    const [userData, setUserData] = useState(new FormData());

    function handleUserInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (event.target.type === 'file') {
            value = event.target.files[0];
        }
        if (name === 'price') {
            // Convert price to a number
            value = parseFloat(value);
        }
        setUserData((formData) => {
            formData.set(name, value);
            return formData;
        });
    }

    function register(event) {
        event.preventDefault();
        axios.post('http://localhost:8080/roomregister', userData)
            .then(response => {
                console.log(response);
                console.log(response.data);
                if (response.data.status) {
                    sessionStorage.setItem('roomId', response.data.roomId);
                    navigate('/addRoom');
                } else {
                    setErrorMessage(response.data.messageIfAny);
                }
            })
            .catch(error => {
                console.error("Axios Error:", error);
                if (error.response) {
                    console.error("Response Data:", error.response.data);
                }
            });
    }


    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>Add Room </h2>

            <form onSubmit={register}>
                <div className="form-group">
                    <label> Room Type </label> <br />
                    <select name="typeOfRoom" onChange={handleUserInput}>
                        <option value="Single Room">Single Room</option>
                        <option value="Deluxe Room">Deluxe Room</option>
                        <option value="Family Room">Family Room</option>
                        <option value="Penthouse">Penthouse</option>
                    </select>
                </div> <br />
                <div className="form-group">
                    <label>Room Price</label> <br />
                    <input type="number" name="roomPrice" className="form-control" onChange={handleUserInput} /> <br />
                </div>
                <div className="form-group">
                    <label>Room Image</label> <br />
                    <input type="file" name="roomImage" className="form-control" onChange={handleUserInput} /> <br />
                </div> <br />
                <button className="btn btn-danger">Add Room</button>
            </form>
        </div>
    )
}

export default AddRoom