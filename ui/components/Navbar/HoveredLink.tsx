"use client";

import React from "react";
import Link from "next/link";

export const HoveredLink = ({ children, href, icon, className = '' }: any) => {
  return (
    <Link
      href={href}
      className={`text-gray-300 hover:text-[#00D8FF] transition-colors duration-300 flex items-center gap-2 py-1 group ${className}`}
    >
      {icon && (
        <span className="text-[#00D8FF] opacity-70 group-hover:opacity-100 transition-opacity">
          {icon}
        </span>
      )}
      <span className="border-b border-transparent group-hover:border-[#00D8FF]/50 transition-all duration-300">
        {children}
      </span>
    </Link>
  );
};