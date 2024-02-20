import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavigationBar() {
    const name = sessionStorage.getItem('name');
    const isLoggedIn = !!name; 

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Aashiyana</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                       <Nav.Link href="/userlogin">Login</Nav.Link>
                        
                            <NavDropdown title="Aashiyana it !" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/hotelregister">Hotel Registration</NavDropdown.Item>
                                <NavDropdown.Item href="/hotellogin">Hotel Login</NavDropdown.Item>
                                <NavDropdown.Item href="/userregister">User Register</NavDropdown.Item>
                                <NavDropdown.Item href="/adminlogin">Admin Login</NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                       
                    </Nav>
                    {isLoggedIn && (
                        <Nav.Link href="/userdashboard">Welcome, {name}</Nav.Link>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
