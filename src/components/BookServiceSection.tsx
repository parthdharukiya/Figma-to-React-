"use client";
import React, { useState } from "react";
import { Button } from "./Button";
import { useServiceCart } from "./ServiceCartContext";

export function BookServiceSection() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const { addServices } = useServiceCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedService) {
      const serviceType = selectedService.includes("INTERIM") ? "Interim" : "Full";
      addServices([{ name: selectedService, type: serviceType }]);
      alert(`Service added to your order: ${selectedService}`);
      setIsPopupOpen(false);
      setSelectedService(null);
    } else {
      alert("Please select a service to confirm.");
    }
  };

  return (
    <section className="relative w-full h-[1112px] max-md:h-auto">
      {/* Background Image */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cc7d9b7af3c6d611bad8f7d51fd9ea33c8ebef7?width=3436"
        alt="Car service background"
        className="object-cover absolute top-0 left-0 w-full h-[1112px] opacity-90"
      />
      <div
        id="BOOKSERVICES"
        className="absolute left-0 w-full bg-stone-700 h-[1109px] opacity-55 top-[3px]"
      />

      {/* Title: AUTOMOTIVE */}
      <h1
        className="text-9xl uppercase ml-[290px]"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "240px",
          WebkitTextStroke: "1px white",
          color: "transparent",
        }}
      >
        AUTOMOTIVE
      </h1>

      {/* Subtitle: CAR SERVICES */}
      <h1
        className="text-6xl uppercase ml-[599px]"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "90px",
          WebkitTextStroke: "1px white",
          color: "transparent",
        }} // This style is complex and might need responsive adjustments
      >
        car services
      </h1>
      {/* Highlighted Heading: Book Your Car Services */}
      <h1
        className="absolute text-8xl uppercase left-[100px] top-[389px] w-[756px]"
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "55px",
          WebkitTextStroke: "2px darkred",
          color: "red",
        }}
      >
        Book Your car services
      </h1>

      {/* Button */}
      <Button
        variant="bookNow"
        className="absolute left-[161px] top-[250px] max-md:relative max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-[-60px]"
        onClick={() => setIsPopupOpen(true)}
      >
        BOOK NOW
      </Button>

      {/* RECOMMENDATION TEXT BLOCK with Orbitron font */}
      <div
        className="absolute text-xs text-white h-[627px] left-[1021px] top-[375px] w-[668px] max-md:relative max-md:top-5 max-md:left-5 max-md:pr-5 max-md:w-full"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        <h1 className="text-4xl text-red-800 underline max-md:text-3xl max-sm:text-2xl">
          RECOMMENDATION
        </h1>

        <h4 className="mt-5 text-4xl font-bold text-white max-md:text-3xl">
          INTERIM SERVICES
        </h4>
        <p className="mt-2 text-2xl text-white max-md:text-xl">
          Every 6 months or 10,000 kilometers (WHICHEVER COMES FIRST)
        </p>

        <h4 className="mt-8 text-4xl font-bold text-white max-md:text-3xl">
          FULL SERVICES
        </h4>
        <p className="mt-2 text-2xl text-white max-md:text-xl">
          Every 12 months or 15,000 kilometers (WHICHEVER COMES FIRST)
        </p>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 text-white p-8 rounded-lg relative w-full max-w-lg mx-4">
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-3 right-4 text-3xl font-bold text-gray-400 hover:text-white"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-6 text-center text-orange-500">
              Choose a Service
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700">
                <input type="radio" name="service" value="INTERIM SERVICES" onChange={(e) => setSelectedService(e.target.value)} className="h-5 w-5 text-orange-600 bg-gray-700 border-gray-600 focus:ring-orange-500" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold">INTERIM SERVICES</h3>
                  <p className="text-gray-400">Every 6 months or 10,000 kilometers (WHICHEVER COMES FIRST)</p>
                </div>
              </label>
              <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700">
                <input type="radio" name="service" value="FULL SERVICES" onChange={(e) => setSelectedService(e.target.value)} className="h-5 w-5 text-orange-600 bg-gray-700 border-gray-600 focus:ring-orange-500" />
                <div className="ml-4">
                  <h3 className="text-xl font-bold">FULL SERVICES</h3>
                  <p className="text-gray-400">Every 12 months or 15,000 kilometers (WHICHEVER COMES FIRST)</p>
                </div>
              </label>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition mt-4"
                disabled={!selectedService}
              >
                Confirm Service
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
