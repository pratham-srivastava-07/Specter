"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SparklesCore } from "../../components/ui/sparkles";

export default function FAQ() {
  const faqs = [
    {
      question: "What is Specter Proxy?",
      answer: "Specter is a lightweight proxy server that sits between your client and the web. It provides enhanced control over your web traffic, allowing for logging, filtering, security enhancements, and performance optimization."
    },
    {
      question: "How does Specter differ from other proxy servers?",
      answer: "Specter focuses on simplicity, performance, and user control. Unlike many proxy solutions that are either overly complex or too limited, Specter offers a perfect balance of powerful features with an intuitive interface, making advanced web traffic management accessible to everyone."
    },
    {
      question: "Is Specter secure?",
      answer: "Yes. Specter implements industry-standard encryption protocols and security best practices. All traffic passing through Specter is encrypted, and we regularly audit our security measures to ensure your data remains protected. Additionally, Specter doesn't store any personal browsing data on our servers."
    },
    {
      question: "Can I use Specter for content filtering?",
      answer: "Absolutely. Specter includes advanced content filtering capabilities that allow you to block unwanted content, ads, trackers, and malicious sites. You can create custom filtering rules or use our pre-configured filtering templates for common use cases."
    },
    {
      question: "Does Specter work on mobile devices?",
      answer: "Yes, Specter works across all major platforms including iOS and Android devices. You can either use our dedicated mobile apps or configure your mobile device to use Specter's proxy settings manually. Our documentation provides step-by-step guides for all supported platforms."
    },
    {
      question: "How do I get started with Specter?",
      answer: "Getting started is simple. Click the 'Get Started' button on our home page, download the appropriate version for your platform, and follow the installation wizard. Once installed, you can access the control panel to customize your settings or use our quickstart presets for instant protection."
    },
    {
      question: "Is Specter free to use?",
      answer: "Specter offers both free and premium tiers. The free version provides essential proxy functionality with basic filtering and security features. Our premium tiers unlock advanced features such as unlimited bandwidth, priority support, custom rules, and enterprise-grade security enhancements."
    }
  ];

  return (
    <div className="relative w-full bg-black flex flex-col items-center justify-center min-h-screen py-16 px-4 mt-10">
      {/* Background sparkles */}
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="faqSparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.2}
          particleDensity={70}
          className="w-full h-full"
          particleColor="#00ff00"
          speed={0.3}
        />
      </div>

      <motion.div
        className="relative z-20 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          Frequently Asked Questions
        </motion.h1>

        <motion.div 
          className="space-y-4 w-full cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <p className="text-neutral-400 mb-6">Still have questions?</p>
          <motion.a
            href="/contact"
            className="relative inline-flex group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <button className="relative px-8 py-3 bg-black rounded-lg leading-none flex items-center border border-green-500 text-green-400 hover:text-white transition duration-200">
              Contact Support
            </button>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FaqItem({ question, answer, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-neutral-800 rounded-lg overflow-hidden bg-black bg-opacity-80 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
      whileHover={{ 
        boxShadow: "0 0 10px rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 0.3)"
      }}
    >
      <motion.button
        className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-xl font-medium text-neutral-200">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-green-500 flex-shrink-0"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: { 
                height: { duration: 0.4 },
                opacity: { duration: 0.6, delay: 0.1 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { 
                height: { duration: 0.3 },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div 
              className="p-6 pt-0 text-neutral-300"
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
            >
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}