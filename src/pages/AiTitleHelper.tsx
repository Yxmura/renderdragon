
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wand2, Copy, CheckCheck, RefreshCcw, Copy as CopyIcon, Sparkles, ThumbsUp, ThumbsDown, Bot, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface TitleSuggestion {
  id: string;
  title: string;
  clicks: number;
  ctr: number;
  type: 'creative' | 'descriptive' | 'emotional' | 'trending';
}

const mockSuggestions: TitleSuggestion[] = [
  {
    id: '1',
    title: "I Built a SECRET Minecraft Base That NO ONE Can Find!",
    clicks: 98,
    ctr: 12.4,
    type: 'emotional'
  },
  {
    id: '2',
    title: "Ultimate Minecraft Castle Build Tutorial - Step by Step Guide",
    clicks: 89,
    ctr: 10.2,
    type: 'descriptive'
  },
  {
    id: '3',
    title: "This Minecraft Redstone Trick Will CHANGE Your Game Forever...",
    clicks: 95,
    ctr: 11.8,
    type: 'trending'
  },
  {
    id: '4',
    title: "How I Survived 100 Days in Minecraft Hardcore Mode",
    clicks: 92,
    ctr: 11.1,
    type: 'descriptive'
  },
  {
    id: '5',
    title: "The IMPOSSIBLE Minecraft Challenge That Broke My Brain!",
    clicks: 97,
    ctr: 12.1,
    type: 'emotional'
  },
  {
    id: '6',
    title: "Minecraft, But Every Block Is OP...",
    clicks: 94,
    ctr: 11.5,
    type: 'creative'
  },
  {
    id: '7',
    title: "I Tested 10 Viral Minecraft Hacks To See If They Actually Work",
    clicks: 93,
    ctr: 11.3,
    type: 'trending'
  },
  {
    id: '8',
    title: "Building the Ultimate Minecraft Survival House (2023 Design)",
    clicks: 90,
    ctr: 10.8,
    type: 'descriptive'
  }
];

