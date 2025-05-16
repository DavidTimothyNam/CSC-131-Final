import { createBrowserRouter } from "react-router-dom";

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
import Search from "./pages/SearchPage.jsx";

import Contact from "./pages/Contact.jsx";

import PageNotFound from "./pages/404Page.jsx";
// Admin-related pages
import PrivateRoute from "./admin/PrivateRoute.jsx";
import Admin from "./admin/Admin";
import Login from "./admin/Login";

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
  { path: "/search", element: <Search /> },
  //
  { path: "*", element: <PageNotFound /> },

  // Admin routes
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
  },
  { path: "/article/:slug", element: <ArticlePages /> },
  { path: "/marketplace/:slug", element: <ArticlePages /> },
  { path: "/blog/:slug", element: <BlogPost /> },
  { path: "/login", element: <Login /> },
]);
