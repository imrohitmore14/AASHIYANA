import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateHotel() {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState();
    const [userData, setUserData] = useState(new FormData());
    const [hotelData, setHotelData] = useState({});
    const hotelId = sessionStorage.getItem('hotelId');

    useEffect(() => {
        // Fetch the current hotel details when the component mounts
        axios.get(`http://localhost:8080/hotels/${hotelId}`).then(response => {
            setHotelData(response.data);
        }).catch(error => {
            console.error('Error fetching hotel data:', error);
        });
    }, [hotelId]);

    function handleUserInput(event) {
        let name = event.target.name;
        let value = event.target.value;
        if (event.target.type === 'file') {
            value = event.target.files[0];
        }
        setUserData(formData => {
            formData.set(name, value);
            return formData;
        });
    }

    function updateHotel(event) {
        event.preventDefault();
        axios.put(`http://localhost:8080/hotels/${hotelId}`, userData).then(response => {
            console.log(response);
            console.log(response.data);
            if (response.data.status) {
                navigate('/hotelDashboard');
            } else {
                setErrorMessage(response.data.messageIfAny);
            }
        }).catch(error => {
            console.error('Error updating hotel:', error);
        });
    }

    return (
        <div>
            {errorMessage && <h1>{errorMessage}</h1>}
            <h2>Update Hotel Details</h2>

            <form onSubmit={updateHotel}>
                <div className="form-group">
                    <label>Hotel Name</label>
                    <input type="text" name="hotelName" className="form-control" value={hotelData.hotelName || ''} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Hotel Description</label>
                    <input type="text" name="hotelDescription" className="form-control" value={hotelData.hotelDescription || ''} onChange={handleUserInput} />
                </div>
                <div className="form-group">
                    <label>Hotel Image</label>
                    <input type="file" name="hotelImages" className="form-control" onChange={handleUserInput} />
                </div>
                {/* Add more fields for other details */}
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default UpdateHotel;
