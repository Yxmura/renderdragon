'use client';

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Music } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import * as motion from "motion/react-client"

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [isMobile])

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const decorationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        stiffness: 200,
        damping: 10,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        stiffness: 100,
        damping: 10,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 1.2,
        stiffness: 200,
        damping: 10,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 rgba(155, 135, 245, 0.4)",
        "0 0 10px rgba(155, 135, 245, 0.6)",
        "0 0 0 rgba(155, 135, 245, 0.4)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'mirror' as const,
      },
    },
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-background px-6 py-20 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Animated background decorations */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-300"
        style={{
          transform: `translate3d(${mousePosition.x * -40}px, ${mousePosition.y * -40}px, 0)`,
        }}
      >
        <motion.div
          className="absolute left-[10%] top-[15%] w-16 h-16 border-2 border-cow-purple/30 rounded-lg rotate-45"
          initial="hidden"
          animate="visible"
          variants={decorationVariants}
          whileInView={{
            rotate: [45, 55, 45],
            transition: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute right-[12%] top-[20%] w-10 h-10 bg-cow-purple/20 rounded-full"
          initial="hidden"
          animate="visible"
          variants={decorationVariants}
          whileInView={{
            x: [0, 15, 0],
            y: [0, -10, 0],
            transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute left-[20%] bottom-[20%] w-12 h-12 bg-cow-purple/20 rotate-12 pixel-corners"
          initial="hidden"
          animate="visible"
          variants={decorationVariants}
          whileInView={{
            y: [0, -20, 0],
            rotate: [12, 0, 12],
            transition: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute right-[25%] bottom-[15%] w-8 h-8 bg-cow-purple/30 pixel-corners"
          initial="hidden"
          animate="visible"
          variants={decorationVariants}
          whileInView={{
            x: [0, -15, 0],
            rotate: [0, 15, 0],
            transition: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        />
      </div>

      {/* Main content with staggered animations */}
      <motion.div
        className="relative z-10 max-w-4xl text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6 text-foreground dark:text-white leading-tight"
          style={{
            fontFamily: "'Press Start 2P', cursive",
            lineHeight: "1.1",
            textShadow: "0 0 12px rgba(155, 135, 245, 0.6), 0 0 24px rgba(155, 135, 245, 0.4)",
          }}
          variants={titleVariants}
        >
          <motion.span className="inline-block" variants={itemVariants}>
            Unlock Your <br />
          </motion.span>
          <motion.span
            className="text-cow-purple inline-block"
            variants={itemVariants}
            whileInView={{
              textShadow: [
                "0 0 12px rgba(155, 135, 245, 0.6), 0 0 24px rgba(155, 135, 245, 0.4)",
                "0 0 20px rgba(155, 135, 245, 0.8), 0 0 40px rgba(155, 135, 245, 0.6)",
                "0 0 12px rgba(155, 135, 245, 0.6), 0 0 24px rgba(155, 135, 245, 0.4)",
              ],
              transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
          >
            Creation Potential
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-foreground/80 dark:text-white/80 max-w-2xl mx-auto mb-10"
          variants={itemVariants}
        >
          The ultimate hub for creators. Find free resources for your next project, including music, sound effects, images, and more.
        </motion.p>

        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" variants={itemVariants}>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { stiffness: 400, damping: 10 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/resources"
              className="pixel-btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm transition-transform"
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
              Browse Resources
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { stiffness: 400, damping: 10 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/gappa"
              className="pixel-btn-secondary inline-flex items-center gap-2 px-6 py-3 text-sm transition-transform"
            >
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Music className="w-4 h-4" />
              </motion.span>
              Check Music Copyright
            </Link>
          </motion.div>
        </motion.div>

        <motion.div className="mt-10" variants={itemVariants}>
          <motion.span
            className="text-xl text-foreground/70 dark:text-white/70 bg-cow-purple/10 px-4 py-2 rounded pixel-corners inline-block"
            variants={badgeVariants}
            initial="hidden"
            animate={["visible", "pulse"]}
          >
            100% Free
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default React.memo(Hero)