import React, { useContext } from 'react';
import userContext from './userContext';
// import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './HomePage.css';

function HomePage({ login }) {
  const { user } = useContext(userContext);

  return (
    <div className='HomePage'>
      <div className='homePageBanners'>
        <div className='joblyHomeBanner bg-dark mb-4'>
          <h1>Jobly</h1>
          <h2>All the jobs in one, convenient place.</h2>
          {!user.isLoggedIn &&
            <>
              <div class='authButtonGroup mt-4 mb-1'>
                <Button className='homePageButton' href='/login' variant='dark'>Login</Button>
                <Button className='homePageButton' href='/signup' variant='dark'>Sign Up</Button>
              </div>
              <Button
                className='guestLoginButton btn-link'
                onClick={() => login({ username: 'guest', password: 'password' })}
                variant='dark'
              >
                View As Guest
              </Button>
            </>
          }
        </div>
        {user.isLoggedIn &&
          <div className='welcomeMessage'>
            <h2>Welcome Back, {user.data.firstName}</h2>
          </div>
        }
      </div>
    </div>
  );
}

export default HomePage;