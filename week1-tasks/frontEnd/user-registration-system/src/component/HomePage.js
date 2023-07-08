import React from "react";
import { useLocation } from "react-router-dom";
const HomePage = () => {
  const location = useLocation();
  const userData = location.state?.userData || null;
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {userData ? (
        <div>
          <p>User Name: {userData.userName}</p>
          <p>Email: {userData.email}</p>
          <p>Mobile No: {userData.mobileNo}</p>
          <p>Address: {userData.address}</p>
          <p>Picture:</p>
          <div class="profile-picture-container">
            <img
              src={userData.picture}
              alt="Profile Picture"
              class="profile-picture"
            />
          </div>
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default HomePage;
