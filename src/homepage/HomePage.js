import React, { useContext } from 'react';
import userContext from '../auth/userContext';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
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
              <div className='authButtonGroup mt-4 mb-1'>
                <Link to='/login' style={{ textDecoration: 'none' }}>
                  <Button className='homePageButton' variant='light'>
                    Login
                  </Button>
                </Link>
                <Link to='/signup' style={{ textDecoration: 'none' }}>
                  <Button className='homePageButton' href='/signup' variant='light'>
                    Sign Up
                  </Button>
                </Link>
              </div>
              <Button
                className='guestLoginButton btn-link'
                onClick={() => login({ username: 'guest', password: 'password' })}
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