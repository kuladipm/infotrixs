import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal ";

const Nav = ({ isLoggedIn, userProfile, onLogout }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => {
    // Handle profile click logic
    // Show user profile details in a modal or any other desired way
    // ...
  };

  const handleLogoClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    // Call the onLogout function passed as a prop
    if (typeof onLogout === "function") {
      onLogout();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          My App
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                className="navbar-profile-button"
                onClick={handleProfileClick}
              >
                {userProfile.username}
              </button>
              <button className="navbar-logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
          <div className="navbar-logo" onClick={handleLogoClick}>
            <img
              src={require('../asset/profile-logo.avif')}
              alt="Logo"
              className="logo"
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ProfileModal
          user={userProfile}
          closeModal={handleModalClose}
        />
      )}
    </nav>
  );
};

export default Nav;
