'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Download, RefreshCcw, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet-async';

const BackgroundGenerator = () => {
  const [color, setColor] = useState('#9b87f5');
  const [size, setSize] = useState('1920x1080');
  const [spacing, setSpacing] = useState([10]);
  const [opacity, setOpacity] = useState([100]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      // Clear any previously generated image
      setGeneratedImage(null);
    };
    reader.readAsDataURL(file);
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    setGeneratedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const generatePattern = (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement, 
    canvasWidth: number, 
    canvasHeight: number,
    imgSpacing: number,
    imgOpacity: number
  ) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Set background color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Calculate image size while maintaining aspect ratio
    const aspectRatio = img.width / img.height;
    const patternHeight = 100; // Base pattern size
    const patternWidth = patternHeight * aspectRatio;
    
    // Calculate spacing
    const spacingPixels = imgSpacing;
    
    // Set opacity
    ctx.globalAlpha = imgOpacity / 100;
    
    // Draw pattern
    for (let y = 0; y < canvasHeight; y += patternHeight + spacingPixels) {
      for (let x = 0; x < canvasWidth; x += patternWidth + spacingPixels) {
        ctx.drawImage(img, x, y, patternWidth, patternHeight);
      }
    }
    
    // Reset opacity
    ctx.globalAlpha = 1;
  };

  const handleGenerate = () => {
    if (!uploadedImage) {
      toast.error("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    
    // Create dimensions from size string
    const [width, height] = size.split('x').map(dim => parseInt(dim, 10));
    
    // Create an image element from uploaded image
    const img = new Image();
    img.onload = () => {
      // Get canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;
      
      // Get context
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Generate pattern
      generatePattern(ctx, img, width, height, spacing[0], opacity[0]);
      
      // Convert canvas to data URL
      const dataUrl = canvas.toDataURL('image/png');
      setGeneratedImage(dataUrl);
      setIsGenerating(false);
      
      toast.success("Background generated!", {
        description: "Ready to download",
      });
    };
    
    img.onerror = () => {
      setIsGenerating(false);
      toast.error("Failed to load image");
    };
    
    img.src = uploadedImage;
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    
    toast.info("Starting download...", {
      description: "Your background will be downloaded shortly",
    });
    
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `minecraft-pattern-background-${size}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Background Generator - Renderdragon</title>
        <meta name="description" content="Create unique and engaging backgrounds for your Minecraft YouTube thumbnails and channel art with our background generator tool." />
        <meta property="og:title" content="Background Generator - Renderdragon" />
        <meta property="og:description" content="Create unique and engaging backgrounds for your Minecraft YouTube thumbnails and channel art with our background generator tool." />
        <meta property="og:image" content="https://renderdragon.org/ogimg/background.png" />
        <meta property="og:url" content="https://renderdragon.org/background-generator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Background Generator - Renderdragon" />
        <meta name="twitter:image" content="https://renderdragon.org/ogimg/background.png" />
      </Helmet>
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
                    <label className="text-sm font-medium">Upload Image</label>
                    <div className="flex space-x-2 items-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <Button 
                        onClick={() => fileInputRef.current?.click()}
                        className="pixel-btn-primary flex-grow flex items-center justify-center space-x-2"
                      >
                        <Upload className="h-5 w-5" />
                        <span>Select Image</span>
                      </Button>
                      {uploadedImage && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={clearUploadedImage}
                          className="pixel-corners"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      )}
                    </div>
                    {uploadedImage && (
                      <div className="mt-2 relative border border-primary/20 rounded-sm overflow-hidden h-24 bg-black/10">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded" 
                          className="h-full w-full object-contain" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Background Color</label>
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
                      <label className="text-sm font-medium">Spacing</label>
                      <span className="text-xs text-muted-foreground">{spacing[0]}px</span>
                    </div>
                    <Slider 
                      value={spacing} 
                      onValueChange={setSpacing} 
                      min={0} 
                      max={50} 
                      step={1} 
                      className="pixel-corners" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Opacity</label>
                      <span className="text-xs text-muted-foreground">{opacity[0]}%</span>
                    </div>
                    <Slider 
                      value={opacity} 
                      onValueChange={setOpacity} 
                      min={10} 
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
                    disabled={isGenerating || !uploadedImage}
                    className="w-full pixel-btn-primary flex items-center justify-center space-x-2 mt-4"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCcw className="h-5 w-5 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="h-5 w-5" />
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
                      <p className="text-muted-foreground">Generating your pattern background...</p>
                    </div>
                  ) : uploadedImage ? (
                    <div className="text-center px-4">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Click 'Generate Background' to create your pattern</p>
                    </div>
                  ) : (
                    <div className="text-center px-4">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Upload an image to get started</p>
                    </div>
                  )}
                  
                  <canvas ref={canvasRef} className="hidden"></canvas>
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
                  <h3 className="font-vt323 mb-2">Upload</h3>
                  <p className="text-sm text-muted-foreground">Upload your image and adjust settings</p>
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