import {motion} from 'framer-motion'
import { Card } from '../ui/card';
import { Award } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

  const testimonials = [
    { name: "Sarah Johnson", role: "CTO, TechVision", content: "Specter has revolutionized our proxy infrastructure. The speed improvements alone justified the switch, but the enhanced security features gave us peace of mind we never had before.", avatar: "SJ" },
    { name: "Michael Chen", role: "Security Engineer", content: "I've tested dozens of proxy solutions, and Specter's encryption implementation is truly best-in-class. The way they've optimized their Rust backend for both security and performance is remarkable.", avatar: "MC" },
    { name: "Ava Williams", role: "DevOps Lead", content: "The reliability and global coverage of Specter has eliminated connectivity issues for our distributed team. Their support team is also incredibly responsive and knowledgeable.", avatar: "AW" },
    { name: "David Rodriguez", role: "Network Architect", content: "Moving our infrastructure to Specter increased our throughput by 340% while reducing costs. Their documentation is excellent and made migration seamless.", avatar: "DR" },
  ];


export default function Testimonials() {
    return <div id="testimonials" className="container mx-auto px-6 py-20">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      custom={0}
      className="text-center mb-20"
    >
      <h2 className="text-4xl font-bold mb-6">Trusted by Developers</h2>
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
          <Card className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 h-full space-y-6">
            <div className="flex items-start">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold mr-4">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="font-semibold">{testimonial.name}</h4>
                <p className="text-gray-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-300 italic">"{testimonial.content}"</p>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Award
                 key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400/20" />
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  </div>
}