
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Minecraft YouTuber",
    content: "Creator On Wheels has completely transformed my content creation process. The free resources and tools have saved me countless hours and helped me grow my channel!",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Twitch Streamer",
    content: "I've been using the Background Generator tool for my streams and my viewers love the results. The fact that everything is free is just amazing!",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Content Creator",
    content: "The YouTube Downloader and AI Title Helper have become essential tools in my workflow. I recommend COW to all my creator friends!",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-glow">
          What <span className="text-cow-purple">Creators</span> Say About Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="testimonial-card hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="testimonial-avatar">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <div className="testimonial-stars mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={i < testimonial.rating ? "currentColor" : "none"} 
                        strokeWidth={i < testimonial.rating ? 0 : 1.5}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <blockquote className="testimonial-quote">
                {testimonial.content}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
