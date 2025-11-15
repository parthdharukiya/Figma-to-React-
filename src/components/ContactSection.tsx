"use client";
import React, { useState } from "react";
import { Button } from "./Button";

export function ContactSection() {
  const [glow, setGlow] = useState(false);

  return (
    <section
      className="relative w-full bg-black h-[1159px] text-white"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      <div id="CONTACTUS" className="absolute top-0 left-0 bg-black size-full" />

      {/* Car Image & Glow Effects */}
      <div className="absolute left-[266px] top-[162px] w-[1200px] h-[750px] z-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c41535b2330b1c6c87d5e8d452837a19eb9a7d?width=2400"
          alt="Contact background"
          className="object-cover w-full h-full"
        />

        {/* 🔦 Headlight Glow */}
        <div
          className={`absolute top-[360px] right-[10px] w-[320px] h-[220px] rounded-full pointer-events-none transition-opacity duration-100 ease-in-out blur-xl ${
            glow ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 190, 0.9), transparent 80%)",
          }}
        />

        {/* 🔴 Brake Light Glow */}
        <div
          className={`absolute bottom-[250px] left-[70px] w-[150px] h-[200px] rounded-full pointer-events-none transition-opacity duration-100 ease-in-out blur-xl ${
            glow ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(255, 0, 0, 0.85), transparent 80%)",
          }}
        />

        {/* 🔲 Dark Overlay Behind Text */}
        <div className="absolute inset-0 bg-black opacity-40 z-10 pointer-events-none" />
      </div>

      {/* Heading */}
      <h1
        className="absolute top-[0px] left-[290px] uppercase z-20"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "140px",
          WebkitTextStroke: "1px white",
          color: "transparent",
        }}
      >
        Contact–us
      </h1>

      {/* Subheading */}
      <div className="absolute left-9 top-[166px] w-[1342px] text-6xl font-bold text-red-700 max-md:text-4xl max-sm:text-3xl z-20">
        REQUEST AN APPOINTMENT ONLINE
      </div>

      {/* Description */}
      <p className="absolute text-2xl font-medium left-[33px] top-[245px] w-[829px] max-md:text-xl max-sm:text-base z-20">
        After you submit the form, a representative <br />
        will you call back with the information. <br />
        You'll need to make an appointment
      </p>

      {/* Form Section */}
      <form
        onKeyDown={() => setGlow(true)}
        onKeyUp={() => setGlow(false)}
        className="absolute top-[380px] left-8 w-[90%] z-20 max-md:relative max-md:top-5 max-md:left-5 max-md:w-[calc(100%-40px)]"
      >
        {/* Row 1 */}
        <div className="flex justify-between gap-72 mb-10 max-md:flex-col max-md:gap-10">
          <div className="w-full">
            <label className="text-white text-2xl font-bold uppercase block mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full h-9 bg-transparent text-white placeholder-white/60 border-b-[3px] border-orange-600 outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-white text-2xl font-bold uppercase block mb-1">Your Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              className="w-full h-9 bg-transparent text-white placeholder-white/60 border-b-[3px] border-orange-600 outline-none"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between gap-72 mb-10 max-md:flex-col max-md:gap-10">
          <div className="w-full">
            <label className="text-white text-2xl font-bold uppercase block mb-1">Select Date</label>
            <input
              type="date"
              className="w-full h-9 bg-transparent text-white border-b-[3px] border-orange-600 outline-none"
            />
          </div>
          <div className="w-full">
            <label className="text-white text-2xl font-bold uppercase block mb-1">Select Time</label>
            <input
              type="time"
              className="w-full h-9 bg-transparent text-white border-b-[3px] border-orange-600 outline-none"
            />
          </div>
        </div>

        {/* Message */}
        <div className="mt-12">
          <label className="text-white text-2xl font-bold uppercase block mb-2">
            Your Message <span className="text-sm font-normal">(Problem)</span>
          </label>
          <textarea
            placeholder="Describe your issue..."
            rows={3}
            className="w-full bg-transparent text-white placeholder-white/60 border-b-[3px] border-orange-600 outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          variant="submit"
          className="mt-12 bg-red-700 text-white px-8 py-3 rounded-none font-bold text-xl hover:bg-red-800 transition-all duration-300"
        >
          SUBMIT
        </Button>
      </form>
    </section>
  );
}
