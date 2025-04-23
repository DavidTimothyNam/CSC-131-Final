import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Files from "./Files";
import Inbox from "./Inbox";
import CalendarView from "./CalendarView";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) setLoggedIn(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "files":
        return <Files />;
      case "inbox":
        return <Inbox />;
      case "calendar":
        return <CalendarView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex vh-100"> {/* Container with flex layout */}
      {loggedIn && (
        <aside className="bg-dark text-white p-3" style={{ width: 250 }}>
          {/* Sidebar */}
          <h2 className="h4 mb-4">Admin Panel</h2>
          <nav className="nav flex-column">
            {["dashboard", "files", "inbox", "calendar"].map((key) => (
              <button
                key={key}
                className="btn btn-dark text-start" // Styled button for navigation
                onClick={() => setSelectedMenu(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} {/* Capitalize the menu item */}
              </button>
            ))}
          </nav>
        </aside>
      )}

      <main
        className={`flex-grow-1 d-flex align-items-center justify-content-center ${
          loggedIn ? "bg-light" : ""
        }`}  // Center the content and apply background color when logged in
      >
        {!loggedIn ? (
          <div className="card p-4" style={{ width: 350 }}>
            {/* Login Form */}
            <h2 className="card-title text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
};

export default Admin;
