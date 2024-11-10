import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./welcomeHeader.css";
import { Button } from 'react-bootstrap';
const WelcomeHeader = () => {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">LoveGift</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as = {Link} to ="/login" className='nav-link' id='login'>Login</Nav.Link>
            <Nav.Link as = {Link} to ="/register" className='nav-link' id='register'>Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    );
};

export default WelcomeHeader;