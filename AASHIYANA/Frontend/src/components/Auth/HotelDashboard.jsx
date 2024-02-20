import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HotelDashboard() {
    const hotelId = sessionStorage.getItem('hotelId');
    const name = sessionStorage.getItem('name');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState();
    const [rooms, setRooms] = useState([]);

    // Fetch list of rooms on component mount
    useEffect(() => {
        axios.get(`http://localhost:8080/rooms/fetchAllRooms/${hotelId}`)
            .then(response => {
                setRooms(response.data);
            })
            .catch(error => {
                console.error("Error fetching rooms:", error);
            });
    }, [hotelId]);

    const handleEditClick = () => {
        navigate('/hotelupdate');
    };

    // const handleDeleteClick = () => {
    //     axios.delete(`http://localhost:8080/hoteldelete/${hotelId}`)
    //         .then(response => {
    //             console.log(response.data);
    //             if (response.data.status) {
    //                 setErrorMessage(null);
    //                 navigate('/');
    //             } else {
    //                 setErrorMessage(response.data.messageIfAny);
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error during user account deletion:", error);
    //             setErrorMessage("Error during user account deletion");
    //         });
    // };

    const handleAddRoomClick = () => {
        navigate('/addRoom');
    };

    const handleDeleteRoomClick = (roomId) => {
        axios.delete(`http://localhost:8080/roomdelete/${roomId}`)
            .then(response => {
                setRooms(prevRooms => prevRooms.filter(room => room.roomId !== roomId));
            })
            .catch(error => {
                console.error("Error during room deletion:", error);
                // Handle error if needed
            });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <div style={{ textAlign: 'center', width: '80%', maxWidth: '800px', backgroundColor: '#f4f4f4', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: 'auto' }}>
                <h1 style={{ color: '#2196f3' }}>Registration Done!</h1>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Your registered Hotel id is: {hotelId}</h2>
                <h2 style={{ color: '#333', marginBottom: '20px' }}>Your Hotel name: {name}</h2>

                <div>
                    <h2>Rooms:</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Room Type</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Price (INR)</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Booking Status</th>
                                <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(room => (
                                <tr key={room.roomId}>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{room.typeOfRoom}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>{room.roomPrice.toFixed(2)}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px', color: room.status === 'No' ? 'green' : 'red' }}>
                                        {room.status === 'No' ? 'Available' : 'Booked'}
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                        <button onClick={() => handleDeleteRoomClick(room.roomId)} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={handleAddRoomClick} className="btn btn-success" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#4caf50', color: 'white', border: 'none', marginRight: '10px', marginTop: '10px' }}>
                    Add Room
                </button>
                <button onClick={handleEditClick} className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#4caf50', color: 'white', border: 'none', marginRight: '10px', marginTop: '10px' }}>
                    Edit Hotel Details
                </button>
            </div>
        </div>
    );
}

export default HotelDashboard;
