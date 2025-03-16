import React, { useState, useEffect } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import LogoutModal from "./LogoutModal";

const Header = () => {
  const savedIsChecked = localStorage.getItem("darkModeOn");
  const [darkModeOn, setDarkModeOn] = useState(
    savedIsChecked !== null ? JSON.parse(savedIsChecked) : false
  );
  const [theme, setTheme] = useState("night");

  // Update local storage when darkModeOn changes
  useEffect(() => {
    localStorage.setItem("darkModeOn", JSON.stringify(darkModeOn));
  }, [darkModeOn]);

  return (
    <div className="navbar bg-neutral shadow-sm flex gap-2 px-10 py-5">
      {/* Logo */}
      <div className="w-1/5">
        <a href="/" className="text-xl text-white font-bold">
          Shop Smart
        </a>
      </div>

      {/* Search Box */}
      <div className="flex-1  w-3/5">
        <input
          type="search"
          placeholder="Search"
          className="input input-bordered w-full"
        />
      </div>

      {/* Header Buttons */}

      <div className="navbar-end flex gap-2 w-1/5 ">
        <LoginModal />
        <SignupModal />
        <LogoutModal />
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />{" "}
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        <div>
          <label className="toggle text-base-content">
            <input
              type="checkbox"
              value={theme}
              checked={darkModeOn}
              onChange={(e) => {
                setDarkModeOn(!darkModeOn);
                setTheme(e.target.value);
              }}
              className="theme-controller"
            />

            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Header;
