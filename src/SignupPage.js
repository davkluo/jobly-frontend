import React from 'react';
import UserForm from './UserForm';
import Col from 'react-bootstrap/Col';
import "./SignupPage.css"

/** User signup page
 *
 * Props:
 * - signup
 *
 * RoutesList -> SignupPage -> UserForm
 */

function SignupPage({ signup }) {
  const prompts = [
    {
      label: 'Username',
      name: 'username'
    },
    {
      label: 'Password',
      name: 'password'
    },
    {
      label: 'First Name',
      name: 'firstName'
    },
    {
      label: 'Last Name',
      name: 'lastName'
    },
    {
      label: 'Email',
      name: 'email'
    }
  ];

  return (
    <div>
      <Col
        className="SignupPage d-flex flex-column mx-auto py-4 px-4 mt-4 mb-3 bg-dark"
        xs={11}
        sm={8}
        md={6}
        xl={4}
      >
        <h1>Sign Up</h1>
        <hr/>
        <UserForm submit={signup} prompts={prompts} />
      </Col>
    </div>
  );
}

export default SignupPage;