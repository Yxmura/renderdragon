import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
}

const Testimonials = () => {
  const { t } = useTranslation();

  const testimonialsData: Testimonial[] = [
    {
      id: 1,
      name: "yFury",
      role: t('testimonials.yFuryRole'),
      content: t('testimonials.yFuryContent'),
    },
    {
      id: 2,
      name: "Jkingnick",
      role: t('testimonials.jkingnickRole'),
      content: t('testimonials.jkingnickContent'),
    },
    {
      id: 3,
      name: "AlphaReturns",
      role: t('testimonials.alphaReturnsRole'),
      content: t('testimonials.alphaReturnsContent'),
    },
    {
      id: 4,
      name: "ItsProger",
      role: t('testimonials.itsProgerRole'),
      content: t('testimonials.itsProgerContent'),
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-8 h-8 bg-cow-purple pixel-corners"></div>
        <div className="absolute bottom-12 right-12 w-6 h-6 bg-cow-purple pixel-corners"></div>
        <div className="absolute top-1/4 right-1/4 w-4 h-10 bg-cow-purple pixel-corners"></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-4 bg-cow-purple pixel-corners"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-2 animate-glow font-vt323"
        >
          <Trans i18nKey="testimonials.whatCreatorsSay">
            What <span className="text-cow-purple">Creators</span> Say About Us
          </Trans>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          {t('testimonials.dontTakeOurWord')}
        </motion.p>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {testimonialsData.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={item}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 pixel-corners"
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6 bg-gradient-to-r from-cow-purple/10 to-transparent border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 overflow-hidden border-2 border-cow-purple/30 rounded-full">
                    <img 
                      src={`/assets/${testimonial.name}.jpg`}
                      alt={testimonial.name} 
                      className="w-full h-full object-cover rounded-full"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 relative">
                <Quote className="absolute top-4 left-4 text-cow-purple/10 w-10 h-10" />
                <blockquote className="relative z-10 pl-2">
                  <p className="italic text-foreground/80">"{testimonial.content}"</p>
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Testimonials);