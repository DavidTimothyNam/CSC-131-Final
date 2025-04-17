import React, { useState } from "react";
import MyNavbar from "./components/Navbar";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false); // Log out by resetting the state
  };

  return (
    <div>
      <MyNavbar />
      {isLoggedIn ? (
        <div>
          <AdminDashboard />
          <button onClick={handleLogout}>Logout</button> {/* Logout button */}
        </div>
      ) : (
        <AdminLogin onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default App;

