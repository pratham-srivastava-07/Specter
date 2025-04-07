import {motion} from 'framer-motion'

const stats = [
    { value: "99.99%", label: "Uptime" },
    { value: "150+", label: "Server Locations" },
    { value: "<50ms", label: "Average Latency" },
    { value: "256-bit", label: "Encryption" }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1 }
    })
  };

export default function Stats() {
    return  <div id="stats" className="container mx-auto px-6 py-20">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
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
          <div className="mb-4">
            <span className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              {stat.value}
            </span>
          </div>
          <p className="text-gray-400 text-lg">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  </div>
}