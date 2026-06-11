import { Link } from "react-router-dom";
import "./Navigation.css";
import logo from "../../assets/logo.png";
import { useState } from "react";


const Navigation = () => {
  const [loggedIn, setLoggedIn] = useState(false); // dummy login
  return (
    <nav className="navbar">
      <div className="nav-inner">

        {/* LEFT SIDE — Logo + Title */}
        <div className="nav-left">
          <img src={logo} alt="Stanley College Logo" className="nav-logo" />
         {/*<span className="nav-title">Stanley Events</span>*/}
        </div>

        {/* CENTER — Navigation Links */}
        <ul className="nav-links">
          <li>
            <Link to="/find-events">Home</Link>
          </li>
          <li>
            <Link to="/your-events">Your Events</Link>
          </li>
        </ul>

        {/* RIGHT SIDE — Dummy Buttons */}
        <div className="nav-right">
          <button className="btn signup-btn">Sign up</button>
          <button className="btn login-btn">Log in</button>
        </div>

      </div>
    </nav>
  );
};

export default Navigation;
