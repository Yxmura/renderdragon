import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  {
    name: "Creators' Kingdom",
    description: "A community built on creativity and teamwork, where everyone's passion helps bring bold visions into reality.",
    logo: "https://cdn.bsky.app/img/avatar/plain/did:plc:2v6n63ayh4zfevupgxrkufx4/bafkreibufdbu2k76p5mdnwo64bmptl6g2wnl6imd3wxm3nvkstoqgjkz2q@jpeg",
    links: [
      { name: 'Bluesky', url: 'https://bsky.app/profile/creatorskingdom.bsky.social', icon: '/assets/bluesky_icon.png' },
      { name: 'Instagram', url: 'https://instagram.com/creatorskingdom', icon: '/assets/instagram_icon.png' },
    ],
    bgColor: 'from-yellow-400/10 to-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    hoverColor: 'hover:border-yellow-500/60'
  },
  {
    name: "Proger's Kitchen",
    description: "A vibrant community for creators to give and get feedback, share assets, and help each other grow.",
    logo: "/assets/progerskitchen.webp",
    links: [
      { name: 'Discord', url: 'https://discord.gg/wXhHe5bVgz', icon: '/assets/discord_icon.png' },
    ],
    bgColor: 'from-blue-400/10 to-blue-500/10',
    borderColor: 'border-blue-500/30',
    hoverColor: 'hover:border-blue-500/60'
  },
  {
    name: "Decour SMP",
    description: "A fully non-economy based Lifesteal SMP with useful plugins that enhance the vanilla experience.",
    logo: "/assets/Decour.jpg",
    links: [
      { name: 'Discord', url: 'https://dsc.gg/decoursmp', icon: '/assets/discord_icon.png' },
    ],
    bgColor: 'from-green-400/10 to-green-500/10',
    borderColor: 'border-green-500/30',
    hoverColor: 'hover:border-green-500/60'
  }
];

const Partnership = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="py-20 bg-background cow-grid-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-vt323 mb-4">
            Our Awesome <span className="text-cow-purple">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're proud to collaborate with these amazing communities and projects.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={itemVariants}
              className={`pixel-card bg-gradient-to-br ${partner.bgColor} ${partner.borderColor} ${partner.hoverColor} transition-all duration-300 flex flex-col`}
            >
              <div className="flex flex-col items-center text-center p-6 flex-grow">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-24 h-24 rounded-full mb-4 border-4 border-background shadow-lg"
                  loading="lazy"
                />
                <h3 className="text-2xl font-vt323 mb-2">{partner.name}</h3>
                <p className="text-muted-foreground text-sm flex-grow">
                  {partner.description}
                </p>
              </div>
              <div className="border-t border-border/20 p-4 mt-auto">
                <div className="flex justify-center items-center gap-4">
                  {partner.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      <img src={link.icon} alt={link.name} className="w-5 h-5" loading="lazy" />
                      <span>{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Partnership);