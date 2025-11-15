"use client";
import React from "react";
import { Button } from "./Button";
import { useState } from "react";

      <div id="ABOUT-US" className="absolute top-0 left-0 bg-black size-full" />

const contactInfo = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a42a672cc9559c0c2078fc02b70f4c000f7648f9?width=108",
    label: "LOCATION",
    text: "AUTOMOTIVE CAR SERVICES, A-001, near Big Boys Toys, Nehru bridge, Ahmedabad",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6e51b0e871e300cec55a30a90af8f08978fed5de?width=106",
    label: "E-Mail",
    text: "automotivesarservices@gmail.com",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f9a6ee827ca5cf9526fcfed18cff2d38f918b4c?width=106",
    label: "Phone",
    text: "9737893411",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a356529f7e92535506eb0c5f6804a64e263d34b0?width=110",
    label: "Facebook",
    text: "Automotive Car Services",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9108442ad321c76fd3b85357449a624cad8d42f7?width=106",
    label: "Website",
    text: "www.automotive car services",
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a14c811507c356d34050eb86a67ce84162108e15?width=106",
    label: "Instagram",
    text: "Automotive Car Services",
  },
];

const navigationLinks = [
  "HOME",
  "SERVICES",
  "BOOK SERVICES",
  "PLANS",
  "CONTACT-US",
  "ABOUT-US",
];

export function AboutSection() {
  const [email, setEmail] = useState("");
  const onSubscribe = () => {
    const key = "acs_subscribers";
    try {
      const raw = localStorage.getItem(key);
      const list: string[] = raw ? JSON.parse(raw) : [];
      if (!email) return;
      if (list.includes(email)) { alert("Already subscribed"); return; }
      list.push(email);
      localStorage.setItem(key, JSON.stringify(list));
      alert("Subscribed successfully");
      setEmail("");
    } catch {
      alert("Subscription failed");
    }
  };
  return (
    <section
      id="ABOUT-US"
      className="relative w-full bg-black h-[1159px] text-white"
      style={{ fontFamily: "Orbitron, sans-serif" }}
    >
     
      <header className="absolute text-5xl font-bold text-orange-600 left-[67px] top-[72px] max-md:text-4xl">
        ABOUT-US
      </header>

      {/* About Card */}
      <article className="flex absolute items-center p-5 bg-neutral-800 h-[393px] left-[55px] top-[188px] w-[1617px] max-md:flex-col max-md:h-auto max-md:w-[calc(100%_-_40px)]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e701e36798add34662959bf814dc598a920decdd?width=482"
          alt="Automotive Logo"
          className="mt-20 ml-7 h-[341px] w-[241px] object-contain max-md:mt-5 max-md:ml-0 max-md:h-[150px] max-md:w-[50px] mb-[80px] ml-[-40px]"
        />
        <div className="mt-8 ml-20 w-[1218px] max-md:ml-0 max-md:mt-5 max-md:w-full px-5">
          <h3 className="text-5xl text-white max-md:text-3xl">
            Welcome to AUTOMOTIVE CAR SERVICES
          </h3>
          <p className="mt-3 text-2xl text-white leading-snug max-md:text-lg">
            Every service is rigorously scanned and constantly rated to ensure you get the best.
            <br />
            AUTOMOTIVE Car Services is a leading unit specializing in car care,
            offering top deals, expert mechanics, and quality service.
          </p>
        </div>
      </article>

      {/* Footer Columns */}
      <footer className="absolute left-[55px] top-[608px] flex w-[90%] justify-between max-md:flex-col max-md:items-start">
        {/* NAVIGATION */}
        <div className="w-[480px]">
          <h3 className="text-4xl font-bold mb-6">NAVIGATION</h3>
          <ul className="space-y-4 text-2xl">
            {navigationLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-orange-500 transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="w-[450px]">
          <h3 className="text-4xl font-bold mb-6">CONTACT</h3>
          {contactInfo.map((info, index) => (
            <div key={index} className="flex items-start gap-4 mb-4">
              <img src={info.icon} alt={info.label} className="w-10 h-10 mt-1" />
              <div className="text-base">
                <p className="text-orange-500 font-semibold">{info.label}</p>
                <p>{info.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SUBSCRIBE */}
        <div className="w-[400px]">
          <h3 className="text-4xl font-bold mb-6">SUBSCRIBE</h3>
          <label className="text-2xl mb-2 block">Your Mail</label>
          <input
            type="email"
            placeholder="Enter your mail address"
            className="bg-transparent border-b-4 border-orange-600 text-white text-xl w-full placeholder-white placeholder-opacity-50 mb-6 py-2 focus:outline-none"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <Button
            variant="aboutSubmit"
            className="bg-orange-600 text-white text-xl font-bold px-6 py-2 hover:bg-orange-700 transition"
            onClick={onSubscribe}
          >
            SUBMIT
          </Button>
        </div>
      </footer>
    </section>
  );
}
