import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarView from "./CalendarView";
import BlogEditor from "./BlogEditor";

const Admin = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("edit-blog");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthed(true);
    }
  }, [navigate]);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML =
      "body { padding-top: 0 !important; margin: 0 !important; }";
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthed(false);
    navigate("/");
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

  if (!isAuthed) return null;

  return (
    <div className="admin-container">
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
          <button onClick={() => window.open("/", "_blank")}>View Site</button>
        </nav>
        <button className="btn btn-outline-light mt-3" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-main">{renderContent()}</main>
    </div>
  );
};

export default Admin;
