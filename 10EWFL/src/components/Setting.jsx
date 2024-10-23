import React, { useState } from 'react';

function Setting() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState('default');
  const [privacy, setPrivacy] = useState('public');

  const handleSave = () => {
    // Logic to save settings to the backend or localStorage
    alert('Settings Saved Successfully!');
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success fw-bold mb-3">Settings</h2>
      <hr />

      {/* Account Settings */}
      <div className="mb-4">
        <h4 className="fw-bold">Account Settings</h4>
        <div className="form-group mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="you@example.com"
            disabled
          />
          <small className="text-muted">You can't change your email.</small>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control mb-2" placeholder="********" />
          <button className="btn btn-success b mt-2">Change Password</button>
        </div>
      </div>
      <hr />

      {/* Notification Settings */}
      <div className="mb-4">
        <h4 className="fw-bold">Notification Preferences</h4>
        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="emailNotifications"
            checked={emailNotifications}
            onChange={(e) => setEmailNotifications(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="emailNotifications">
            Enable Email Notifications
          </label>
        </div>

        <div className="form-check form-switch mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="darkMode">
            Enable Dark Mode
          </label>
        </div>
      </div>
      <hr />

      {/* Theme Customization */}
      <div className="mb-4">
        <h4 className="fw-bold">Theme Customization</h4>
        <div className="form-group">
          <label>Choose Theme Color</label>
          <select className="form-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="default">Default</option>
            <option value="blue">Blue</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <hr />

      {/* Privacy Settings */}
      <div className="mb-4">
        <h4 className="fw-bold">Privacy Settings</h4>
        <div className="form-group mb-2">
          <label>Profile Visibility</label>
          <select className="form-select" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends-only">Friends Only</option>
          </select>
        </div>
      </div>

      {/* Save Button */}
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success b" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default Setting;
