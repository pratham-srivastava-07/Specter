"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 flex justify-center mt-6"
    >
      <div className="bg-black bg-opacity-70 rounded-full px-8 py-4 flex items-center justify-between gap-16">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Link href="/">
            <div className="text-white text-2xl flex items-center cursor-pointer">
              
              <span className="font-bold">Home</span>
            </div>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/contact">
            <span className="text-white text-xl font-medium cursor-pointer">Contact</span>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link href="/faq">
            <span className="text-white text-xl font-medium cursor-pointer">FAQ</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
