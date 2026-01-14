// src/components/Navbar.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="bg-emerald-800 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-xl font-semibold">Employee Manager</div>

      <div className="flex items-center gap-4">
        {!user ? (
          <button onClick={() => navigate("/login")} className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-md">
            Login
          </button>
        ) : (
          <>
            <div className="text-sm">Hi, <span className="font-medium">{user.name}</span></div>
            <button onClick={() => { logout(); navigate("/login"); }} className="bg-red-500 px-3 py-1 rounded-md">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
