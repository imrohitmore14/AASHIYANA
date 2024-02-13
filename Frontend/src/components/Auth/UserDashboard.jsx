import { Button } from "bootstrap";
import { Link } from "react-router-dom";

function UserDashboard() {

    const userId = sessionStorage.getItem('userId');

    return (
        <div>
            <h1>Registration Done!</h1>
            <h2>Your registered User id is : {userId} </h2>
            <Link to="/UpdateUser">Update Hotel</Link>

        </div>
    )
}

export default UserDashboard