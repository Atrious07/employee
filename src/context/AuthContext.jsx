// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { seedIfEmpty, findUserByEmail, getCurrentUser, setCurrentUser, clearCurrentUser } from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {id,name,email,role}
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // seed default demo data if missing
    seedIfEmpty();
    const cu = getCurrentUser();
    if (cu) setUser(cu);
    setLoading(false);
  }, []);

  const login = ({ email, password }) => {
    const u = findUserByEmail(email);
    if (!u) return { ok: false, message: "User not found" };
    if (u.password !== password) return { ok: false, message: "Invalid password" };
    setCurrentUser(u);
    setUser(u);
    return { ok: true, user: u };
  };

  const logout = () => {
    clearCurrentUser();
    setUser(null);
  };

  const signup = ({ name, email, password, role = "employee" }) => {
    // simple unique email check — use storage helpers if needed
    if (findUserByEmail(email)) return { ok: false, message: "Email already used" };
    // create id
    const id = "u_" + Date.now().toString(36);
    const newUser = { id, name, email, password, role };
    // Save using storage util (we import saveUser directly if needed) — to avoid circular import keep simple:
    const users = JSON.parse(localStorage.getItem("em_users_v1") || "[]");
    users.push(newUser);
    localStorage.setItem("em_users_v1", JSON.stringify(users));
    return { ok: true, user: newUser };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;