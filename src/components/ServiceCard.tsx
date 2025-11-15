"use client";
import React from "react";

interface ServiceCardProps {
  image: string;
  title: string;
  selected: boolean;
  onSelect: () => void;
}

export function ServiceCard({ image, title, selected, onSelect }: ServiceCardProps) {
  return (
    <article
      onClick={onSelect}
      className="flex relative flex-col justify-center items-center bg-black h-[145px] w-[300px] max-md:w-full max-md:h-[200px] transition-colors cursor-pointer ml-[20px] mt-[-300px]"
    >
      <img
        src={image}
        alt={title}
        className="mb-4 h-[80px] w-[90px] ml-[75px]"
      />
      <h3
        className={`text-4xl font-bold text-center max-w-[196px] max-md:text-xl max-sm:text-xl ml-[100px] transition-colors duration-200 ${
          selected ? "text-red-500" : "text-white"
        }`}
      >
        {title}
      </h3>
    </article>
  );
}
