import React, { useState, useEffect } from "react";
import CalendarView from "./CalendarView";
import BlogEditor from "./BlogEditor";

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [selectedMenu, setSelectedMenu] = useState("edit-blog");

  // ✅ Hard override global body padding (like from index.css)
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML =
      "body { padding-top: 0 !important; margin: 0 !important; }";
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

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
    <div className="admin-container">
      {loggedIn && (
        <aside className="admin-sidebar">
          <h2>Admin Panel</h2>
          <nav className="nav flex-column mb-auto">
            <button
              className={selectedMenu === "edit-blog" ? "active" : ""}
              onClick={() => setSelectedMenu("edit-blog")}
            >
              Edit Blog
            </button>
            <button
              className={selectedMenu === "calendar" ? "active" : ""}
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

      <main className="admin-main">
        {!loggedIn ? (
          <div className="admin-login-wrapper">
            <div className="admin-login">
              <h2>Login</h2>
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
          </div>
        ) : (
          renderContent()
        )}
      </main>
    </div>
  );
};

export default Admin;
