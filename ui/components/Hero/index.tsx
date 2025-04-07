"use client"

import {AnimatePresence, motion} from 'framer-motion'
import { ArrowRight, Code, Shield, Users } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react';
import Link from 'next/link';


export default function HeroSection() {

    const [animationComplete, setAnimationComplete] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: any) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: i * 0.1 }
        })
      };
      
        useEffect(() => {
          const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
          };
      
          window.addEventListener('scroll', handleScroll);
          
          const timer = setTimeout(() => {
            setAnimationComplete(true);
          }, 2000);
      
          return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timer);
          };
        }, []);

    return <div className="relative overflow-hidden p-15">
    <div className="absolute inset-0 z-0">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div className="container relative z-10 mx-auto px-6 py-24">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          custom={0}
          className="flex-1 space-y-8"
        >
          <div className="inline-block">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur"></div>
              <div className="relative bg-black p-4 rounded-full">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </motion.div>
          </div>
              
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400">
            SPECTER
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
            A next-generation proxy server built with Rust, delivering unparalleled speed and security
            for your enterprise web requests.
          </p>
          
          <div className="flex flex-wrap gap-6">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 px-8 py-6 text-lg">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Link href="/web">
              <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-6 text-lg">
                Try Demo <Code className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center text-sm text-gray-400">
            <Shield className="w-4 h-4 mr-2 text-emerald-400" />
            <span>Military-grade encryption</span>
            <span className="mx-3">•</span>
            <Users className="w-4 h-4 mr-2 text-blue-400" />
            <span>Trusted by 500+ enterprises</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-50"></div>
            <div className="relative bg-gray-900 rounded-2xl p-2 shadow-xl">
              <div className="bg-black rounded-xl p-4 h-80 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-full p-2 flex items-center space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  <div className="mt-8 p-2 font-mono text-xs md:text-sm text-green-400">
                    <AnimatePresence>
                      {animationComplete && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <p className="mb-2">$ specter --status</p>
                          <p className="mb-1 text-blue-400">Specter Proxy Server v1.0.0</p>
                          <p className="mb-1">Status: <span className="text-green-400">ONLINE</span></p>
                          <p className="mb-1">Active Connections: <span className="text-yellow-400">1,254</span></p>
                          <p className="mb-1">Current Load: <span className="text-green-400">21%</span></p>
                          <p className="mb-1">Average Response: <span className="text-green-400">35ms</span></p>
                          <p className="mb-1">Encryption: <span className="text-blue-400">AES-256-GCM</span></p>
                          <p className="mb-3">-----------------------------</p>
                          <p className="mb-2">$ specter --run benchmark</p>
                          <div className="flex items-center">
                            <p className="text-purple-400">Running performance tests...</p>
                            <motion.span
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5 }}
                            >▋</motion.span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
}