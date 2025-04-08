"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Zap, Lock,  Server,  ArrowRight, Check, Database, LineChart, Settings, Users} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Footer from '../Footer';
import Features from '../Features';
import TrustedSection from '../Trusted-Section';
import Stats from '../Stats';
import WorkSection from '../WorkSection';
import HeroSection from '../Hero';
import Testimonials from '../Testmonials';

export default function Landing() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('enterprise');
  const [_, setAnimationComplete] = useState(false);

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

  const pricingPlans: any = {
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

  return (
    <div className="min-h-screen p-10 bg-gradient-to-b from-black via-slate-900 to-slate-800 text-white overflow-y-hidden">
      {/* Navbar */}
      <header className={`fixed  p-20 top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-2 shadow-xl' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-6">
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
              {/* <a href="#" className="text-gray-300 hover:text-white transition-colors hidden md:inline">Login</a> */}
             <Link href={"/web"}>
                <Button size="sm" className="bg-gradient-to-r cursor-pointer from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Get Started
                </Button>
             </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted By Section */}
      <TrustedSection />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />
      
      {/* How It Works Section */}
      <WorkSection />

      {/* Pricing Section */}
      <div id="pricing" className="container mx-auto px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose the plan that best fits your needs
          </p>
          
          <div className="justify-center mt-10 text-white mb-16 p-1 bg-gray-800 rounded-full inline-flex">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
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
                        <div className="relative z-10 space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold">{pricingPlans[plan].title}</h3>
                            <div className="flex items-end">
                              <span className="text-4xl font-bold">{pricingPlans[plan].price}</span>
                              <span className="text-gray-400 ml-1">{pricingPlans[plan].period}</span>
                            </div>
                          </div>
                          <p className="text-gray-300">{pricingPlans[plan].description}</p>
                          
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-6">
                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                          
                          <div className="border-t border-gray-700 pt-6 space-y-4">
                            <h4 className="text-lg font-semibold">Includes:</h4>
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
                        <h3 className="text-2xl font-bold mb-8 text-white">Compare Plans</h3>
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
          className="text-center space-y-4"
        >
          <p className="text-gray-400">Need something custom?</p>
          <Button variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 px-8 py-6">
            Contact Sales <Users className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-emerald-900/50 rounded-3xl overflow-hidden my-16">
        <div className="container mx-auto px-6 py-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="space-y-8"
          >
            <div className="inline-block">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 blur"></div>
                <div className="relative bg-black p-4 rounded-full">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold">Ready to experience Specter?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of developers and enterprises who trust Specter for their proxy infrastructure needs.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
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
      <Footer />
    </div>
  );
}