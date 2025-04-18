
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
    role: "Minecraft YouTuber & Streamer",
    content: "I love the assets cause they are harddd to find",
    avatar: "https://yt3.googleusercontent.com/3Cw6xKbuZAEP_H9nb4X4oTq1aTE0q9xw5HsVZaVkDnhCZa7cmk7YaGXt2VHsUtKAH4hdRzT1Qw=s160-c-k-c0x00ffffff-no-rj"
  },
  {
    id: 2,
    name: "Jkingnick",
    role: "Minecraft Youtuber",
    content: "Website looks very professional and seems to be a really cool idea for content creators like myself",
    avatar: "https://yt3.googleusercontent.com/HFLfDyR4bTDYlIIXO09euXCQSBIgB6DlhXDbDA4kBKUW5lgbVtl2bo0ylnKjNwk_S4WyAitcbA=s160-c-k-c0x00ffffff-no-rj"
  },
  {
    id: 3,
    name: "AlphaReturns",
     role: "Minecraft Youtuber and Thumbnail Designer",
     content: "Renderdragon is a really good tool with great assets that can be useful for pretty much any YouTuber (small or big)",
     avatar: "https://yt3.googleusercontent.com/9RbZiqYgTK5WKR-JmUbimeCKwlMwEKTDuCEs300PnCS72xzOg9uIQFckG0MlhCeOVA7zUuMp=s160-c-k-c0x00ffffff-no-rj"
  },
  {
    id: 4,
    name: "stove",
    role: "Minecraft Youtuber",
    content: "I am glad that i can legally download youtube tools without getting 308 viruses!!",
    avatar: "https://2cu76k77cd.ufs.sh/f/1TT1D8b4nz0qw3MC7WniSMKsrf1HTZCm3biQt2DXBGeu6zdF"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 pixel-corners"
            >
              <div className="p-6 bg-gradient-to-r from-cow-purple/10 to-transparent border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 overflow-hidden border-2 border-cow-purple/30 rounded-full">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
<<<<<<< HEAD
              
              {/* da content of da card */}
=======

              {/* Card Content */}
>>>>>>> faee21fbbda64adfd850547828c7c44fd488774b
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
