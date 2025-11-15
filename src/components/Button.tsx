"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant: "appointment" | "bookNow" | "submit" | "aboutSubmit";
  className?: string;
  onClick?: () => void;
}
const buttonVariants = {
  appointment: {
    dimensions: "w-[403px] h-[87px]",
    text: "text-4xl font-extrabold text-white max-md:text-3xl",
    textWidth: "w-[353px] max-md:w-[250px]",
    svg: (
      <svg
        width="404"
        height="88"
        viewBox="0 0 404 88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M2.99998 4.9998C-40 -5.0002 402 4.9998 402 4.9998C402 4.9998 372 72.9998 402 82.9998C432 92.9997 2.99998 82.9998 2.99998 82.9998C2.99998 82.9998 46 14.9998 2.99998 4.9998Z"
          fill="#E84409"
        />
      </svg>
    ),
  },
  bookNow: {
    dimensions: "w-[351px] h-[128px]",
    text: "text-4xl font-bold text-white max-md:text-3xl",
    textWidth: "w-[258px] max-md:w-[200px]",
    svg: (
      <svg
        width="351"
        height="129"
        viewBox="0 0 351 129"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0 0.54541H351V63.9851L276.5 128.456H351H0V65.0167L72.5 0.54541H0Z"
          fill="#E84409"
        />
      </svg>
    ),
  },
  submit: {
    dimensions: "w-[268px] h-[69px]",
    text: "text-4xl font-bold text-white max-md:text-3xl",
    textWidth: "w-[170px] max-md:w-[150px]",
    svg: (
      <svg
        width="268"
        height="69"
        viewBox="0 0 268 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0 0H268V34.2218L211.117 69H268H0V34.7782L55.3561 0H0Z"
          fill="#E84409"
        />
      </svg>
    ),
  },
  aboutSubmit: {
    dimensions: "w-[449px] h-[50px]",
    text: "text-4xl font-bold text-white max-md:text-3xl",
    textWidth: "w-[170px] max-md:w-[150px]",
    svg: (
      <svg
        width="449"
        height="50"
        viewBox="0 0 449 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0 0H449V24.7984L353.699 50H449H0V25.2016L92.7422 0H0Z"
          fill="#E84409"
        />
      </svg>
    ),
  },
};

export function Button({
  children,
  variant,
  className = "",
  onClick,
}: ButtonProps) {
  const styles = buttonVariants[variant];

  return (
    <button
      className={`relative ${styles.dimensions} ${className} hover:opacity-90 transition-opacity`}
      onClick={onClick}
    >
      {styles.svg}
      <span
        className={`relative z-10 ${styles.text} ${styles.textWidth} text-center`}
      >
        {children}
      </span>
    </button>
  );
}
