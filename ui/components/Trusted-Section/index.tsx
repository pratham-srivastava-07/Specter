import {motion} from "framer-motion"


const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
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
  
  const partners = [
    "Acme Corp", "TechGlobal", "Innovatech", "SecureNet", "DataFlow", "CloudForge"
  ];

export default function TrustedSection() {
    return <div className="container mx-auto px-6 py-16">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      custom={0}
      className="text-center mb-12"
    >
      <p className="text-gray-400 uppercase tracking-wider font-medium text-sm">Trusted by industry leaders</p>
    </motion.div>
    
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggeredContainer}
      className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8"
    >
      {partners.map((partner, index) => (
        <motion.div key={index} variants={staggeredItem} className="text-gray-500 text-lg font-semibold">
          {partner}
        </motion.div>
      ))}
    </motion.div>
  </div>
}