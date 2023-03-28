import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BriefcaseFill } from 'react-bootstrap-icons';
import './JoblyNav.css';

import userContext from "./userContext";

/** Renders JoblyNav Bar Component
 *
 * Props:
 * - logout: Function to log user out
 *
 * App -> JoblyNav
 */
function JoblyNav({ logout }) {
  const { user } = useContext(userContext);

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">
          <BriefcaseFill />
          Jobly
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="jobly-navbar" />
        <Navbar.Collapse id="jobly-navbar">
          <Nav className="ms-auto">
            {!user.isLoggedIn && (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
            {user.isLoggedIn && (
              <>
                <Nav.Link href="/companies">Companies</Nav.Link>
                <Nav.Link href="/jobs">Jobs</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Button
                  className='logoutBtn'
                  onClick={logout}
                  variant="light"
                >{`Logout: ${user.data.firstName}`}</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default JoblyNav;
