import { useState, useEffect } from 'react';
import { Copy, Mail, Check, ExternalLink, Github } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  socials?: {
    github?: string;
    discord?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alex Johnson',
    role: 'Founder',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    socials: {
      github: 'https://github.com',
      discord: 'https://discord.com'
    }
  },
  {
    name: 'Sarah Wang',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
    socials: {
      github: 'https://github.com',
      discord: 'https://discord.com'
    }
  },
  {
    name: 'Miguel Torres',
    role: 'Content Manager',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    socials: {
      github: 'https://github.com',
      discord: 'https://discord.com'
    }
  },
  {
    name: 'Emma Chen',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    socials: {
      github: 'https://github.com',
      discord: 'https://discord.com'
    }
  },
  {
    name: 'Chris Powell',
    role: 'Community Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    socials: {
      github: 'https://github.com',
      discord: 'https://discord.com'
    }
  }
];

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = 'contact@creatoronwheels.com';

  useEffect(() => {
    document.title = 'Contact Us - Creator On Wheels';
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
                  href="https://discord.com" 
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
                  Our team is available to help Monday through Friday, 9 AM to 5 PM EST.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-vt323 mb-6 text-center">Meet The Team</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-3 pixel-corners">
                      <img 
                        src={member.avatar} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-sm font-medium">{member.name}</h3>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                    
                    {/* Social Icons */}
                    {member.socials && (
                      <div className="flex space-x-2 mt-2">
                        {member.socials.github && (
                          <a 
                            href={member.socials.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${member.name}'s GitHub`}
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                        {member.socials.discord && (
                          <a 
                            href={member.socials.discord} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
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
    </div>
  );
};

export default Contact;
