"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Zap, Lock, ChevronRight, Code, Server, Cloud, ArrowRight, Sparkles, Check, Database, LineChart, Settings, Coffee, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('enterprise');
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set animation complete after initial load
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

  const revealInOut = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: any) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1 }
    }),
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } }
  };

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggeredItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    { icon: Shield, title: 'Enterprise Security', description: 'Military-grade encryption and security protocols for all requests', color: 'from-blue-500 to-blue-700' },
    { icon: Globe, title: 'Global Infrastructure', description: 'Access content from anywhere with our distributed server network', color: 'from-emerald-500 to-teal-700' },
    { icon: Zap, title: 'Blazing Fast', description: 'Rust-powered backend delivers unparalleled speed and performance', color: 'from-amber-500 to-orange-600' },
    { icon: Lock, title: 'Complete Privacy', description: 'Zero-logging policy and encrypted channels protect your identity', color: 'from-purple-500 to-purple-700' },
    { icon: Database, title: 'Intelligent Caching', description: 'Advanced caching technology reduces latency and bandwidth usage', color: 'from-pink-500 to-rose-700' },
    { icon: LineChart, title: 'Detailed Analytics', description: 'Real-time insights into proxy performance and usage patterns', color: 'from-cyan-500 to-blue-600' },
    { icon: Server, title: 'Load Balancing', description: 'Automatic distribution of traffic across multiple servers', color: 'from-indigo-500 to-violet-700' },
    { icon: Settings, title: 'Customizable Rules', description: 'Create and manage custom routing rules for your traffic', color: 'from-green-500 to-emerald-700' },
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "CTO, TechVision", content: "Specter has revolutionized our proxy infrastructure. The speed improvements alone justified the switch, but the enhanced security features gave us peace of mind we never had before.", avatar: "SJ" },
    { name: "Michael Chen", role: "Security Engineer", content: "I've tested dozens of proxy solutions, and Specter's encryption implementation is truly best-in-class. The way they've optimized their Rust backend for both security and performance is remarkable.", avatar: "MC" },
    { name: "Ava Williams", role: "DevOps Lead", content: "The reliability and global coverage of Specter has eliminated connectivity issues for our distributed team. Their support team is also incredibly responsive and knowledgeable.", avatar: "AW" },
    { name: "David Rodriguez", role: "Network Architect", content: "Moving our infrastructure to Specter increased our throughput by 340% while reducing costs. Their documentation is excellent and made migration seamless.", avatar: "DR" },
  ];

  const stats = [
    { value: "99.99%", label: "Uptime" },
    { value: "150+", label: "Server Locations" },
    { value: "<50ms", label: "Average Latency" },
    { value: "256-bit", label: "Encryption" }
  ];

  const pricingPlans:any = {
    enterprise: {
      title: "Enterprise",
      price: "$499",
      period: "/month",
      description: "Comprehensive solution for large organizations with advanced security needs",
      features: [
        "Unlimited requests",
        "Global server access",
        "24/7 priority support",
        "Custom integration",
        "Dedicated infrastructure",
        "Compliance reporting",
        "Custom SLA",
        "Audit logging"
      ]
    },
    business: {
      title: "Business",
      price: "$199",
      period: "/month",
      description: "Powerful features for growing businesses and development teams",
      features: [
        "10M requests/month",
        "100 server locations",
        "24/7 support",
        "API access",
        "Team management",
        "Analytics dashboard",
        "Webhook integration",
        "99.9% uptime guarantee"
      ]
    },
    startup: {
      title: "Startup",
      price: "$79",
      period: "/month",
      description: "Essential capabilities for startups and small teams",
      features: [
        "1M requests/month",
        "50 server locations",
        "Business hours support",
        "Basic API access",
        "Up to 5 team members",
        "Basic analytics",
        "Standard integration",
        "99.5% uptime guarantee"
      ]
    }
  };

  const partners = [
    "Acme Corp", "TechGlobal", "Innovatech", "SecureNet", "DataFlow", "CloudForge"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white overflow-y-hidden">
      {/* Navbar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur"></div>
                <div className="relative bg-black p-2 rounded-full">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400">
                SPECTER
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors hidden md:inline">Login</a>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with animated background */}
      <div className="relative overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              custom={0}
              className="flex-1"
            >
              <div className="inline-block mb-6">
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
                  
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400">
                SPECTER
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed mb-8">
                A next-generation proxy server built with Rust, delivering unparalleled speed and security
                for your enterprise web requests.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
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
                      {/* Terminal animation effect */}
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
                              <p className="mb-1 text-blue-400">Specter Proxy Server v2.8.3</p>
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

      {/* Trusted By Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-8"
        >
          <p className="text-gray-400 uppercase tracking-wider font-medium text-sm">Trusted by industry leaders</p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggeredContainer}
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6"
        >
          {partners.map((partner, index) => (
            <motion.div key={index} variants={staggeredItem} className="text-gray-500 text-lg font-semibold">
              {partner}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={index * 0.1}
              className="text-center"
            >
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  {stat.value}
                </span>
              </div>
              <p className="text-gray-400 text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Grid with 3D Card Effect */}
      <div id="features" className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built for performance, security, and reliability
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={index * 0.1}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <Card className="p-6 h-full bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-gray-500 transition-all group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-xl mb-6 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="container mx-auto px-4 py-16 my-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl md:mx-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">How Specter Works</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced architecture built for enterprise requirements
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 transform -translate-y-1/2 opacity-30 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0.1}
              className="text-center flex flex-col items-center relative"
            >
              <div className="mb-6 bg-blue-500/10 p-4 rounded-full relative z-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-30 blur-sm"></div>
                <div className="relative">
                  <Server className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Request Processing</h3>
              <p className="text-gray-400">Your requests are processed through our high-performance Rust servers</p>
              
              <div className="bg-gray-900 rounded-lg p-4 mt-6">
                <div className="text-sm text-left text-gray-400">
                  <p className="text-blue-400 mb-1">• Multi-threaded architecture</p>
                  <p className="text-blue-400 mb-1">• Asynchronous I/O operations</p>
                  <p className="text-blue-400">• Optimized memory management</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0.2}
              className="text-center flex flex-col items-center relative"
            >
              <div className="mb-6 bg-purple-500/10 p-4 rounded-full relative z-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full opacity-30 blur-sm"></div>
                <div className="relative">
                  <Shield className="w-10 h-10 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
              <p className="text-gray-400">Advanced encryption secures data in transit and at rest</p>
              
              <div className="bg-gray-900 rounded-lg p-4 mt-6">
                <div className="text-sm text-left text-gray-400">
                  <p className="text-purple-400 mb-1">• AES-256-GCM encryption</p>
                  <p className="text-purple-400 mb-1">• TLS 1.3 protocol support</p>
                  <p className="text-purple-400">• Perfect forward secrecy</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0.3}
              className="text-center flex flex-col items-center relative"
            >
              <div className="mb-6 bg-emerald-500/10 p-4 rounded-full relative z-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full opacity-30 blur-sm"></div>
                <div className="relative">
                  <Globe className="w-10 h-10 text-emerald-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Delivery</h3>
              <p className="text-gray-400">Content delivered through our worldwide edge network</p>
              
              <div className="bg-gray-900 rounded-lg p-4 mt-6">
                <div className="text-sm text-left text-gray-400">
                  <p className="text-emerald-400 mb-1">• 150+ global edge locations</p>
                  <p className="text-emerald-400 mb-1">• Intelligent routing algorithms</p>
                  <p className="text-emerald-400">• Anycast network architecture</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0.4}
          className="flex justify-center mt-10"
        >
          <Link href="/proxy-tester">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6">
              Experience Specter <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that best fits your needs
          </p>
          
          <div className="justify-center mt-8 mb-12 p-1 bg-gray-800 rounded-full inline-flex">
            {Object.keys(pricingPlans).map((plan) => (
              <button
                key={plan}
                onClick={() => setActiveTab(plan)}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeTab === plan 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {pricingPlans[plan].title}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="wait">
            {Object.keys(pricingPlans).map((plan) => (
              activeTab === plan && (
                <motion.div
                  key={plan}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={revealInOut}
                  custom={0}
                  className="col-span-1 lg:col-span-3"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                    <Card className="h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 relative overflow-hidden">
                        <div className={`absolute -inset-1 bg-gradient-to-r ${plan === 'enterprise' ? 'from-purple-600 to-blue-600' : plan === 'business' ? 'from-blue-600 to-emerald-600' : 'from-emerald-600 to-amber-600'} rounded-lg opacity-10 blur`}></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold">{pricingPlans[plan].title}</h3>
                            <div className="flex items-end">
                              <span className="text-4xl font-bold">{pricingPlans[plan].price}</span>
                              <span className="text-gray-400 ml-1">{pricingPlans[plan].period}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 mb-8">{pricingPlans[plan].description}</p>
                          
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6 mb-8">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          
                          <div className="border-t border-gray-700 pt-6">
                            <h4 className="text-lg font-semibold mb-4">Includes:</h4>
                            <ul className="space-y-3">
                              {pricingPlans[plan].features.map((feature: any, index: any) => (
                                <li key={index} className="flex items-start">
                                  <Check className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" />
                                  <span className="text-gray-300">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    <div className="lg:col-span-2">
                      <Card className="h-full p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700">
                        <h3 className="text-2xl font-bold mb-6">Compare Plans</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-700">
                                <th className="pb-4 text-left text-gray-400 font-medium">Feature</th>
                                <th className="pb-4 text-center text-gray-400 font-medium">Startup</th>
                                <th className="pb-4 text-center text-gray-400 font-medium">Business</th>
                                <th className="pb-4 text-center text-gray-400 font-medium">Enterprise</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                              {[
                                ['Monthly Requests', '1M', '10M', 'Unlimited'],
                                ['Server Locations', '50', '100', 'All'],
                                ['Support', 'Business Hours', '24/7', '24/7 Priority'],
                                ['Uptime SLA', '99.5%', '99.9%', 'Custom'],
                                ['Encryption', 'AES-256', 'AES-256', 'AES-256 + Custom'],
                                ['Team Members', 'Up to 5', 'Unlimited', 'Unlimited'],
                                ['Analytics', 'Basic', 'Advanced', 'Custom'],
                                ['Dedicated Infrastructure', 'No', 'Optional', 'Yes']
                              ].map(([feature, ...plans], index) => (
                                <tr key={index}>
                                  <td className="py-4 text-gray-300">{feature}</td>
                                  {plans.map((value, i) => (
                                    <td key={i} className={`py-4 text-center ${activeTab === Object.keys(pricingPlans)[i] ? 'text-white font-medium' : 'text-gray-400'}`}>
                                      {value}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center"
        >
          <p className="text-gray-400 mb-4">Need something custom?</p>
          <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-6">
            Contact Sales <Users className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Trusted by Developers</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What our customers say about Specter
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={index * 0.1}
            >
              <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 h-full">
                <div className="flex items-start mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.content}"</p>
                <div className="flex mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Award key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-emerald-900/50 rounded-3xl overflow-hidden my-16">
        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <div className="inline-block mb-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur"></div>
                <div className="relative bg-black p-4 rounded-full">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to experience Specter?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Join thousands of developers and enterprises who trust Specter for their proxy infrastructure needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-6">
                  Contact Sales <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur"></div>
                  <div className="relative bg-black p-2 rounded-full">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-500 to-emerald-400">
                  SPECTER
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Next-generation proxy infrastructure for the modern web.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">GDPR</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Specter. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400 text-sm flex items-center">
                <Coffee className="w-4 h-4 mr-1" />
                Made with love by developers, for developers
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}