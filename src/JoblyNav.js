import React, { useContext } from "react";
// import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from 'react-router-dom';
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
                <NavLink className="nav-link" to="/login">Login</NavLink>
                <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
              </>
            )}
            {user.isLoggedIn && (
              <>
                <NavLink className="nav-link" to="/companies">Companies</NavLink>
                <NavLink className="nav-link" to="/jobs">Jobs</NavLink>
                <NavLink className="nav-link" to="/profile">Profile</NavLink>
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
