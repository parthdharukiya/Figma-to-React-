"use client";
import React, { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { useServiceCart } from "./ServiceCartContext";

const services = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a362f0f1242e3c96e4cba440a4504b8ff460dfca?width=150",
    title: "ENGINE SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/06ae2b026f9f4d2d3917784ce6284104f5866d2e?width=180",
    title: "BRAKE SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/c30cbc1d5a24b4d4c048b3c84d037a4d1c6459bb?width=180",
    title: "ERROR SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/afc3df3c79c2d0a711a2b09581881b32a85ca83f?width=180",
    title: "TYRE SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/6d468b052776c6230d6b685dcc217fc21dfbbca2?width=180",
    title: "COOLING SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/127b26b8fa44010bb07820099b686448bcbd3247?width=180",
    title: "BODY SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/cf1d6fe65daf16242f3ae8fa835c910340a81ee2?width=180",
    title: "ARM SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/f60296b5b76f621967e0f644f71093781bf2e229?width=180",
    title: "STEERING SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/24a322aed2bcfd662f78016102f63c839058609e?width=180",
    title: "OIL PROBLEM",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/438c06255dfac71ba861d7b44a7edfca4c3ae1d2?width=180",
    title: "BODY SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/3ec86fc35b20e1cf940d5726c7069e9799cb7f6b?width=180",
    title: "DOOR SERVICE",
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/127b26b8fa44010bb07820099b686448bcbd3247?width=180",
    title: "GENERAL SERVICE",
  },
];

export function ServicesSection() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { addServices } = useServiceCart();

  const toggleService = (title: string) => {
    setSelectedServices((prevSelected) =>
      prevSelected.includes(title)
        ? prevSelected.filter((t) => t !== title)
        : [...prevSelected, title]
    );
  };

  const handleSubmit = () => {
    if (selectedServices.length > 0) {
      const servicesToAdd = selectedServices.map((name) => ({ name, type: "General" as const }));
      addServices(servicesToAdd);
      alert(`${selectedServices.length} service(s) added to your order!`);
      setSelectedServices([]); // Clear local selection after adding to cart
    } else {
      alert("Please select at least one service to add.");
    }
  };

  return (
    <section className="relative w-full bg-black min-h-[1300px]">
      <div id="SERVICES" className="absolute top-0 left-0 bg-black size-full" />

      <header className="absolute text-5xl font-bold text-orange-600 h-[100px] left-[150px] top-[280px] w-[242px] max-md:relative max-md:top-5 max-md:left-5 max-md:text-20xl mt-[-350px]">
        <h2>SERVICES</h2>
      </header>

      <div className="grid absolute gap-3 grid-cols-[repeat(4,385px)] grid-rows-[repeat(3,245px)] left-[27px] top-[360px] max-md:relative max-md:left-0 max-md:top-5 max-md:gap-4 max-md:px-5 max-md:py-0 max-md:w-full max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            image={service.image}
            title={service.title}
            selected={selectedServices.includes(service.title)}
            onSelect={() => toggleService(service.title)}
          />
        ))}
      </div>

      {/* ✅ Buttons placed at the bottom of the section */}
      <div className="absolute bottom-20 left-0 flex w-full justify-center gap-8">
        <button
          onClick={handleSubmit} 
          className="bg-orange-600 text-white px-9 py-4 rounded-lg font-bold hover:bg-orange-700 transition-all disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Add Selected to Order
        </button>
      </div>
    </section>
  );
}
