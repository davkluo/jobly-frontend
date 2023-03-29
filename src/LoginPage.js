import React from 'react';
import UserForm from './UserForm';
import Col from 'react-bootstrap/Col';
import "./LoginPage.css";

/** User login page
 *
 * Props:
 * - login
 *
 * RoutesList -> LoginPage -> UserForm
 */

function LoginPage({ login }) {

  const prompts = [
    {
      label: "Username",
      name: "username"
    },
    {
      label: 'Password',
      name: 'password'
    }
  ];

  return (
    <div>
      <Col
        className="LoginPage d-flex flex-column mx-auto py-4 px-4 mt-4 mb-3 bg-dark"
        xs={11}
        sm={8}
        md={6}
        xl={4}
      >
        <h1>Login</h1>
        <hr/>
        <UserForm submit={login} prompts={prompts} />
      </Col>
    </div>
  );
}

export default LoginPage;