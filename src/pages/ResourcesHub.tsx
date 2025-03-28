
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Music, Image, Video, FileText, Search, Filter, Copy, Check, FileAudio, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Resource {
  id: number;
  title: string;
  category: 'music' | 'sfx' | 'image' | 'animation' | 'font' | 'preset';
  subcategory?: 'davinci' | 'premiere' | null;
  downloadUrl: string;
  author?: string;
  previewUrl?: string;
}

// Mock resources data
const mockResources: Resource[] = [
  {
    id: 1,
    title: 'Epic Adventure Theme',
    category: 'music',
    downloadUrl: '#',
    author: 'MusicMaster',
    previewUrl: 'https://example.com/preview.mp3'
  },
  {
    id: 2,
    title: 'Cyberpunk Background Pack',
    category: 'image',
    downloadUrl: '#',
    previewUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: 3,
    title: 'Cinematic Color Grade',
    category: 'preset',
    subcategory: 'davinci',
    downloadUrl: '#',
    author: 'ColorGrader'
  },
  {
    id: 4,
    title: 'Whoosh Transitions',
    category: 'sfx',
    downloadUrl: '#',
    previewUrl: 'https://example.com/whoosh.mp3'
  },
  {
    id: 5,
    title: 'Pixel Art Font',
    category: 'font',
    downloadUrl: '#',
    author: 'FontDesigner',
    previewUrl: 'https://example.com/font.ttf'
  },
  {
    id: 6,
    title: 'Lower Thirds Pack',
    category: 'animation',
    downloadUrl: '#',
    previewUrl: 'https://example.com/lowers.mp4'
  },
  {
    id: 7,
    title: 'Vlog Transitions',
    category: 'preset',
    subcategory: 'premiere',
    downloadUrl: '#'
  },
  {
    id: 8,
    title: 'Ambient Background Music',
    category: 'music',
    downloadUrl: '#',
    author: 'AmbientCreator',
    previewUrl: 'https://example.com/ambient.mp3'
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'music':
      return <Music className="h-5 w-5" />;
    case 'sfx':
      return <FileAudio className="h-5 w-5" />;
    case 'image':
      return <Image className="h-5 w-5" />;
    case 'animation':
      return <Video className="h-5 w-5" />;
    case 'font':
      return <FileText className="h-5 w-5" />;
    default:
      return <FileText className="h-5 w-5" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'music':
      return 'bg-blue-500/10 text-blue-500';
    case 'sfx':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'image':
      return 'bg-purple-500/10 text-purple-500';
    case 'animation':
      return 'bg-red-500/10 text-red-500';
    case 'font':
      return 'bg-green-500/10 text-green-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};

const ResourcesHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    document.title = 'Resources Hub - Creator On Wheels';
    
    // Simulate API fetch
    setTimeout(() => {
      setResources(mockResources);
    }, 300);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const copyCredit = () => {
    if (!selectedResource?.author) return;
    
    const creditText = `Music by ${selectedResource.author}`;
    navigator.clipboard.writeText(creditText);
    setCopied(true);
    toast.success("Credit copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDownload = () => {
    if (!selectedResource) return;
    
    // In a real app, this would trigger the actual download
    toast.info("Starting download...", {
      description: "Crediting Creator On Wheels is optional but appreciated!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Resources</span> Hub
            </h1>
            
            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-9 pixel-input w-full"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="h-10 pixel-corners"
                >
                  All
                </Button>
                <Button
                  variant={selectedCategory === 'music' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('music')}
                  className="h-10 pixel-corners"
                >
                  Music
                </Button>
                <Button
                  variant={selectedCategory === 'sfx' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('sfx')}
                  className="h-10 pixel-corners"
                >
                  SFX
                </Button>
                <Button
                  variant={selectedCategory === 'image' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('image')}
                  className="h-10 pixel-corners"
                >
                  Images
                </Button>
                <Button
                  variant={selectedCategory === 'preset' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory('preset')}
                  className="h-10 pixel-corners"
                >
                  Presets
                </Button>
              </div>
            </div>
            
            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No resources found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    onClick={() => setSelectedResource(resource)}
                    className="pixel-card group cursor-pointer hover:border-primary transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${getCategoryColor(resource.category)}`}>
                        {getCategoryIcon(resource.category)}
                        <span className="ml-1 capitalize">{resource.category}</span>
                        {resource.subcategory && (
                          <span className="ml-1">({resource.subcategory})</span>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-vt323 mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    
                    {resource.author ? (
                      <div className="text-xs bg-orange-500/10 text-orange-500 px-2 py-1 rounded-md inline-flex items-center">
                        <span>Credit required</span>
                      </div>
                    ) : (
                      <div className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-md inline-flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        <span>No credit needed</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Resource Detail Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
        <DialogContent className="sm:max-w-2xl pixel-corners border-2 border-cow-purple">
          <DialogHeader>
            <DialogTitle className="text-2xl font-vt323">{selectedResource?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge variant="outline" className={getCategoryColor(selectedResource?.category || '')}>
                {getCategoryIcon(selectedResource?.category || '')}
                <span className="ml-1 capitalize">{selectedResource?.category}</span>
                {selectedResource?.subcategory && (
                  <span className="ml-1">({selectedResource.subcategory})</span>
                )}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Credit Section */}
            <div className="border border-border rounded-md p-4">
              <h4 className="font-vt323 text-lg mb-2">Attribution</h4>
              
              {selectedResource?.author ? (
                <div className="space-y-2">
                  <p className="text-sm text-orange-500 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Please credit this author in your description:
                  </p>
                  
                  <div className="flex items-center">
                    <code className="bg-muted px-2 py-1 rounded text-sm flex-grow">
                      Music by {selectedResource.author}
                    </code>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyCredit}
                      className="ml-2 h-8 flex items-center gap-1 pixel-corners"
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
              ) : (
                <div className="flex items-center text-green-500">
                  <Check className="h-5 w-5 mr-2" />
                  <span>No attribution required! You're free to use this resource without crediting.</span>
                </div>
              )}
            </div>
            
            {/* Preview Section */}
            {selectedResource?.previewUrl && (
              <div className="border border-border rounded-md p-4">
                <h4 className="font-vt323 text-lg mb-4">Preview</h4>
                
                {selectedResource.category === 'music' || selectedResource.category === 'sfx' ? (
                  <div className="bg-muted rounded-md p-3 flex items-center">
                    <div className="w-full">
                      <div className="flex items-center mb-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-8 w-8 p-0 pixel-corners"
                        >
                          <Music className="h-4 w-4" />
                        </Button>
                        <div className="ml-3 text-sm">Audio Preview</div>
                      </div>
                      
                      <div className="w-full h-4 bg-background rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: '35%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ) : selectedResource.category === 'image' ? (
                  <div className="rounded-md overflow-hidden">
                    <img 
                      src={selectedResource.previewUrl} 
                      alt={selectedResource.title} 
                      className="w-full h-auto"
                    />
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Preview not available in this demo.
                  </p>
                )}
              </div>
            )}
            
            {/* Download Button */}
            <Button 
              onClick={handleDownload}
              className="w-full pixel-btn-primary flex items-center justify-center gap-2"
            >
              <Download className="h-5 w-5" />
              <span>Download Resource</span>
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By downloading, you agree to our terms of use. Crediting "Creator On Wheels" is optional but appreciated!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourcesHub;
