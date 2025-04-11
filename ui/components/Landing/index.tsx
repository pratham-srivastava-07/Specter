"use client";

import  Navbar  from "../Navbar";
import { SparklesCore } from "../ui/sparkles";
import {motion} from "framer-motion"

import Link from 'next/link';

export default function Landing() {
  return (
    <div className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden h-screen">
      {/* <Navbar /> */}

      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlescolorful"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.5}
        />
      </div>

      <motion.div
        className="flex flex-col items-center justify-center gap-6 relative z-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="md:text-7xl text-3xl lg:text-9xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Specter
        </motion.h1>

        <motion.p
          className="text-neutral-300 cursor-default text-center max-w-xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          A lightweight proxy server that sits between your client and the web, enabling enhanced control, logging, filtering, and security.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/web">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer duration-300"
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

