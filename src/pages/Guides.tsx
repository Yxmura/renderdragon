
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import GuideCompleteButton from '@/components/GuideCompleteButton';

interface GuideStep {
  title: string;
  content: string;
  image?: string;
}

interface Guide {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: GuideStep[];
}

// Mock guides data
const mockGuides: Guide[] = [
  {
    id: 1,
    title: 'Creating Minecraft Thumbnails That Get Clicks',
    description: 'Learn how to create eye-catching Minecraft thumbnails that increase your click-through rate',
    category: 'design',
    difficulty: 'beginner',
    steps: [
      {
        title: 'Choose the Right Screenshot',
        content: 'Start by capturing an interesting moment from your Minecraft gameplay. Look for colorful builds, exciting action, or impressive creations. Position yourself for a good angle and use F1 to hide the UI before taking a screenshot with F2.',
        image: 'https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&q=80&w=2532'
      },
      {
        title: 'Edit the Background',
        content: 'Open your screenshot in an image editor. Enhance colors to make them pop, and consider blurring the background slightly to create depth. You can also add a subtle vignette effect to draw attention to the center.',
        image: 'https://images.unsplash.com/photo-1617142108319-66c7ab45c711?auto=format&fit=crop&q=80&w=2532'
      },
      {
        title: 'Add Text Elements',
        content: 'Include a bold, easy-to-read title on your thumbnail. Choose a font that matches your channel style and make sure it contrasts well with the background. Keep text concise—ideally 3-5 words maximum.',
        image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=2574'
      },
      {
        title: 'Create Visual Impact with Elements',
        content: 'Add graphic elements like arrows, circles, or emoji to highlight important parts of your thumbnail. These draw the viewer\'s eye to key points of interest and create curiosity.',
        image: 'https://images.unsplash.com/photo-1635514569146-8e8bb34fe2f5?auto=format&fit=crop&q=80&w=1877'
      },
      {
        title: 'Incorporate Your Branding',
        content: 'Add your logo or channel name in a consistent location on all thumbnails. This helps with brand recognition and makes your content instantly identifiable in search results and suggested videos.',
        image: 'https://images.unsplash.com/photo-1634757439914-e7ffc3c79fdc?auto=format&fit=crop&q=80&w=1964'
      }
    ]
  },
  {
    id: 2,
    title: 'Setting Up OBS for Minecraft Streaming',
    description: 'Configure OBS Studio for optimal Minecraft streaming performance',
    category: 'streaming',
    difficulty: 'intermediate',
    steps: [
      {
        title: 'Download and Install OBS Studio',
        content: 'Visit obsproject.com to download the latest version of OBS Studio. Run the installer and follow the on-screen instructions to complete the installation process.',
        image: 'https://images.unsplash.com/photo-1633051501119-9756c6fb094e?auto=format&fit=crop&q=80&w=1995'
      },
      {
        title: 'Run the Auto-Configuration Wizard',
        content: 'Go to Tools > Auto-Configuration Wizard to optimize settings for your specific hardware. Choose "Optimize for streaming" and follow the steps to complete the wizard.',
        image: 'https://images.unsplash.com/photo-1614680376408-16afbd2f6b4b?auto=format&fit=crop&q=80&w=2574'
      },
      {
        title: 'Set Up Your Game Capture Source',
        content: 'Click the + icon in the Sources panel and select "Game Capture." Choose "Capture specific window" and select Minecraft from the dropdown. Enable "Allow transparency" for better performance.',
        image: 'https://images.unsplash.com/photo-1613484838923-bfbbbf3a4d4a?auto=format&fit=crop&q=80&w=2070'
      },
      {
        title: 'Add and Configure a Webcam',
        content: 'Click the + icon in the Sources panel again and select "Video Capture Device." Choose your webcam from the dropdown and adjust its position by dragging it where you want it to appear on stream.',
        image: 'https://images.unsplash.com/photo-1626379801357-537572de4ad6?auto=format&fit=crop&q=80&w=1932'
      },
      {
        title: 'Set Up Alerts and Overlays',
        content: 'Consider adding stream alerts and overlays to engage with your viewers. Services like StreamElements or Streamlabs offer customizable overlays that you can add as a Browser Source in OBS.',
        image: 'https://images.unsplash.com/photo-1614680376739-8360a29eb024?auto=format&fit=crop&q=80&w=2574'
      }
    ]
  },
  {
    id: 3,
    title: 'Creating Custom Minecraft Resource Packs',
    description: 'Learn to create and share custom texture packs for Minecraft',
    category: 'design',
    difficulty: 'advanced',
    steps: [
      {
        title: 'Understanding Resource Pack Structure',
        content: 'Resource packs have a specific folder structure. Create a folder with your pack name, and inside it create a "pack.mcmeta" file and an "assets" folder. The assets folder will contain all your custom textures.',
        image: 'https://images.unsplash.com/photo-1617296538902-887900d9b592?auto=format&fit=crop&q=80&w=2070'
      },
      {
        title: 'Creating the Pack Metadata',
        content: 'In your pack.mcmeta file, add the required JSON structure to define your pack format and description. This file tells Minecraft about your resource pack.',
        image: 'https://images.unsplash.com/photo-1611651105904-5fa9be0292e3?auto=format&fit=crop&q=80&w=2071'
      },
      {
        title: 'Extracting Default Textures',
        content: 'Extract the default Minecraft textures to use as a reference. You can do this by opening the Minecraft .jar file with a program like 7-Zip and navigating to the assets folder.',
        image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&q=80&w=2574'
      },
      {
        title: 'Creating Custom Textures',
        content: 'Use an image editor like Photoshop or GIMP to modify the textures. Keep the same file names and folder structure as the original files, and maintain the original image dimensions.',
        image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&q=80&w=2574'
      },
      {
        title: 'Testing and Sharing Your Resource Pack',
        content: 'Place your resource pack folder in the "resourcepacks" folder in your Minecraft directory. Test it in-game, make adjustments as needed, and finally zip the folder to share it with others.',
        image: 'https://images.unsplash.com/photo-1633051501115-7f9b7ba3be12?auto=format&fit=crop&q=80&w=1995'
      }
    ]
  }
];

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Minecraft Guides - Renderdragon';
    
    // Simulate API fetch
    setTimeout(() => {
      setGuides(mockGuides);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSelectGuide = (guide: Guide) => {
    setSelectedGuide(guide);
    setCurrentStep(0);
    window.scrollTo(0, 0);
  };

  const handleNextStep = () => {
    if (selectedGuide && currentStep < selectedGuide.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToGuides = () => {
    setSelectedGuide(null);
    setCurrentStep(0);
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
          {selectedGuide ? (
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <Button 
                    variant="ghost" 
                    className="mb-2 -ml-2 flex items-center text-muted-foreground hover:text-foreground"
                    onClick={handleBackToGuides}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back to Guides
                  </Button>
                  <h1 className="text-3xl md:text-4xl font-vt323">
                    {selectedGuide.title}
                  </h1>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded-md text-xs bg-blue-500/10 text-blue-500">
                      {selectedGuide.category}
                    </span>
                    <span className={`px-2 py-1 rounded-md text-xs ${getDifficultyColor(selectedGuide.difficulty)}`}>
                      {selectedGuide.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-muted-foreground text-sm mr-4">
                    Step {currentStep + 1} of {selectedGuide.steps.length}
                  </span>
                </div>
              </div>
              
              <div className="guide-step">
                <div className="guide-step-number">
                  {currentStep + 1}
                </div>
                
                <h2 className="text-xl font-vt323 mb-4">
                  {selectedGuide.steps[currentStep].title}
                </h2>
                
                <p className="mb-6 text-muted-foreground">
                  {selectedGuide.steps[currentStep].content}
                </p>
                
                {selectedGuide.steps[currentStep].image && (
                  <div className="my-6 rounded-md overflow-hidden">
                    <img 
                      src={selectedGuide.steps[currentStep].image} 
                      alt={selectedGuide.steps[currentStep].title} 
                      className="w-full h-auto"
                    />
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    className="pixel-corners"
                    onClick={handlePrevStep}
                    disabled={currentStep === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  {currentStep === selectedGuide.steps.length - 1 ? (
                    <GuideCompleteButton guideId={selectedGuide.id.toString()} />
                  ) : (
                    <Button 
                      className="pixel-btn-primary"
                      onClick={handleNextStep}
                    >
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
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
                      onClick={() => handleSelectGuide(guide)}
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
                          <span>{guide.steps.length} steps</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          className="w-full pixel-btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectGuide(guide);
                          }}
                        >
                          Start Guide
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Guides;
