import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../homepage/HomePage';
import CompaniesPage from '../companies/CompaniesPage';
import JobsPage from '../jobs/JobsPage';
import LoginPage from '../auth/LoginPage';
import SignupPage from '../auth/SignupPage';
import ProfilePage from '../profile/ProfilePage';
import CompanyDetailPage from '../companies/CompanyDetailPage';

import userContext from '../auth/userContext';

/** App Routes
 *
 * Props:
 * - signup: Function to register a user
 * - login: Function to authenticate a user
 *
 * App -> RoutesList
 */
function RoutesList({ signup, login }) {
  const { user } = useContext(userContext);

  return (
    <Routes>
      <Route path="/" element={ <HomePage login={ login }/> }/>
      { !user.isLoggedIn &&
        <>
          <Route path="/login" element={ <LoginPage login={ login }/> }/>
          <Route path="/signup" element={ <SignupPage signup={ signup }/> }/>
        </>
      }

      { user.isLoggedIn &&
        <>
          <Route path="/profile" element={ <ProfilePage/> }/>
          <Route path="/companies" element={ <CompaniesPage/> }/>
          <Route path="/jobs" element={ <JobsPage/> }/>
          <Route path="/companies/:handle" element={ <CompanyDetailPage/> }/>
        </>
      }

      <Route path="*" element={ <Navigate to='/'/> }/>
    </Routes>
  )
}

export default RoutesList