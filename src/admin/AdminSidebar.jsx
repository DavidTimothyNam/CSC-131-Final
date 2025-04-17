import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const AdminSidebar = () => {
  return (
    <div style={sidebarStyle}>
      <h3>Admin Menu</h3>
      <ul style={listStyle}>
        <li>
          <Link to="/admin/dashboard" style={linkStyle}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/documents" style={linkStyle}> {/* Updated to Documents */}
            Documents
          </Link>
        </li>
        <li>
          <Link to="/admin/calendar" style={linkStyle}> {/* Updated to Calendar */}
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/admin/inbox" style={linkStyle}> {/* Updated to Inbox */}
            Inbox
          </Link>
        </li>
        <li>
          <Link to="/" style={linkStyle}> {/* Link to Home page */}
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Styles
const sidebarStyle = {
  width: "250px",
  padding: "20px",
  backgroundColor: "#f4f4f4",
  position: "fixed",
  top: "0",
  left: "0",
  height: "100%",
  boxShadow: "2px 0px 5px rgba(0,0,0,0.1)"
};

const listStyle = {
  listStyleType: "none",
  paddingLeft: "0",
};

const linkStyle = {
  textDecoration: "none",
  color: "#0055ff",
  padding: "10px",
  display: "block",
  marginBottom: "10px",
  borderRadius: "4px",
  transition: "background-color 0.3s",
};

export default AdminSidebar;
