"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import AuthPopup from "./AuthPopup";
import ProfilePopup from "./ProfilePopup";
import { FaUserCircle } from "react-icons/fa";

export function HeroSection() {
  const [popupMode, setPopupMode] = useState<"login" | "signup" | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = () => {
    setIsLoggedIn(false);
    alert("You have been signed out.");
  };

  return (
    <>
      <section className="relative w-full bg-black h-[1159px] max-md:p-5 max-md:h-auto">
        <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />
        <div className="absolute top-0 left-0 bg-black size-full" />

        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7dc56f2985139b97f54cae5eb6c25355b3c483b?width=856"
          alt="Automotive Car Services Logo"
          className="absolute top-0 left-0 aspect-[428.20/429.00] h-[350px] w-[350px] max-md:relative max-md:top-0 max-md:left-0 max-md:h-[200px] max-md:w-[200px] mt-[-20px]"
        />

        <nav className="flex absolute gap-10 items-center text-3xl text-orange-600 h-[41px] left-[693px] top-[75px] w-[1198px] max-md:hidden">
          <a href="#HOME" className="hover:text-orange-500">HOME</a>
          <a href="#SERVICES" className="hover:text-orange-500">SERVICES</a>
          <a href="#BOOKSERVICES" className="hover:text-orange-500">BOOK-SERVICES</a>
          <a href="#CONTACTUS" className="hover:text-orange-500">CONTACT-US</a>
          <a href="#ABOUT-US" className="hover:text-orange-500">ABOUT-US</a>
        </nav>

        <button className="hidden absolute top-5 right-5 text-3xl text-orange-600 cursor-pointer max-md:block">
          <i className="ti ti-menu-2" />
        </button>

        <div className="absolute top-5 right-10 flex items-center gap-4 text-white max-md:hidden z-20">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => setPopupMode("login")}
                className="text-xl font-semibold hover:text-orange-500 transition"
              >
                Login
              </button>
              <button
                onClick={() => setPopupMode("signup")}
                className="text-xl font-semibold bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-700 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="text-xl font-semibold hover:text-orange-500 transition"
            >
              Sign Out
            </button>
          )}

          {/* ✅ Profile icon button */}
          <button
            onClick={() => (isLoggedIn ? setIsProfileOpen(true) : setPopupMode("login"))}
            className="text-3xl text-black bg-white rounded-full p-1 hover:bg-orange-500 transition flex items-center justify-center"
          >
            <FaUserCircle size={32} className="text-gray-700" />
          </button>
        </div>

        <div className="absolute text-xl font-semibold text-white h-[174px] left-[31px] top-[321px] w-[447px] max-md:relative max-md:left-0 max-md:top-5 max-md:w-full max-md:text-center">
          <h1 className="text-4xl text-white max-md:text-3xl max-sm:text-2xl">
            EXPERT CAR REPAIR SERVICES CERTIFIED
          </h1>
          <div className="text-xs text-white">--------------------------------------------------------------------------</div>
          <p className="mt-2.5 text-xl text-white max-md:text-base max-sm:text-sm">
            We offering well-trained mechanics and excellent services. All at competitive prices <br />
            of vehicle repairs at your home or work place.
          </p>
        </div>

        <a href="#CONTACTUS">
          <Button
            variant="appointment"
            className="absolute left-[35px] top-[530px] max-md:relative max-md:left-2/3 max-md:-translate-x-2/4 max-md:top-[-50px]"
          >
            MAKE APPOINTMENT
          </Button>
        </a>

        <motion.img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ea9c2ad938b7a103dd76d082082c71ef7921f40?width=2458"
          alt="Car repair service"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute h-[628px] left-[453px] top-[130px] w-[1229px] max-md:object-cover max-md:relative max-md:left-0 max-md:top-5 max-md:w-full max-md:h-[400px]"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute flex items-center h-[51px] left-[94px] top-[630px] max-md:relative max-md:left-0 max-md:top-5 max-md:justify-center"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/769a05544c5f14129503811ed63c284121077efb?width=110"
            alt="Phone icon"
            className="h-[51px] w-[55px] max-md:hidden"
          />
          <span className="text-3xl text-white ml-4 max-md:text-2xl">9737893411</span>
        </motion.div>
        
      </section>

      <AnimatePresence>
        {popupMode && (
          <AuthPopup
            mode={popupMode}
            onClose={() => {
              setPopupMode(null);
              if (popupMode === "login" || popupMode === "signup") {
                setIsLoggedIn(true);
              }
            }}
            onSwitch={(newMode) => setPopupMode(newMode)}
          />
        )}
        {isLoggedIn && isProfileOpen && (
          <ProfilePopup onClose={() => setIsProfileOpen(false)} onSignOut={handleSignOut} />
        )}
      </AnimatePresence>
    </>
  );
}

export default HeroSection;
