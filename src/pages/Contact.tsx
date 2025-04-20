import { useState, useEffect } from 'react';
import { Copy, Mail, Check, Github, Globe, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DonateButton from '@/components/DonateButton';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  socials?: {
    github?: string;
    discord?: string;
    website?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Coder-soft',
    role: 'Founder',
    avatar: 'https://cdn.discordapp.com/avatars/1094475489734819840/37da8f0271f018153b22e27bf6d05f88.webp',
    socials: {
      github: 'https://github.com/coder-soft',
      discord: 'https://discordapp.com/users/1094475489734819840',
      website: 'https://coder-soft.pages.dev/'
    }
  },
  {
    name: 'Clover',
    role: 'Project Lead',
    avatar: 'https://cdn.discordapp.com/avatars/789997917661560862/affc7d403052f36ae9d5b80e4ee048da.webp',
    socials: {
      github: 'https://github.com/CloverTheBunny',
      discord: 'https://discordapp.com/users/789997917661560862'
    }
  },
  {
    name: 'Yamura',
    role: 'Lead Programmer',
    avatar: 'https://yt3.googleusercontent.com/qtcPrp5zfc_nACl9Ck-8UjbRQs_uNHs4j3W4FKbMg4JhTYiGXu4B3EPaXmG7H9Hu2UuAAymN=s160-c-k-c0x00ffffff-no-rj',
    socials: {
      github: 'https://github.com/Yxmura',
      discord: 'https://discordapp.com/users/877933841170432071'
    }
  },
  {
    name: 'IDoTheHax',
    role: 'Gappa - Copyright checker integrator',
    avatar: 'https://cdn.discordapp.com/avatars/987323487343493191/3187a33efcddab3592c93ceac0a6016b.webp?size=48',
    socials: {
      github: 'https://github.com/idothehax',
      website: 'https://idothehax.com/',
      discord: 'https://discordapp.com/users/987323487343493191'
    }
  },
];

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const email = 'renderdragon@proton.me';

  useEffect(() => {
    document.title = 'Contact Us - Renderdragon';
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    toast.success("Email copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Contact</span> Us
            </h1>
            
            <div className="bg-card pixel-corners border-2 border-primary/50 p-8 mb-12">
              <div className="mb-8">
                <h2 className="text-2xl font-vt323 mb-4">Get In Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions, feedback, or just want to say hello? We'd love to hear from you!
                </p>
                
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="font-medium">{email}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 h-8 text-xs pixel-corners"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-vt323 mb-4">Join Our Community</h2>
                <p className="text-muted-foreground mb-4">
                  Connect with other creators and our team on Discord.
                </p>
                
                <a 
                  href="https://discord.renderdragon.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="pixel-btn-primary inline-flex items-center space-x-2"
                >
                  <span>Join Discord</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              
              <div>
                <h2 className="text-2xl font-vt323 mb-4">Support Hours</h2>
                <p className="text-muted-foreground">
                  Well, we do what we can! We're all volunteers, not benefiting from the project, but if you join our Discord, we'll really try to get you an answer within 48 hours.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-vt323 mb-6 text-center">Meet The Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div 
                    key={index} 
                    className={`bg-card hover:bg-accent/20 border border-border hover:border-cow-purple transition-all duration-300 rounded-lg p-4 flex flex-col items-center text-center
                      ${activeCard === index ? 'scale-105 shadow-lg shadow-cow-purple/20' : ''}`}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 pixel-corners border-2 border-cow-purple">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-sm text-cow-purple font-bold mb-2">{member.role}</p>
                    
                    {/* socials */}
                    {member.socials && (
                      <div className="flex space-x-3 mt-auto">
                        {member.socials.github && (
                          <a 
                            href={member.socials.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-secondary hover:bg-primary hover:text-primary-foreground p-2 rounded-md transition-colors"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.website && (
                          <a 
                            href={member.socials.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-secondary hover:bg-primary hover:text-primary-foreground p-2 rounded-md transition-colors"
                            aria-label={`${member.name}'s Website`}
                          >
                            <Globe className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.discord && (
                          <a 
                            href={member.socials.discord} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-secondary hover:bg-primary hover:text-primary-foreground p-2 rounded-md transition-colors"
                            aria-label={`${member.name}'s Discord`}
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              className="h-4 w-4"
                            >
                              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.976-.608 1.413a18.273 18.273 0 0 0-5.487 0 12.675 12.675 0 0 0-.617-1.413.077.077 0 0 0-.079-.036 19.146 19.146 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055c1.997 1.464 3.949 2.378 5.945 2.95a.08.08 0 0 0 .088-.028c.379-.508.716-1.038 1.005-1.589a.076.076 0 0 0-.041-.106 12.37 12.37 0 0 1-1.838-.878.077.077 0 0 1-.009-.125c.125-.093.25-.19.368-.289a.074.074 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.074.074 0 0 1 .078.009c.12.099.245.198.366.29a.077.077 0 0 1-.006.125c-.598.344-1.22.635-1.841.88a.076.076 0 0 0-.041.106c.29.55.626 1.08 1.004 1.589a.078.078 0 0 0 .086.028c2.003-.572 3.954-1.486 5.952-2.95a.077.077 0 0 0 .032-.055c.502-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <DonateButton />
    </div>
  );
};

export default Contact;
