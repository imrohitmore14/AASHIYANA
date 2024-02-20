import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

const AdminDashboard = () => {
  const [hotels, setHotels] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/admin/hotels')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => {
        console.log('Error fetching hotels:', error);
      });

    axios.get('http://localhost:8080/admin/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log('Error fetching users:', error);
      });

    // Fetch admin name
    axios.get('/admin/fetchAdminName') // Assuming this endpoint exists to fetch admin name
      .then(response => {
        setAdminName(response.data.adminName);
      })
      .catch(error => {
        console.log('Error fetching admin name:', error);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/adminlogin');
  };

  const handleDeleteHotel = (hotelId) => {
    axios.delete(`http://localhost:8080/hoteldelete/${hotelId}`)
      .then(response => {
        // Remove the deleted hotel from the state
        setHotels(prevHotels => prevHotels.filter(hotel => hotel.hotelId !== hotelId));
      })
      .catch(error => {
        console.log('Error deleting hotel:', error);
      });
  };

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:8080/userdelete/${userId}`)
      .then(response => {
        // Remove the deleted user from the state
        setUsers(prevUsers => prevUsers.filter(user => user.userId !== userId));
      })
      .catch(error => {
        console.log('Error deleting user:', error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h1>Admin Dashboard</h1>
                  <h3>Hello, {adminName}</h3>
                </Col>
                <Col md={6} className="text-md-right">
                  <Button className="btn btn-danger" onClick={handleLogout} variant="secondary">Logout</Button>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md={6}>
                  <h2>Hotels</h2>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Hotel Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotels.map(hotel => (
                        <tr key={hotel.hotelId}>
                          <td>{hotel.hotelName}</td>
                          <td>
                            <Button onClick={() => handleDeleteHotel(hotel.hotelId)} variant="danger">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={6}>
                  <h2>Users</h2>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>User Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.userId}>
                          <td>{user.userName}</td>
                          <td>
                            <Button onClick={() => handleDeleteUser(user.userId)} variant="danger">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
