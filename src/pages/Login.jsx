// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getUsers } from "../utils/storage";

export default function Login() {
  const { login, signup } = useContext(AuthContext);
  const [mode, setMode] = useState("login"); // or signup
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "employee" });
  const navigate = useNavigate();

  const handleChange = e => setForm(prev=>({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = (e) => {
    e.preventDefault();
    const res = login({ email: form.email, password: form.password });
    if (res.ok) {
      // navigate to dashboard
      navigate("/dashboard");
    } else {
      alert(res.message);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const existing = getUsers().find(u => u.email === form.email);
    if (existing) return alert("Email exists");
    const r = signup({ name: form.name, email: form.email, password: form.password, role: form.role });
    if (r.ok) {
      alert("Signup success — login now");
      setMode("login");
      setForm({ name: "", email: "", password: "", role: "employee" });
    } else {
      alert(r.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{mode === "login" ? "Login" : "Sign up"}</h2>

        {mode === "signup" && (
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700" />
        )}

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700" />

        {mode === "signup" && (
          <select name="role" value={form.role} onChange={handleChange} className="w-full p-2 mb-3 rounded bg-gray-700">
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>
        )}

        {mode === "login" ? (
          <button onClick={handleLogin} className="w-full bg-emerald-500 p-2 rounded">Login</button>
        ) : (
          <button onClick={handleSignup} className="w-full bg-yellow-500 p-2 rounded">Sign up</button>
        )}

        <div className="text-sm mt-3 text-gray-300">
          {mode === "login" ? (
            <>Don't have account? <button onClick={()=>setMode("signup")} className="text-emerald-400">Sign up</button></>
          ) : (
            <>Already have account? <button onClick={()=>setMode("login")} className="text-emerald-400">Login</button></>
          )}
        </div>
      </div>
    </div>
  );
}
