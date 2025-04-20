import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DonateButton from '@/components/DonateButton';

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pdfUrl?: string; // Optional property for PDF file URL
}

const mockGuides: Guide[] = [
  {
    id: 1,
    title: 'Advanced Scriptwriting Guide',
    description: 'Learn how to write ideal scripts including hooks, retains, informs, satisfies, and finally persuades the audience towards an action.',
    category: 'scriptwriting',
    difficulty: 'advanced',
    pdfUrl: '/guides/scriptwriting.pdf' // Add the PDF URL here
  },
  {
    id: 2,
    title: 'How to use AI in Content creation',
    description: 'Learn how to use AI tools to enhance your content creation process for free.',
    category: 'artificial intelligence',
    difficulty: 'intermediate',
    pdfUrl: '/guides/AI.pdf'
  },
];

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Minecraft Guides - Renderdragon';

    setTimeout(() => {
      setGuides(mockGuides);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleOpenPdf = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-500/10 text-green-500';
      case 'intermediate':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'advanced':
        return 'bg-red-500/10 text-red-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Minecraft</span> Guides
            </h1>

            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Step-by-step tutorials to help you level up your Minecraft content creation skills.
              From beginner basics to advanced techniques.
            </p>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card rounded-md h-64"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Card 
                    key={guide.id} 
                    className="pixel-corners border border-border hover:border-primary transition-all cursor-pointer"
                    onClick={() => handleOpenPdf(guide.pdfUrl || '')}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2">
                          <span className="px-2 py-1 rounded-md text-xs bg-blue-500/10 text-blue-500">
                            {guide.category}
                          </span>
                          <span className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(guide.difficulty)}`}>
                            {guide.difficulty}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="font-vt323 text-xl">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        <span>Open PDF</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <DonateButton />
    </div>
  );
};

export default Guides;
