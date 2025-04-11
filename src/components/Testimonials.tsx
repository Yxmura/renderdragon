
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "yFury",
    role: "Minecraft YouTuber",
    content: "I love the assets cause they are harddd to find",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Twitch Streamer",
    content: "I've been using the Background Generator tool for my streams and my viewers love the results. The fact that everything is free is just amazing!",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Content Creator",
    content: "The YouTube Downloader and AI Title Helper have become essential tools in my workflow. I recommend COW to all my creator friends!",
    avatar: "https://i.pravatar.cc/150?img=8"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Pixel Art Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-8 h-8 bg-cow-purple pixel-corners"></div>
        <div className="absolute bottom-12 right-12 w-6 h-6 bg-cow-purple pixel-corners"></div>
        <div className="absolute top-1/4 right-1/4 w-4 h-10 bg-cow-purple pixel-corners"></div>
        <div className="absolute bottom-1/3 left-1/3 w-10 h-4 bg-cow-purple pixel-corners"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 animate-glow font-vt323">
          What <span className="text-cow-purple">Creators</span> Say About Us
        </h2>
        
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Don't just take our word for it - hear from the content creators who use our tools every day
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 pixel-corners"
            >
              {/* Card Header with Avatar */}
              <div className="p-6 bg-gradient-to-r from-cow-purple/10 to-transparent border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-cow-purple/30 pixel-corners">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
