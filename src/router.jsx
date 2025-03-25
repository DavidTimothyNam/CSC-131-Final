import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home.jsx";

import About from "./pages/AboutUs/About.jsx";
import Testimonials from "./pages/AboutUs/Testimonials.jsx";
import FAQ from "./pages/AboutUs/FAQ.jsx";

import Services from "./pages/Resources/Services.jsx";
import Calendar from "./pages/Resources/Calendar.jsx";
import Marketplace from "./pages/Resources/Marketplace.jsx";
import Calculators from "./pages/Resources/Calculators.jsx";
import Blog from "./pages/Resources/Blog.jsx";

import Contact from "./pages/Contact.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/testimonials", element: <Testimonials /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/services", element: <Services /> },
  { path: "/calendar", element: <Calendar /> },
  { path: "/marketplace", element: <Marketplace /> },
  { path: "/calculators", element: <Calculators /> },
  { path: "/blog", element: <Blog /> },

  { path: "/contact", element: <Contact /> },
]);
