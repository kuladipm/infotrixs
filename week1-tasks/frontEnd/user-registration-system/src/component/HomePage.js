import React from "react";
import { useLocation } from "react-router-dom";
import Button from "./sharedComponent/Button";
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData || null;
  console.log(userData)
  const editProfileHandler=()=>{
    navigate('/update',{state:{userData}})
  }
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {userData ? (
        <div>
          <div>
            <div className="card">
              <div className="image">
                <img
                  src={userData.picture}
                  alt="Profile Picture"
                  className="profile-picture-container"
                />
              </div>
              <h3>User Name: {userData.userName}</h3>
              <h4>Email: {userData.email}</h4>
              <h4>Mobile No: {userData.mobileNo}</h4>
              <h4>Address: {userData.address}</h4>
              <Button label="Edit" type="submit" onClick={editProfileHandler} />
            </div>
          </div>
          
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
};

export default HomePage;
