import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Contact Tracker</h1>
        <p>Manage your contacts efficiently and securely</p>
        <div className="home-actions">
          <Link to="/login" className="btn btn-primary">
            Sign In
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home; 