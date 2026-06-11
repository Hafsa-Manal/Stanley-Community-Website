// src/routes/routes.jsx
import React from "react";
import FilterEvents from "../pages/FilterEvents/FilterEvents";
import EventDetails from "../pages/EventDetails/EventDetails";
import YourEvents from "../pages/YourEvents/YourEvents";
import { Navigate } from "react-router-dom";

/**
 * Simple NotFound component (optional)
 * You can style or move to its own file later.
 */
const NotFound = () => (
  <div style={{ padding: 40 }}>
    <h2>Page not found</h2>
    <p>The page you were looking for does not exist.</p>
    <p><a href="/">Return home</a></p>
  </div>
);

export const routes = [
  { path: "/", element: <FilterEvents /> },            // home = events list
  { path: "/events", element: <FilterEvents /> },     // kept for consistency
  { path: "/find-events", element: <FilterEvents /> },// <-- ADDED to match your link
  { path: "/events/:id", element: <EventDetails /> },
  { path: "/your-events", element: <YourEvents /> },

  // wildcard / not found (redirect to home)
  { path: "*", element: <Navigate to="/" replace /> },
];
