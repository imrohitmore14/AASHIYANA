import { Link } from "react-router-dom";

function HotelDashboard() {

    const hotelId = sessionStorage.getItem('hotelId');

    return (
        <div>
            <h1>Registration Done!</h1>
            <h2>Your registered Hotel id is : {hotelId} </h2>
            <Link to="/UpdateHotel">Update Hotel</Link>
        </div>
    )
}

export default HotelDashboard