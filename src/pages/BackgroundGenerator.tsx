
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Download, RefreshCcw, Image as ImageIcon, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

const BackgroundGenerator = () => {
  const [style, setStyle] = useState('pixel-art');
  const [color, setColor] = useState('#9b87f5');
  const [complexity, setComplexity] = useState([50]);
  const [size, setSize] = useState('1920x1080');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Background Generator - Creator On Wheels';
    
    // Preload a demo image
    const timer = setTimeout(() => {
      setGeneratedImage('https://images.unsplash.com/photo-1610237052983-e5ae62379802?q=80&w=2070&auto=format&fit=crop');
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedImage('https://images.unsplash.com/photo-1610237052983-e5ae62379802?q=80&w=2070&auto=format&fit=crop');
      toast.success("Background generated!", {
        description: "Ready to download",
      });
    }, 2000);
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    toast.info("Starting download...", {
      description: "Your background will be downloaded shortly",
    });
    
    // In a real implementation, this would trigger an actual download
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `minecraft-background-${style}-${new Date().getTime()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 cow-grid-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Background</span> Generator
            </h1>
            
            <p className="text-center text-muted-foreground mb-8 max-w-xl mx-auto">
              Generate custom Minecraft-themed backgrounds for your content. Perfect for thumbnails, 
              stream overlays, and channel art.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-6 pixel-card">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Style</label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger className="pixel-corners">
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pixel-art">Pixel Art</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="retro">Retro</SelectItem>
                        <SelectItem value="minecraft">Minecraft-style</SelectItem>
                        <SelectItem value="futuristic">Futuristic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color Accent</label>
                    <div className="flex space-x-2">
                      <Input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-14 h-10 p-1 cursor-pointer border-none"
                      />
                      <Input 
                        type="text" 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="pixel-corners flex-grow"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Complexity</label>
                      <span className="text-xs text-muted-foreground">{complexity[0]}%</span>
                    </div>
                    <Slider 
                      value={complexity} 
                      onValueChange={setComplexity} 
                      min={0} 
                      max={100} 
                      step={1} 
                      className="pixel-corners" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Size</label>
                    <Select value={size} onValueChange={setSize}>
                      <SelectTrigger className="pixel-corners">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1920x1080">1920x1080 (16:9)</SelectItem>
                        <SelectItem value="1280x720">1280x720 (16:9)</SelectItem>
                        <SelectItem value="2560x1440">2560x1440 (16:9)</SelectItem>
                        <SelectItem value="1080x1080">1080x1080 (1:1)</SelectItem>
                        <SelectItem value="1080x1920">1080x1920 (9:16)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full pixel-btn-primary flex items-center justify-center space-x-2 mt-4"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCcw className="h-5 w-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-5 w-5" />
                        <span>Generate Background</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="md:col-span-2 pixel-card flex flex-col">
                <div className="mb-4 text-center">
                  <h3 className="text-lg font-vt323">Preview</h3>
                </div>
                
                <div className="flex-grow flex items-center justify-center bg-black/20 rounded-md overflow-hidden relative min-h-[300px]">
                  {generatedImage ? (
                    <img 
                      src={generatedImage} 
                      alt="Generated background" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : isGenerating ? (
                    <div className="text-center px-4 animate-pulse">
                      <RefreshCcw className="h-12 w-12 mx-auto mb-4 animate-spin" />
                      <p className="text-muted-foreground">Generating your unique Minecraft background...</p>
                    </div>
                  ) : (
                    <div className="text-center px-4">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Your generated background will appear here</p>
                    </div>
                  )}
                </div>
                
                {generatedImage && (
                  <Button 
                    onClick={handleDownload}
                    className="mt-4 pixel-btn-primary flex items-center justify-center space-x-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Download Background</span>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="mt-12 max-w-2xl mx-auto">
              <h2 className="text-2xl font-vt323 mb-4 text-center">How to Use</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="pixel-card p-6">
                  <div className="h-12 w-12 bg-cow-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-vt323 text-xl">1</span>
                  </div>
                  <h3 className="font-vt323 mb-2">Configure</h3>
                  <p className="text-sm text-muted-foreground">Select your desired style, color, and complexity</p>
                </div>
                
                <div className="pixel-card p-6">
                  <div className="h-12 w-12 bg-cow-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-vt323 text-xl">2</span>
                  </div>
                  <h3 className="font-vt323 mb-2">Generate</h3>
                  <p className="text-sm text-muted-foreground">Click the generate button and wait for your background</p>
                </div>
                
                <div className="pixel-card p-6">
                  <div className="h-12 w-12 bg-cow-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="font-vt323 text-xl">3</span>
                  </div>
                  <h3 className="font-vt323 mb-2">Download</h3>
                  <p className="text-sm text-muted-foreground">Download your background and use it in your content</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BackgroundGenerator;
