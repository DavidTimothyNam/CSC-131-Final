import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/AboutUs/About.jsx";
import Testimonials from "./pages/AboutUs/Testimonials.jsx";
import FAQ from "./pages/AboutUs/FAQ.jsx";

import Services from "./pages/Resources/Services.jsx";
import ResourceCalendar from "./pages/Resources/ResourceCalendar.jsx"; // Resource calendar component
import Marketplace from "./pages/Resources/Marketplace.jsx";
import Calculators from "./pages/Resources/Calculators.jsx";
import Blog from "./pages/Resources/Blog.jsx";

import Contact from "./pages/Contact.jsx";

// Import Admin pages
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Documents from "./admin/Documents"; // Import Documents
import AdminCalendar from "./admin/AdminCalendar"; // Admin Calendar Section
import Inbox from "./admin/Inbox"; // Import Inbox

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/testimonials", element: <Testimonials /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/services", element: <Services /> },
  { path: "/calendar", element: <ResourceCalendar /> }, // Resource Calendar Route
  { path: "/marketplace", element: <Marketplace /> },
  { path: "/calculators", element: <Calculators /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },

  // Admin Routes
  { path: "/admin", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/documents", element: <Documents /> }, //* Documents Section */}
  { path: "/admin/calendar", element: <AdminCalendar /> }, //* Admin Calendar Section */}
  { path: "/admin/inbox", element: <Inbox /> }, //* Inbox Section */}
]);
