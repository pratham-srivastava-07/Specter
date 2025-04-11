"use client";

import React from "react";
import { motion } from "framer-motion";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const NavbarGlow = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-br from-[#00D8FF]/20 via-transparent to-[#427F39]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
  );
};

export const MenuItem = ({
  setActive,
  active,
  item,
  icon,
  children,
}: any) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative group">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
      >
        {icon && <span className="text-[#00D8FF]">{icon}</span>}
        <motion.p
          className="text-white/90 group-hover:text-[#00D8FF] transition-colors duration-300"
        >
          {item}
        </motion.p>
      </motion.div>
      <NavbarGlow />
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.8rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={transition}
                layoutId="active-dropdown" 
                className="bg-black/90 backdrop-blur-lg rounded-xl overflow-hidden border border-[#00D8FF]/30 shadow-xl shadow-[#00D8FF]/20"
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  <div className="relative z-10">
                    {children}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#00D8FF]/10 rounded-full blur-xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#427F39]/10 rounded-full blur-xl -z-10"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};