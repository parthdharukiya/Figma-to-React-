"use client";

import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface AuthPopupProps {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: (newMode: "login" | "signup") => void;
}

export function AuthPopup({ mode, onClose, onSwitch }: AuthPopupProps) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    // Placeholder for actual auth logic
    console.log(`Submitting ${mode} form`);
    alert(`${mode === "login" ? "Logged in" : "Signed up"} successfully! (Placeholder)`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100]">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="bg-gray-800 text-white p-8 rounded-lg shadow-2xl relative w-full max-w-md mx-4"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl font-bold text-gray-400 hover:text-white transition-colors"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
          {mode === "login" ? "Login" : "Create an Account"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div>
              <label className="block mb-2 text-sm font-medium">Your Name</label>
              <input name="name" type="text" placeholder="John Doe" required className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
            </div>
          )}
          <div>
            <label className="block mb-2 text-sm font-medium">Your Email</label>
            <input name="email" type="email" placeholder="name@company.com" required className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Your Password</label>
            <input name="password" type="password" placeholder="••••••••" required className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
          </div>
          {mode === "signup" && (
            <div>
              <label className="block mb-2 text-sm font-medium">Confirm Password</label>
              <input name="confirmPassword" type="password" placeholder="••••••••" required className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500" />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition">
            {mode === "login" ? "Login to your account" : "Create account"}
          </button>

          <div className="text-center text-sm text-gray-400">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button type="button" onClick={() => onSwitch("signup")} className="font-medium text-orange-500 hover:underline">
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button type="button" onClick={() => onSwitch("login")} className="font-medium text-orange-500 hover:underline">
                  Login
                </button>
              </>
            )}
          </div>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => { onClose(); navigate('/admin/login'); }}
              className="w-full bg-neutral-700 hover:bg-neutral-600 text-white font-semibold py-2.5 rounded-lg border border-neutral-600"
            >
              Admin Login
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AuthPopup;