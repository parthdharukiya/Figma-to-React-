"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { motion } from "framer-motion";
import { useServiceCart } from "./ServiceCartContext";

interface ProfilePopupProps {
  onClose: () => void;
  onSignOut: () => void;
}

// Mock user data
const initialUser = {
  name: "Parth",
  email: "parth@example.com",
  contact: "9737893411",
};

export function ProfilePopup({ onClose, onSignOut }: ProfilePopupProps) {
  const [view, setView] = useState<"profile" | "history" | "edit">("profile");
  const [user, setUser] = useState(initialUser);
  const { completedServices, ongoingServices } = useServiceCart();
  const [progress, setProgress] = useState(25);

  // Simulate progress for the ongoing service
  useEffect(() => {
    if (ongoingServices.length > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 15;
        });
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [ongoingServices]);

  const handleSignOut = () => {
    onSignOut();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-[100]">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-8 rounded-xl shadow-2xl relative w-full max-w-md mx-4 border border-white/10"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-3xl font-bold text-gray-400 hover:text-white transition-colors"
        >
          &times;
        </button>

        {/* PROFILE VIEW */}
        {view === "profile" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
              Profile
            </h2>
            <div className="space-y-5 text-lg">
              <div className="flex items-center gap-4">
                <i className="ti ti-user text-orange-500 text-2xl w-6 text-center"></i>
                <span>{user.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <i className="ti ti-mail text-orange-500 text-2xl w-6 text-center"></i>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <i className="ti ti-phone text-orange-500 text-2xl w-6 text-center"></i>
                <span>{user.contact}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => setView("edit")}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setView("history")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
              >
                History
              </button>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition mt-4"
            >
              Sign-out
            </button>
          </>
        )}

        {/* EDIT VIEW */}
        {view === "edit" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
              Edit Profile
            </h2>
            <button
              onClick={() => setView("profile")}
              className="text-orange-500 hover:underline mb-4"
            >
              &larr; Back to Profile
            </button>
            <form
              className="space-y-4"
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                setUser({
                  name: formData.get("name") as string,
                  email: formData.get("email") as string,
                  contact: formData.get("contact") as string,
                });
                alert("Profile updated!");
                setView("profile");
              }}
            >
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Username
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  required
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  required
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  Contact Number
                </label>
                <input
                  name="contact"
                  type="tel"
                  defaultValue={user.contact}
                  required
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-300">
                  New Password (optional)
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="Enter new password"
                  className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition mt-4"
              >
                Save Changes
              </button>
            </form>
          </>
        )}

        {/* HISTORY VIEW */}
        {view === "history" && (
          <>
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
              Service History
            </h2>
            <button
              onClick={() => setView("profile")}
              className="text-orange-500 hover:underline mb-4"
            >
              &larr; Back to Profile
            </button>

            {/* Ongoing Services */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2 border-b border-gray-600 pb-1">
                Ongoing Services
              </h3>
              {ongoingServices.length > 0 ? (
                ongoingServices.map((item, index) => (
                  <div key={index} className="mb-2">
                    <p>{item.name}</p>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full text-xs text-white text-center leading-4 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      >
                        {progress}%
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No ongoing services.</p>
              )}
            </div>

            {/* Completed Services */}
            <div>
              <h3 className="text-xl font-semibold mb-2 border-b border-gray-600 pb-1">
                Completed Services
              </h3>
              {completedServices.length > 0 ? (
                <ul className="list-disc list-inside space-y-1">
                  {completedServices.map((item, index) => (
                    <li key={index}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No completed services yet.</p>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default ProfilePopup;
