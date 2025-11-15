"use client";
import React from "react";
import { PlanCard } from "./PlanCard";

export function PlansSection() {
  return (
    <section className="relative w-full h-[1077px]">
      <div className="absolute top-0 left-0 opacity-40 bg-neutral-700 size-full" />

      {/* AUTOMOTIVE heading */}
      <h1
        className="absolute top-[0px] left-[290px] text-9xl uppercase z-10"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "240px",
          WebkitTextStroke: "1px white",
          color: "transparent",
        }}
      >
        PLANS
      </h1>

      {/* Left side content */}
      <div className="absolute text-3xl text-white h-[760px] left-[29px] top-[262px] w-[545px] max-md:relative max-md:top-[270px] max-md:left-5 max-md:pr-5 max-md:w-full">
        <h2
  className="text-5xl font-bold text-red-600 max-md:text-4xl max-sm:text-3xl"
  style={{ fontFamily: "Orbitron, sans-serif" }}
>
  AFFORDABLE PRICING PLANS
</h2>
        <p className="mt-5 text-3xl text-white max-md:text-xl max-sm:text-base" style={{ fontFamily: "Orbitron, sans-serif"}}>
          we provide the best car services, recommend the  
          <p>best prices and product</p>
          through an independent <p>review process</p> 
        </p>

        <ul className="mt-4 space-y-4">
          {["SAME DAY SERVICE", "CONVENIENT LOCATION", "ONLINE APPOINTMENT", "24X7 SERVICES"].map((item, i) => (
            <li key={i} className="flex items-center text-3xl text-white max-md:text-lg" style={{ fontFamily: "Orbitron, sans-serif" }}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d889b60cb4503cd3bea307236c9bfc773b0c7a80?width=84"
                alt="Check"
                className="h-[45px] w-[42px] mr-4 max-md:hidden"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Right side cards */}
  <div className="flex absolute gap-10 left-[627px] top-[262px] max-md:relative max-md:left-0 max-md:top-5 max-md:flex-col max-md:items-center">

  {/* PERSONAL PLAN */}
  <div className="bg-black p-6 w-[300px] text-white transition duration-300 hover:bg-red-900 cursor-pointer">
    <h3
      className="text-center text-red-600 text-2xl font-bold uppercase mb-4 leading-tight"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      PERSONAL <br />
      RS.999/- <br />
      PER YEAR
    </h3>
    <ul className="list-disc pl-5 space-y-2 text-lg" style={{ fontFamily: "Orbitron, sans-serif" }}>
      <li>Scheduled services</li>
      <li>Component wear remember</li>
      <li>Washing</li>
      <li>Cleaning</li>
    </ul>
  </div>

  {/* PROFESSIONAL PLAN */}
  <div className="bg-black p-6 w-[300px] text-white transition duration-300 hover:bg-red-900 cursor-pointer">
    <h3
      className="text-center text-red-600 text-2xl font-bold uppercase mb-4 leading-tight"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      PROFESSIONAL <br />
      RS.1999/- <br />
      PER YEAR
    </h3>
    <ul className="list-disc pl-5 space-y-2 text-lg" style={{ fontFamily: "Orbitron, sans-serif" }}>
      <li>Scheduled services</li>
      <li>Component wear remember</li>
      <li>Washing</li>
      <li>Cleaning</li>
      <li>Towing van</li>
      <li>24x7 service</li>
      {/* <li>Detailed checkup</li> */}
    </ul>
  </div>
 <div className="bg-black p-6 w-[300px] text-white transition duration-300 hover:bg-red-900 cursor-pointer">
    <h3
      className="text-center text-red-600 text-2xl font-bold uppercase mb-4 leading-tight"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
      PRO <br />
      RS.2499/- <br />
      PER YEAR
    </h3>
    <ul className="list-disc pl-5 space-y-2 text-lg" style={{ fontFamily: "Orbitron, sans-serif" }}>
      <li>Scheduled services</li>
      <li>Component wear remember</li>
      <li>Form-Washing</li>
      <li>Cleaning</li>
      <li>Towing van</li>
      <li>24x7 service</li>
      <li>Detailed checkup</li>
      <li>Pickup & Drop service</li>
      <li>Instant solution</li>
      <li>Paint Polish after wash </li>
    </ul>
  </div>
</div>

    </section>
  );
}
