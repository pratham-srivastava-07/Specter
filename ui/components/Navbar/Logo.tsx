"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center">
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D8FF] to-[#427F39] flex items-center justify-center"
        >
          <span className="text-white text-sm font-bold">S</span>
        </motion.div>
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="ml-2 text-white font-bold text-lg"
        >
          Spe<span className="text-[#cccdcc]">cter</span>
        </motion.span>
      </Link>
    </div>
  );
};