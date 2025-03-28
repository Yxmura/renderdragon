
import { useState, useEffect } from 'react';
import { Copy, Mail, Check, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Alex Johnson',
    role: 'Founder',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Sarah Wang',
    role: 'Lead Developer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80'
  },
  {
    name: 'Miguel Torres',
    role: 'Content Manager',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
  },
  {
    name: 'Emma Chen',
    role: 'Designer',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80'
  },
  {
    name: 'Chris Powell',
    role: 'Community Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
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
