import { createBrowserRouter } from "react-router-dom";
import blogPosts from "./data/blogData.json";

// Static pages
import Home from "./pages/Home.jsx";
import About from "./pages/AboutUs/About.jsx";
import Testimonials from "./pages/AboutUs/Testimonials.jsx";
import FAQ from "./pages/AboutUs/FAQ.jsx";

import Services from "./pages/Resources/Services.jsx";
import ResourceCalendar from "./pages/CalendarPage.jsx";
import Marketplace from "./pages/Resources/Marketplace.jsx";
import Calculators from "./pages/Resources/Calculators.jsx";
import Blog from "./pages/Resources/Blog.jsx";
import BlogPost from "./pages/Resources/BlogPages/BlogPost.jsx";
import ArticlePages from "./pages/Resources/MarketplacePages/ArticlePages.jsx";

import Contact from "./pages/Contact.jsx";

// Admin pages

import AdminDesign2 from "./AdminDesign2"

// Create the router with static and dynamic routes
export const router = createBrowserRouter([
  // Public routes
  { path: "/", element: <Home /> },
  { path: "/about", element: <About /> },
  { path: "/testimonials", element: <Testimonials /> },
  { path: "/faq", element: <FAQ /> },
  { path: "/services", element: <Services /> },
  { path: "/calendar", element: <ResourceCalendar /> },
  { path: "/marketplace", element: <Marketplace /> },
  { path: "/calculators", element: <Calculators /> },
  { path: "/blog", element: <Blog /> },
  { path: "/contact", element: <Contact /> },

  // Admin routes
  { path: "/admin", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/admin/documents", element: <Documents /> },
  { path: "/admin/calendar", element: <AdminCalendar /> },
  { path: "/admin/inbox", element: <Inbox /> },
  { path: "/article/:slug", element: <ArticlePages /> },
  { path: "/blog/:slug", element: <BlogPost /> }

]);
