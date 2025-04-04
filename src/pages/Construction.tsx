import React from "react";
import { motion } from "framer-motion";

const Construction = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-black to-primary text-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-neutral-800 border-4 border-yellow-500 rounded-2xl shadow-2xl p-10 max-w-md text-center"
      >
        <div className="absolute inset-0 rounded-2xl pointer-events-none border-4 border-yellow-500 z-[-1]" style={{
          imageRendering: 'pixelated',
          backgroundImage: "url('https://www.transparenttextures.com/patterns/pixel-weave.png')",
          backgroundSize: "12px 12px",
        }}></div>

        <div className="mb-4">
          <motion.img
            src="https://media.tenor.com/oNX9BtwuRpwAAAAm/tamuel-minecraft.webp"
            alt="Minecraft Mining"
            className="mx-auto w-32 h-32"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
        <h1 className="text-3xl font-bold mb-2 font-mono text-yellow-300">Under Construction</h1>
        <p className="text-secondary font-mono text-sm mb-6">
          This page is currently under construction.<br />Check back soon!
        </p>
        <a href="/" className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-xl transition duration-200">
          Go Home
        </a>
      </motion.div>
    </div>
  );
};

export default Construction;