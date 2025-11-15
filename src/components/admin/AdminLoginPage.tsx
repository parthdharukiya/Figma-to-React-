"use client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function AdminLoginPage() {
  const { adminLogin, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = adminLogin(username, password);
    if (!res.ok) {
      setError(res.message || "Login failed");
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="bg-neutral-900 p-8 rounded-lg w-full max-w-md border border-neutral-700">
        <h1 className="text-3xl font-bold mb-6 text-orange-500">Admin Login</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <label className="block text-sm mb-2">Username</label>
        <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full mb-4 p-3 bg-neutral-800 border border-neutral-700 rounded outline-none" required />
        <label className="block text-sm mb-2">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full mb-6 p-3 bg-neutral-800 border border-neutral-700 rounded outline-none" required />
        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded">Login</button>
        {isAdmin && (
          <button type="button" onClick={()=>navigate('/admin')} className="w-full mt-3 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold py-3 rounded border border-neutral-600">Go to Dashboard</button>
        )}
        <p className="mt-4 text-sm opacity-70">Demo: admin / admin</p>
      </form>
    </div>
  );
}


