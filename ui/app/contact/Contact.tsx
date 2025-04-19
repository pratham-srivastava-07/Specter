"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight, Mail, MessageSquare, Phone } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="relative w-full bg-black flex flex-col items-center justify-center min-h-screen py-16 px-4 mt-10">
      {/* Background sparkles */}
      <div className="w-full absolute inset-0 h-full">
        <SparklesCore
          id="contactSparkles"
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
          className="text-5xl md:text-6xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-neutral-300 text-center max-w-xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Have questions about Specter? Reach out to our team and we'll get back to you as soon as possible.
        </motion.p>


        <motion.div
          className="bg-black bg-opacity-80 backdrop-blur-sm border border-neutral-800 rounded-xl p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.15)" }}
        >
          {isSubmitted ? (
            <motion.div
              className="flex flex-col items-center justify-center py-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-16 h-16 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center mb-4">
                <Send size={28} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-neutral-300 text-center">Thank you for reaching out. We'll get back to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  delay={0.9}
                />
                
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  delay={1.0}
                />
              </div>
              
              <FormField
                label="Subject"
                name="subject"
                type="text"
                placeholder="What's this about?"
                value={formState.subject}
                onChange={handleChange}
                required
                delay={1.1}
              />
              
              <FormField
                label="Message"
                name="message"
                type="textarea"
                placeholder="Tell us how we can help..."
                value={formState.message}
                onChange={handleChange}
                required
                delay={1.2}
              />
              
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
              >
                <motion.button
                  type="submit"
                  className="relative w-full md:w-auto inline-flex group"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={isSubmitting}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-500 rounded-lg blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
                  <div className="relative w-full flex items-center cursor-pointer justify-center gap-2 bg-black px-8 py-4 rounded-lg border border-green-500 text-green-400 hover:text-white transition duration-200">
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight size={18} />
                      </>
                    )}
                  </div>
                </motion.button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ContactCard({ icon, title, content, delay }: any) {
  return (
    <motion.div
      className="bg-black bg-opacity-70 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 flex flex-col items-center text-center"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 5px 15px rgba(0, 255, 0, 0.2)",
        borderColor: "rgba(0, 255, 0, 0.3)"
      }}
    >
      <div className="w-12 h-12 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mb-4">
        <div className="text-green-400">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-400">{content}</p>
    </motion.div>
  );
}

function FormField({ label, name, type, placeholder, value, onChange, required, delay }: any) {
  return (
    <motion.div 
      className="mb-4"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
    >
      <label className="block text-sm font-medium text-neutral-300 mb-2" htmlFor={name}>
        {label}
      </label>
      
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          rows={5}
          className="w-full bg-neutral-900 bg-opacity-70 border border-neutral-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-20 rounded-lg px-4 py-3 text-white placeholder-neutral-500 transition duration-200 outline-none"
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full bg-neutral-900 bg-opacity-70 border border-neutral-700 focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-20 rounded-lg px-4 py-3 text-white placeholder-neutral-500 transition duration-200 outline-none"
        />
      )}
    </motion.div>
  );
}