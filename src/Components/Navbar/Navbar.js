/* eslint-disable react/prop-types */
/* eslint-disable semi */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './navbar.module.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NavbarComponent = ({ name, setName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('username');
    if (!Cookies.get('accessToken')) {
      setName('');
      navigate('/login');
    }
  };
  return (
    <React.Fragment>
      <Navbar className={styles.navbar} sticky="top">
        <Container>
          <Navbar.Brand href="/home" className={styles.navbarTitle}>
            Mera RooMate
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home" className={styles.navbarHeading}>
              Home
            </Nav.Link>
            <Nav.Link href="/" className={styles.navbarHeading}>
              Exclusive Offers
            </Nav.Link>
            <Nav.Link href="/" className={styles.navbarHeading}>
              Pricing
            </Nav.Link>
          </Nav>
          <NavDropdown
            title={name}
            id="basic-nav-dropdown"
            className={styles.navbarDropdown}
          >
            <NavDropdown.Item>Hi!! {name}</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default NavbarComponent;
