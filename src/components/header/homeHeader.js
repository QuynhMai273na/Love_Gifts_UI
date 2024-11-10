import {Container, Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import "./homeHeader.css";
import { Button } from 'react-bootstrap';
const HomeHeader = () => {
    return (
        <>
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="/home">LoveGift</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as = {Link} to ="/home/gift" className='nav-link' id='gift'>Gift</Nav.Link>
            <Nav.Link as = {Link} to ="/home/task" className='nav-link' id='task'>Task</Nav.Link>
            <Nav.Link as = {Link} to ="/home/profile" className='nav-link' id='profile'>Profile</Nav.Link>
            <Nav.Link as = {Link} to ="/" className='nav-link' id='logout'>Log out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </>
    );
};

export default HomeHeader;