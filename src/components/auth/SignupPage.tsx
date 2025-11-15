"use client";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = signup(name, email, password);
    if (!res.ok) {
      setError(res.message || "Signup failed");
      return;
    }
    navigate("/profile", { replace: true });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="bg-neutral-900 p-8 rounded-lg w-full max-w-md border border-neutral-700">
        <h1 className="text-3xl font-bold mb-6 text-orange-500">Create Account</h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <label className="block text-sm mb-2">Name</label>
        <input value={name} onChange={e=>setName(e.target.value)} className="w-full mb-4 p-3 bg-neutral-800 border border-neutral-700 rounded outline-none" required />
        <label className="block text-sm mb-2">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full mb-4 p-3 bg-neutral-800 border border-neutral-700 rounded outline-none" required />
        <label className="block text-sm mb-2">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full mb-6 p-3 bg-neutral-800 border border-neutral-700 rounded outline-none" required />
        <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded">Sign up</button>
        <p className="mt-4 text-sm">Already have an account? <Link className="text-orange-400 underline" to="/login">Login</Link></p>
      </form>
    </div>
  );
}


