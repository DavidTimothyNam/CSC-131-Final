import React, { useState } from "react";
import CalendarView from "./CalendarView";
import BlogEditor from "./BlogEditor"; // Import the blog editor component

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [selectedMenu, setSelectedMenu] = useState("edit-blog"); // Default to Edit Blog

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      setLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "calendar":
        return <CalendarView />;
      case "edit-blog":
        return <BlogEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="d-flex vh-100">
      {loggedIn && (
        <aside className="bg-dark text-white p-3 d-flex flex-column" style={{ width: 250 }}>
          <h2 className="h4 mb-4">Admin Panel</h2>
          <nav className="nav flex-column mb-auto">
            <button
              className={`btn btn-dark text-start mb-2 ${selectedMenu === "edit-blog" ? "fw-bold text-warning" : ""}`}
              onClick={() => setSelectedMenu("edit-blog")}
            >
              Edit Blog
            </button>
            <button
              className={`btn btn-dark text-start ${selectedMenu === "calendar" ? "fw-bold text-warning" : ""}`}
              onClick={() => setSelectedMenu("calendar")}
            >
              Calendar
            </button>
          </nav>
          <button className="btn btn-outline-light mt-3" onClick={handleLogout}>
            Logout
          </button>
        </aside>
      )}

      <main
        className={`flex-grow-1 d-flex align-items-center justify-content-center ${
          loggedIn ? "bg-light" : ""
        }`}
      >
        {!loggedIn ? (
          <div className="card p-4" style={{ width: 350 }}>
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
