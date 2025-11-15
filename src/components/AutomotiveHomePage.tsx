"use client";
import React from "react";
import { HeroSection } from "./HeroSection";
import { ServicesSection } from "./ServicesSection";
import { BookServiceSection } from "./BookServiceSection";
import { PlansSection } from "./PlansSection";
import { ContactSection } from "./ContactSection";
import { AboutSection } from "./AboutSection";
import ScrollToTopProgressButton from "./ScrollToTopButton";
import { ServiceCartProvider } from "./ServiceCartContext";
import { FloatingCart } from "./FloatingCart";

export default function AutomotiveHomePage() {
  return (
    <ServiceCartProvider>
      <>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Ultra:wght@400&family=Days+One:wght@400&family=Abhaya+Libre:wght@600;800&family=Zilla+Slab+Highlight:wght@700&family=Orbitron:wght@400;700&family=Londrina+Outline:wght@400&family=Inter:wght@700&family=Jacques+Francois+Shadow:wght@400&family=Zen+Old+Mincho:wght@400;700&family=Zilla+Slab:wght@700&display=swap"
        />
        <div className="relative w-full bg-black">
          <HeroSection />
          <ServicesSection />
          <BookServiceSection />
          <PlansSection />
          <ContactSection />
          <AboutSection />
          <ScrollToTopProgressButton />
          <FloatingCart />
        </div>
      </>
    </ServiceCartProvider>
  );
}
