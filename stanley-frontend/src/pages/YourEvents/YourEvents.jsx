import React, { useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { eventList } from "../../utils/EventDatabase.jsx";
import "./YourEvents.css";

const AUTH_KEY = "stanley_auth";

export default function YourEvents() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem(AUTH_KEY) === "true"
  );

  const [mode, setMode] = useState("login");

  const handleAuth = (e) => {
    e.preventDefault();
    localStorage.setItem(AUTH_KEY, "true");
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setMode("login");
  };

  /* ============================
     AUTH VIEW (SIGN IN / SIGN UP)
     ============================ */
  if (!authenticated) {
    return (
      <div className="page-container">
        <Navigation />

        <div className="auth-wrapper">
          <div className="auth-card">

            <h1 className="auth-title">
              {mode === "login" ? "Sign in" : "Sign up"}
            </h1>

            <form className="auth-form" onSubmit={handleAuth}>
              <label className="auth-label">Email</label>
              <input
                className="auth-input"
                type="email"
                placeholder="Your email"
                required
              />
              <button className="auth-btn">Continue</button>
            </form>

            <p className="auth-toggle">
              {mode === "login" ? (
                <>
                  Don’t have an account?{" "}
                  <span onClick={() => setMode("signup")} className="toggle-link">
                    Sign up
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span onClick={() => setMode("login")} className="toggle-link">
                    Sign in
                  </span>
                </>
              )}
            </p>

          </div>
        </div>
      </div>
    );
  }

  /* ============================
           AUTHENTICATED VIEW
     ============================ */
  return (
    <div className="page-container">
      <Navigation />

      <main className="your-events-page">
        <div className="header-row">
          <h2 className="your-events-title">Your Events</h2>
          <button className="logout-btn" onClick={handleLogout}>Log out</button>
        </div>

        <section className="events-section">
          <ul className="events-list">
            {eventList.map((ev) => (
              <li key={ev.id} className="event-card">
                <div className="event-left">
                  <h3 className="event-heading">{ev.heading}</h3>
                  <p className="event-date">
                    {ev.date.month} {ev.date.year}
                  </p>
                  <p className="event-location">{ev.location}</p>
                  <p className="event-description">{ev.description}</p>
                </div>

                <div className="event-right">
                  <img className="event-img" src={ev.img} alt={ev.heading} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
