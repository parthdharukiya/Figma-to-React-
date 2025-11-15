"use client";
import React from "react";

interface PlanCardProps {
  title: string;
  description: string;
}

export function PlanCard({ title, description }: PlanCardProps) {
  return (
    <article className="bg-black h-[567px] w-[520px] max-md:p-5 max-md:mb-5 max-md:w-full max-md:h-auto">
      <div className="text-3xl text-white h-[385px] p-6 max-md:p-0">
        <h3 className="text-4xl font-bold text-center text-orange-600 max-md:text-3xl max-sm:text-2xl">
          {title}
        </h3>
        <p className="mt-5 text-3xl text-white max-md:text-xl max-sm:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}
