import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Users, Film, Music } from 'lucide-react';

const stats = [
  {
    icon: Download,
    value: 300,
    suffix: "+",
    label: "Resources Downloaded"
  },
  {
    icon: Users,
    value: 100,
    suffix: "+",
    label: "Active Creators"
  },
  {
    icon: Film,
    value: 1000,
    suffix: "+",
    label: "Animations & Assets"
  },
  {
    icon: Music,
    value: 50,
    suffix: "+",
    label: "Music Tracks"
  }
];

const Stats = () => {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      stats.forEach((stat, index) => {
        const steps = 30;
        const stepValue = stat.value / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          if (currentStep < steps) {
            setCounts(prev => 
              prev.map((count, i) => 
                i === index ? Math.min(Math.ceil(stepValue * (currentStep + 1)), stat.value) : count
              )
            );
            currentStep++;
          } else {
            clearInterval(interval);
          }
        }, 50);
      });
    }
  }, [inView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.5,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-20 bg-background cow-grid-bg">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-vt323 mb-4">
            Our <span className="text-cow-purple">Numbers</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of content creators who use our resources daily
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cow-purple/50 via-primary/50 to-cow-purple/50 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-75 group-hover:opacity-100 group-hover:scale-110"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(155, 135, 245, 0.5) 0%, rgba(155, 135, 245, 0.2) 100%)",
                    "linear-gradient(225deg, rgba(155, 135, 245, 0.5) 0%, rgba(155, 135, 245, 0.2) 100%)",
                    "linear-gradient(45deg, rgba(155, 135, 245, 0.5) 0%, rgba(155, 135, 245, 0.2) 100%)"
                  ]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <motion.div 
                className="relative flex flex-col items-center p-8 md:p-10 rounded-xl bg-background/95 backdrop-blur border-2 border-cow-purple/20 shadow-xl"
                whileHover={{ 
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 15 
                  }
                }}
              >
                <motion.div
                  className="mb-6"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -15, 15, -15, 15, 0],
                    transition: {
                      duration: 0.6,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <div className="relative">
                    <motion.div 
                      className="absolute inset-0 bg-cow-purple/30 rounded-full blur-md"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative p-4 bg-primary/10 text-primary rounded-full">
                      <stat.icon className="h-8 w-8 md:h-10 md:w-10" />
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  className="text-4xl md:text-5xl xl:text-6xl font-vt323 mb-4 text-primary relative group-hover:text-cow-purple transition-colors duration-300"
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="relative z-10">
                    {counts[index].toLocaleString()}{stat.suffix}
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-cow-purple/10 blur-sm rounded-lg -z-10"
                    initial={false}
                    whileHover={{
                      scale: 1.2,
                      opacity: [0.1, 0.3, 0.1],
                      transition: {
                        duration: 1,
                        repeat: Infinity
                      }
                    }}
                  />
                </motion.div>

                <motion.div 
                  className="text-lg md:text-xl text-muted-foreground text-center font-medium relative"
                  initial={{ opacity: 0.8 }}
                  whileHover={{
                    opacity: 1,
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  {stat.label}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-cow-purple/50"
                    initial={{ width: "0%", left: "50%" }}
                    whileHover={{
                      width: "100%",
                      left: "0%",
                      transition: { duration: 0.3 }
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;
