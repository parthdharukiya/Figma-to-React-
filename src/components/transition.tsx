"use client";
import { motion } from "framer-motion";
import type { ComponentType } from "react";

type Props = {
  OgComponent: ComponentType<any>;
};

const transition =
  ({ OgComponent }: Props) => // fix: destructure Component, not OgComponent
  () => (
    <>
      <OgComponent />
      <motion.div
      className="slide-in"
      initial={{ scale:0}}
      animate={{scale:0}}
      exit={{scale:1}}
      transition={{ duration:1, ease:[0.22,1,0.36,1]}}
      ></motion.div>
    
      <motion.div
      className="slide-out"
      initial={{ scale:0}}
      animate={{scale:0}}
      exit={{scale:1}}
      transition={{ duration:1, ease:[0.22,1,0.36,1]}}
      ></motion.div>
      </>
  );

export default transition;
