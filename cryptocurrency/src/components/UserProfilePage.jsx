import React, { useState } from 'react';
import './UserProfilePage.css';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  const { notifications, addNotification } = useNotification();
  const [formData, setFormData] = useState({
    fullname: currentUser ? currentUser.name : '',
    password: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleUpdateProfile = () => {
    if (currentUser) {
      const updatedUser = { ...currentUser, name: formData.fullname, password: formData.password };
      updateUser(updatedUser);
      toast.success('Profile updated successfully!');
    }
  };

  return (
    <div className="user-profile-page">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <h2>USER PROFILE</h2>
      {currentUser ? (
        <div className="user-info">
          <div className="info-item">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={currentUser.name} disabled />
          </div>
          <div className="info-item">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={currentUser.email} disabled />
          </div>
          <div className="info-item">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" id="fullname" value={formData.fullname} onChange={handleChange} />
          </div>
          <div className="info-item">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="info-item">
            <button onClick={handleUpdateProfile}>UPDATE PROFILE</button>
          </div>
        </div>
      ) : (
        <p>No user is logged in</p>
      )}
      {/* Display stored notifications */}
      <div className="activity-history">
        <h3>Activity History</h3>
        <ul>
          {notifications.slice(0).reverse().map((notification) => ( // Reverse the order of notifications
            <li key={notification.id} className={`notification ${notification.type}`}>
              <div className="notification-content">
                <span className="timestamp">{notification.message.split('\n')[0]}</span>
                <span className="message">{notification.message.split('\n')[1]}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;
