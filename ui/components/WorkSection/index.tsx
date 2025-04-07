import {motion} from "framer-motion"
import { Globe, Server, Shield, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link";


const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

export default function WorkSection() {
    return  <div id="how-it-works" className="container mx-auto p-20 sm:px-6 py-16 md:py-24 my-12 md:my-20 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      custom={0}
      className="text-center mb-12 md:mb-20"
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">How Specter Works</h2>
      <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
        Advanced architecture built for enterprise requirements
      </p>
    </motion.div>
  
    <div className="relative">
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 transform -translate-y-1/2 opacity-20 hidden lg:block"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 px-4 sm:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          custom={0.1}
          className="text-center flex flex-col items-center relative"
        >
          <div className="mb-6 bg-blue-500/10 p-5 rounded-full relative z-10">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full opacity-30 blur-sm"></div>
            <div className="relative">
              <Server className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">Request Processing</h3>
          <p className="text-gray-400 mb-6 max-w-xs mx-auto">Your requests are processed through our high-performance infrastructure</p>
          
          <div className="bg-gray-900/50 rounded-xl p-5 w-full border border-gray-800">
            <div className="text-sm md:text-base text-left text-gray-400 space-y-3">
              <p className="text-blue-400 flex items-start">
                <span className="mr-2">•</span>
                <span>Multi-threaded architecture</span>
              </p>
              <p className="text-blue-400 flex items-start">
                <span className="mr-2">•</span>
                <span>Asynchronous I/O operations</span>
              </p>
              <p className="text-blue-400 flex items-start">
                <span className="mr-2">•</span>
                <span>Optimized memory management</span>
              </p>
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
          <div className="mb-6 bg-purple-500/10 p-5 rounded-full relative z-10">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full opacity-30 blur-sm"></div>
            <div className="relative">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">End-to-End Encryption</h3>
          <p className="text-gray-400 mb-6 max-w-xs mx-auto">Advanced encryption secures data in transit and at rest</p>
          
          <div className="bg-gray-900/50 rounded-xl p-5 w-full border border-gray-800">
            <div className="text-sm md:text-base text-left text-gray-400 space-y-3">
              <p className="text-purple-400 flex items-start">
                <span className="mr-2">•</span>
                <span>AES-256-GCM encryption</span>
              </p>
              <p className="text-purple-400 flex items-start">
                <span className="mr-2">•</span>
                <span>TLS 1.3 protocol support</span>
              </p>
              <p className="text-purple-400 flex items-start">
                <span className="mr-2">•</span>
                <span>Perfect forward secrecy</span>
              </p>
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
          <div className="mb-6 bg-emerald-500/10 p-5 rounded-full relative z-10">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full opacity-30 blur-sm"></div>
            <div className="relative">
              <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-3">Global Delivery</h3>
          <p className="text-gray-400 mb-6 max-w-xs mx-auto">Content delivered through our worldwide edge network</p>
          
          <div className="bg-gray-900/50 rounded-xl p-5 w-full border border-gray-800">
            <div className="text-sm md:text-base text-left text-gray-400 space-y-3">
              <p className="text-emerald-400 flex items-start">
                <span className="mr-2">•</span>
                <span>150+ global edge locations</span>
              </p>
              <p className="text-emerald-400 flex items-start">
                <span className="mr-2">•</span>
                <span>Intelligent routing algorithms</span>
              </p>
              <p className="text-emerald-400 flex items-start">
                <span className="mr-2">•</span>
                <span>Anycast network architecture</span>
              </p>
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
      className="flex justify-center mt-16 md:mt-20"
    >
      <Link href="/proxy-tester">
        <Button className="bg-gradient-to-r cursor-pointer from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
          Experience Specter <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </motion.div>
  </div>
}