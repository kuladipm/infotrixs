import React, { useState } from "react";

const ProfileModal = ({ user, closeModal }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMobile] = useState(user.mobile);
  const [address, setAddress] = useState(user.address);

  const handleUpdateProfile = () => {
    // Perform the update profile logic here
    // You can use the useState setters (setName, setEmail, etc.) to update the user data
  };

  return (
    <div className="profile-modal">
      <div className="profile-modal-content">
        <h2>Profile</h2>
        <div className="profile-picture">
          <img src={user.profilePicture} alt="Profile" />
        </div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Mobile No:</label>
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
        <label>Address:</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={handleUpdateProfile}>Update Profile</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
