import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Construction as ConstructionIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DonateButton from "@/components/DonateButton";

const Construction = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <Helmet>
        <title>{t('construction.seo.title')}</title>
        <meta name="description" content={t('construction.seo.description')} />
        <meta property="og:title" content={t('construction.seo.title')} />
        <meta property="og:description" content={t('construction.seo.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="flex-1 pt-24 pb-16 cow-grid-bg flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-card border-4 border-primary pixel-corners shadow-2xl p-10 max-w-md text-center"
        >
          <div className="absolute inset-0 pixel-corners pointer-events-none border-4 border-primary/30 z-[-1]" style={{
            imageRendering: 'pixelated',
            backgroundImage: "url('https://www.transparenttextures.com/patterns/pixel-weave.png')",
            backgroundSize: "12px 12px",
          }}></div>

          <div className="mb-4 flex justify-center">
            <motion.div
              className="bg-primary/20 p-5 rounded-full"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ConstructionIcon className="h-12 w-12 text-primary" />
            </motion.div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 font-vt323 text-primary">
            {t('construction.heading')}
          </h1>
          <p className="text-muted-foreground font-mono text-sm mb-6 whitespace-pre-line">
            {t('construction.message')}
          </p>
          <a 
            href="/" 
            className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 pixel-corners transition duration-200"
          >
            {t('construction.returnHome')}
          </a>
        </motion.div>
      </div>
      
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Construction;
