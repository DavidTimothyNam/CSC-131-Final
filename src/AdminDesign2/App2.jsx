import React, { useState } from "react";
import MyNavbar from "../components/Navbar.jsx";
import AdminDesign2 from './AdminDesign2';

function App2() {
  return (
    <Router>
      <Routes>
        <Route path="/design2" element={<AdminDesign2 />} />
      </Routes>
    </Router>
  );
}

export default App2;

