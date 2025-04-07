import { Shield, Globe, Zap, Lock, Server, Database, LineChart, Settings,  } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

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


  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

export default function Features() {
    return <div id="features" className="container mx-auto px-6 py-20">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      custom={0}
      className="text-center mb-20"
    >
      <h2 className="text-4xl font-bold mb-6">Powerful Features</h2>
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
          <Card className="p-8 h-full text-white cursor-pointer bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 hover:border-gray-500 transition-all group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
            
            <div className="relative z-10 space-y-4">
              <div className="h-16 w-16 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 shadow-lg">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
}