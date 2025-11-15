"use client";
import React from "react";

interface FormFieldProps {
  label: string;
}

export function FormField({ label }: FormFieldProps) {
  return (
    <div className="relative max-md:w-full">
      <div
        dangerouslySetInnerHTML={{
          __html:
            '<svg width="666" height="4" viewBox="0 0 666 4" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 666px; height: 0px; stroke-width: 3px; stroke: #E84409; position: absolute; top: 106px; left: 6px"> <path d="M0 2H666" stroke="#E84409" stroke-width="3"></path> </svg>',
        }}
      />
      <label className="absolute top-0 left-1 h-11 text-4xl font-bold text-white w-[296px] max-md:w-full max-md:text-2xl max-sm:text-xl">
        {label}
      </label>
    </div>
  );
}
