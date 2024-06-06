// components/UserProfilePage.jsx
import React from 'react';
import './UserProfilePage.css';
import { useAuth } from './AuthContext';
import { useNotification } from './NotificationContext';

const UserProfilePage = () => {
  const { currentUser } = useAuth(); // Get the current user from AuthContext
  const { notifications } = useNotification(); // Get notifications from NotificationContext

  return (
    <div className="user-profile-page">
      <h2>User Profile</h2>
      {currentUser ? (
        <div className="user-info">
          <div className="info-item">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={currentUser.name} disabled />
          </div>
          <div className="info-item">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={currentUser.email} disabled />
          </div>
          <div className="info-item">
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" value={currentUser.name} />
          </div>
          <div className="info-item">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" />
          </div>
          <div className="info-item">
            <button>Update Profile</button>
          </div>
        </div>
      ) : (
        <p>No user is logged in</p>
      )}
      <div className="activity-history">
        <h3>Activity History</h3>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message} at {notification.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfilePage;
