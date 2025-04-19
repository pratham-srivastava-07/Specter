import { motion } from 'framer-motion'
import { Card } from '../ui/card';
import { Code, Globe, RefreshCw } from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function Features() {
  return (
    <motion.div 
      variants={itemVariants}
      className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8"
    >
      <Card className="p-4 sm:p-5 lg:p-6 bg-black border border-green-500/30 backdrop-blur-sm">
        <div className="bg-green-500/10 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
          <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Global Proxy Network</h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Access web resources from multiple geographic locations to test region-specific content and latency from various parts of the world.
        </p>
      </Card>
      
      <Card className="p-4 sm:p-5 lg:p-6 bg-black border border-green-500/30 backdrop-blur-sm">
        <div className="bg-green-500/10 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
          <RefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Request History</h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Keep track of your recent requests and easily reuse them. Compare response times and detect changes in API responses over time.
        </p>
      </Card>
      
      <Card className="p-4 sm:p-5 lg:p-6 bg-black border border-green-500/30 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
        <div className="bg-green-500/10 p-2 sm:p-3 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4">
          <Code className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-white">Advanced Request Options</h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Customize headers, request body, and other parameters to thoroughly test API endpoints and web services with precision.
        </p>
      </Card>
    </motion.div>
  );
}