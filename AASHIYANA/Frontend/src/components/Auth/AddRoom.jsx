// import { useState } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function AddRoom() {
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState();
//     const [userData, setUserData] = useState(new FormData());

//     function handleUserInput(event) {
//         let name = event.target.name;
//         let value = event.target.value;

//         if (event.target.type === 'file') {
//             value = event.target.files[0];
//         }

//         if (name === 'roomPrice') {
//             // Convert roomPrice to a number
//             value = parseFloat(value);
//         }

//         setUserData((formData) => {
//             formData.set(name, value);
//             return formData;
//         });
//     }

//     function register(event) {
//         event.preventDefault();
//         axios.post('http://localhost:8080/roomregister', userData)
//             .then(response => {
//                 console.log(response);
//                 console.log(response.data);
//                 if (response.data.status) {
//                     sessionStorage.setItem('roomId', response.data.roomId);
//                     navigate('/hoteldashboard');
//                 } else {
//                     setErrorMessage(response.data.messageIfAny);
//                 }
//             })
//             .catch(error => {
//                 console.error("Axios Error:", error);
//                 if (error.response) {
//                     console.error("Response Data:", error.response.data);
//                 }
//             });
//     }

//     return (
//         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//             <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//                 {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
//                 <h2 style={{ color: '#333', marginBottom: '20px' }}>Add Room</h2>
//                 <form onSubmit={register}>
//                     <div className="form-group">
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Room Type</label>
//                         <select name="typeOfRoom" onChange={handleUserInput} className="form-control">
//                             <option value="Single Room">Single Room</option>
//                             <option value="Deluxe Room">Deluxe Room</option>
//                             <option value="Family Room">Family Room</option>
//                             <option value="Penthouse">Penthouse</option>
//                         </select>

//                     </div>
//                     <div className="form-group" style={{ marginTop: '15px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Room Price</label>
//                         <input type="number" name="roomPrice" className="form-control" onChange={handleUserInput} placeholder="Enter Room Price" />
//                     </div>
//                     <div className="form-group" style={{ marginTop: '15px' }}>
//                         <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Room Image</label>
//                         <input type="file" name="roomImage" className="form-control" onChange={handleUserInput} />
//                     </div>
//                     <div className="form-group" style={{ marginTop: '20px' }}>
//                         <button type="submit" className="btn btn-danger" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ff5252', color: 'white', border: 'none' }}>Add Room</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default AddRoom;




import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddRoom() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();
    const [userData, setUserData] = useState(new FormData());
    const [hotelId, setHotelId] = useState();

    useEffect(() => {
        // Retrieve hotelId from session and set it in the state
        const storedHotelId = sessionStorage.getItem('hotelId');
        setHotelId(storedHotelId);
    }, []);

    function handleUserInput(event) {
        let name = event.target.name;
        let value = event.target.value;

        if (event.target.type === 'file') {
            value = event.target.files[0];
        }

        if (name === 'roomPrice') {
            // Convert roomPrice to a number
            value = parseFloat(value);
        }

        setUserData((formData) => {
            formData.set(name, value);
            return formData;
        });
    }

    function register(event) {
        event.preventDefault();

        // Set hotelId in the form data
        userData.set('hotelId', hotelId);

        axios.post('http://localhost:8080/roomregister', userData)
            .then(response => {
                console.log(response);
                console.log(response.data);
                if (response.data.status) {
                    sessionStorage.setItem('roomId', response.data.roomId);
                    navigate('/hoteldashboard');
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center', width: '400px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                {errorMessage && <h1 style={{ color: 'red' }}>{errorMessage}</h1>}
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Add Room</h2>
                <form onSubmit={register}>
                    <div className="form-group">
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Room Type</label>
                        <select name="typeOfRoom" onChange={handleUserInput} className="form-control">
                            <option value="Single Room">Single Room</option>
                            <option value="Deluxe Room">Deluxe Room</option>
                            <option value="Family Room">Family Room</option>
                            <option value="Penthouse">Penthouse</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Room Price</label>
                        <input type="number" name="roomPrice" className="form-control" onChange={handleUserInput} placeholder="Enter Room Price" />
                    </div>
                    <div className="form-group" style={{ marginTop: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Room Image</label>
                        <input type="file" name="roomImage" className="form-control" onChange={handleUserInput} />
                    </div>
                    <div className="form-group" style={{ marginTop: '20px' }}>
                        <button type="submit" className="btn btn-danger" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#ff5252', color: 'white', border: 'none' }}>Add Room</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRoom;