const getTitleTypeBadge = (type: string) => {
  switch (type) {
    case 'creative':
      return <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Creative</Badge>;
    case 'descriptive':
      return <Badge variant="outline" className="bg-blue-500/10 text-blue-500">Descriptive</Badge>;
    case 'emotional':
      return <Badge variant="outline" className="bg-red-500/10 text-red-500">Emotional</Badge>;
    case 'trending':
      return <Badge variant="outline" className="bg-green-500/10 text-green-500">Trending</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const AiTitleHelper = () => {
  const [videoDescription, setVideoDescription] = useState('');
  const [titleSuggestions, setTitleSuggestions] = useState<TitleSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [creativity, setCreativity] = useState([50]);
  const [selectedTitle, setSelectedTitle] = useState<TitleSuggestion | null>(null);

  useEffect(() => {
    document.title = 'AI Title Helper - Creator On Wheels';
  }, []);

  const handleGenerateTitles = () => {
    if (!videoDescription.trim()) {
      toast.error("Please enter a video description");
      return;
    }
    
    setIsLoading(true);
    setTitleSuggestions([]);
    setSelectedTitle(null);
    
    // Simulate AI processing
    setTimeout(() => {
      const shuffled = [...mockSuggestions].sort(() => 0.5 - Math.random());
      setTitleSuggestions(shuffled.slice(0, 5));
      setIsLoading(false);
      
      toast.success("Generated 5 title suggestions", {
        description: "Click on a title to select it",
      });
    }, 2000);
  };

  const handleTitleSelect = (title: TitleSuggestion) => {
    setSelectedTitle(title);
    toast("Title selected", {
      description: "Click the copy button to use it"
    });
  };

  const handleCopyTitle = () => {
    if (!selectedTitle) return;
    
    navigator.clipboard.writeText(selectedTitle.title);
    toast.success("Title copied to clipboard!");
  };

  const handleThumbsUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast("Thanks for your feedback!", {
      description: "We'll improve our suggestions based on your preferences",
    });
  };

  const handleThumbsDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast("Thanks for your feedback!", {
      description: "We'll improve our suggestions based on your preferences",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">AI Title</span> Helper
            </h1>
            
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              Generate click-worthy YouTube titles for your Minecraft videos
              using our AI assistant. Get more views with optimized titles!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-2 space-y-6">
                <Card className="pixel-card space-y-4">
                  <h2 className="text-xl font-vt323 flex items-center">
                    <Bot className="h-5 w-5 mr-2" />
                    <span>Input Information</span>
                  </h2>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Description</label>
                    <Textarea
                      placeholder="Describe what your Minecraft video is about..."
                      value={videoDescription}
                      onChange={(e) => setVideoDescription(e.target.value)}
                      className="pixel-corners h-32"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Keywords (optional)</label>
                    <Input
                      placeholder="minecraft, tutorial, build, etc."
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      className="pixel-corners"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Creativity Level</label>
                      <span className="text-xs text-muted-foreground">{creativity[0]}%</span>
                    </div>
                    <Slider 
                      value={creativity} 
                      onValueChange={setCreativity} 
                      min={0} 
                      max={100} 
                      step={1}
                      className="pixel-corners"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Factual</span>
                      <span>Creative</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGenerateTitles}
                    disabled={isLoading || !videoDescription.trim()}
                    className="w-full pixel-btn-primary"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCcw className="h-5 w-5 mr-2 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-5 w-5 mr-2" />
                        <span>Generate Titles</span>
                      </>
                    )}
                  </Button>
                </Card>
                
                <Card className="pixel-card">
                  <h2 className="text-xl font-vt323 mb-4 flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    <span>Title Tips</span>
                  </h2>
                  
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex items-start">
                      <span className="bg-cow-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                      <span>Keep titles under 60 characters for best display on search results</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-cow-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                      <span>Include keywords near the beginning of your title</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-cow-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                      <span>Create curiosity or excitement to increase click-through rate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-cow-purple text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                      <span>Avoid clickbait that doesn't deliver - it hurts retention</span>
                    </li>
                  </ul>
                </Card>
              </div>
              
              <div className="md:col-span-3 space-y-6">
                <Card className="pixel-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-vt323 flex items-center">
                      <Sparkles className="h-5 w-5 mr-2" />
                      <span>Title Suggestions</span>
                    </h2>
                    
                    {titleSuggestions.length > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Click on a title to select it
                      </p>
                    )}
                  </div>
                  
                  {isLoading ? (
                    <div className="text-center py-12 animate-pulse">
                      <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin text-cow-purple" />
                      <p className="text-lg">Our AI is crafting catchy titles...</p>
                    </div>
                  ) : titleSuggestions.length > 0 ? (
                    <div className="space-y-3">
                      {titleSuggestions.map(title => (
                        <div 
                          key={title.id}
                          onClick={() => handleTitleSelect(title)}
                          className={`pixel-card cursor-pointer transition-all ${
                            selectedTitle?.id === title.id ? 'border-primary' : 'hover:border-accent'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className={`font-medium ${selectedTitle?.id === title.id ? 'text-primary' : ''}`}>
                              {title.title}
                            </h3>
                            
                            <div className="flex gap-1 ml-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handleThumbsUp}
                                title="This title is good"
                              >
                                <ThumbsUp className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={handleThumbsDown}
                                title="This title could be better"
                              >
                                <ThumbsDown className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {getTitleTypeBadge(title.type)}
                              
                              <div className="text-xs text-muted-foreground">
                                {title.title.length} characters
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="text-xs flex flex-col text-right">
                                <span className="font-medium">Est. CTR: {title.ctr}%</span>
                                <span className="text-muted-foreground">Score: {title.clicks}/100</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : videoDescription ? (
                    <div className="text-center py-12">
                      <Wand2 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">Click "Generate Titles" to get started</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">Enter a video description to get started</p>
                    </div>
                  )}
                </Card>
                
                {selectedTitle && (
                  <Card className="pixel-card space-y-4">
                    <h2 className="text-xl font-vt323 mb-2">Your Selected Title</h2>
                    
                    <div className="bg-accent/30 p-4 rounded-md">
                      <p className="font-medium text-lg">{selectedTitle.title}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getTitleTypeBadge(selectedTitle.type)}
                          <span className="text-xs text-muted-foreground">
                            {selectedTitle.title.length} characters
                          </span>
                        </div>
                        
                        <div className="text-xs">
                          <span className="text-muted-foreground">Estimated performance: </span>
                          <span className="font-medium">
                            {selectedTitle.clicks >= 95 ? 'Excellent' : selectedTitle.clicks >= 90 ? 'Great' : 'Good'}
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleCopyTitle}
                        className="pixel-corners"
                      >
                        <CopyIcon className="h-4 w-4 mr-2" />
                        <span>Copy Title</span>
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AiTitleHelper;
