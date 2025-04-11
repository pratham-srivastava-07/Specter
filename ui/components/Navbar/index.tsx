"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import { HoveredLink } from "./HoveredLink";
import { Logo } from "./Logo";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export default function Navbar({ className = "" }) {
  const [active, setActive] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false); 
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <div className={`fixed top-5 inset-x-0 max-w-xl mx-auto z-50 ${className}`}>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onMouseLeave={() => setActive(null)}
        className="relative rounded-full border border-white/10 bg-black/50 backdrop-blur-md shadow-lg flex justify-between items-center px-6 py-3"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00D8FF]/20 to-[#427F39]/20 blur-md opacity-50"></div>
        
        {/* Logo always visible */}
        <div className="flex items-center relative z-10">
          <Logo />
        </div>
        
        {/* Mobile hamburger menu button */}
        {isMobile && (
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-10 text-white p-2 focus:outline-none"
          >
            <motion.div
              animate={mobileMenuOpen ? { rotate: 45 } : { rotate: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-white mb-1"
            />
            <motion.div
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-white mb-1"
            />
            <motion.div
              animate={mobileMenuOpen ? { rotate: -45, marginTop: -8 } : { rotate: 0, marginTop: 0 }}
              transition={{ duration: 0.2 }}
              className="w-5 h-0.5 bg-white"
            />
          </button>
        )}
        
        {/* Navigation links - desktop or mobile expanded */}
        <div 
          className={`${isMobile ? 'absolute top-full mt-2 right-0 bg-black/90 border border-[#00D8FF]/30 rounded-xl overflow-hidden shadow-lg p-4 backdrop-blur-md transition-all duration-300' : 'flex items-center gap-6 relative z-10'} ${isMobile && !mobileMenuOpen ? 'opacity-0 invisible translate-y-[-10px]' : 'opacity-100 visible translate-y-0'}`}
        >
          {isMobile && <Link href="/" className="block mb-4"><Logo /></Link>}
          
          {!isMobile && <div className="h-6 border-l border-white/20 mx-2"></div>}
          
          <div className={isMobile ? "flex flex-col space-y-4" : "flex items-center gap-6"}>
            <MenuItem 
              setActive={setActive} 
              active={active} 
              item="Features"
            >
              <div className="flex flex-col space-y-3 text-sm min-w-[180px]">
                <HoveredLink href="#" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                  </svg>
                }>Secure</HoveredLink>
                <HoveredLink href="#" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                  </svg>
                }>Fast</HoveredLink>
                <HoveredLink href="#" icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M1.5 2.311V.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.811a2.5 2.5 0 0 1 0 4.878V9.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.19a2.5 2.5 0 0 1 0-4.878Zm2.5.5a1.5 1.5 0 1 0-1 0h1Zm11 0a1.5 1.5 0 1 0-1 0h1Zm-11 8a1.5 1.5 0 1 0-1 0h1Zm11 0a1.5 1.5 0 1 0-1 0h1Z"/>
                    <path d="M0 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5Zm6.5-3a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Zm4 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                  </svg>
                }>Unlimited Storage</HoveredLink>
              </div>
            </MenuItem>
            
            <Link href={"/contact"}>
            <MenuItem 
              setActive={setActive} 
              active={active} 
              item="Contact"
            >
              <div className="flex flex-col space-y-3 text-sm min-w-[180px]">
                <HoveredLink 
                  href="https://x.com/_pratham_rs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#11baa9" viewBox="0 0 16 16">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                    </svg>
                  }
                >X</HoveredLink>
                <HoveredLink 
                  href="https://github.com/pratham-srivastava-07/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#11baa9" viewBox="0 0 16 16">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  }
                >GitHub</HoveredLink>
                <HoveredLink 
                  href="https://www.linkedin.com/in/pratham-srivastava-047813258/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#11baa9" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  }
                >LinkedIn</HoveredLink>
              </div>
            </MenuItem>
            </Link>
            
            <Link href="/faq" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10"
              >
                <motion.p
                  className="text-white/90 group-hover:text-[#00D8FF] transition-colors duration-300"
                >
                  FAQ
                </motion.p>
              </motion.div>
              <div className="absolute inset-0 -z-10 h-full w-full rounded-full bg-gradient-to-br from-[#00D8FF]/20 via-transparent to-[#427F39]/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </motion.nav>
    </div>
  );
}