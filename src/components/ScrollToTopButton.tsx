"use client";

import React, { useEffect, useState } from "react";

const ScrollToTopProgressButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scroll = (scrollTop / docHeight) * 100;
        setScrollPercent(scroll);
      } else {
        setScrollPercent(0);
      }
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const circumference = 2 * Math.PI * 24;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 bg-transparent rounded-full"
      aria-label="Scroll to top"
    >
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="30"
          cy="30"
          r="24"
          stroke="#ea580c"
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 30 30)"
        />
        {/* Arrow Path */}
        <path d="M30 20 L30 40 M22 28 L30 20 L38 28" stroke="#ea580c" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </button>
  );
};

export default ScrollToTopProgressButton;
