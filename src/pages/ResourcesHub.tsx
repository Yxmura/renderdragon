
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Music,
  Image,
  Video,
  FileText,
  Filter,
  Copy,
  Check,
  FileAudio,
  Download,
  Github,
  X,
  ExternalLink,
  Search,
  AlertTriangle,
  FolderX,
} from 'lucide-react';
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
import { useKBar } from 'kbar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import AudioPlayer from '@/components/AudioPlayer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Resource {
  id: number;
  title: string;
  category: 'music' | 'sfx' | 'image' | 'animations' | 'fonts' | 'presets';
  subcategory?: 'davinci' | 'premiere' | null;
  credit?: string;
  filetype?: string;
  downloads?: number;
}

interface ResourcesData {
  animations: Resource[];
  fonts: Resource[];
  music: Resource[];
  sfx: Resource[];
  images: Resource[];
  presets: Resource[];
}

const ResourcesHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { query } = useKBar();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});
  const [lastAction, setLastAction] = useState<string>(''); // Track the last filtering action

  const fetchResources = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/resources.json');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch resources: ${response.status} ${response.statusText}`,
        );
      }
      const resourcesData = (await response.json()) as ResourcesData;

      const allResources: Resource[] = Object.entries(resourcesData).flatMap(
        ([category, resources]) =>
          resources.map((resource) => ({ 
            ...resource, 
            category: category as 'music' | 'sfx' | 'image' | 'animations' | 'fonts' | 'presets',
            downloads: Math.floor(Math.random() * 1000) + 50 // Add random download count initially
          })),
      );

      setResources(allResources);
      
      // Initialize download counts
      const counts: Record<number, number> = {};
      allResources.forEach(resource => {
        counts[resource.id] = resource.downloads || 0;
      });
      setDownloadCounts(counts);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Resources Hub - Creator On Wheels';

    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        query.toggle();
      }
    };

    window.addEventListener('keydown', handleKeydown);

    fetchResources();

    query.inputRefSetter(inputRef.current);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      query.inputRefSetter(null);
    };
  }, [query, fetchResources]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSearching(true);
    setLastAction('search');
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
    setLastAction('clear');
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    // When changing category, reset subcategory unless we're selecting 'presets'
    if (category !== 'presets') {
      setSelectedSubcategory(null);
    }
    setLastAction('category');
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setLastAction('search');
    
    if (e.target.value === '') {
      setIsSearching(false);
    } else {
      setIsSearching(true);
    }
  };

  // Determine which resources to display based on filters
  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Apply search query filter
      const matchesSearch = !isSearching || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.subcategory || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply category filter
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      
      // Apply subcategory filter
      const matchesSubcategory = !selectedSubcategory || resource.subcategory === selectedSubcategory;
      
      return matchesSearch && matchesCategory && matchesSubcategory;
    });
  }, [resources, selectedCategory, selectedSubcategory, searchQuery, isSearching]);

  const copyCredit = () => {
    if (!selectedResource?.credit) return;

    const creditText = `Music by ${selectedResource.credit}`;
    navigator.clipboard.writeText(creditText);
    setCopied(true);
    toast.success('Credit copied to clipboard!');

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getDownloadURL = (resource: Resource) => {
    if (!resource || !resource.filetype) return '';
    const titleLowered = resource.title
      .toLowerCase()
      .replace(/ /g, '%20');
    return `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}.${resource.filetype}`;
  };

  const handleDownload = () => {
    if (!selectedResource) return;

    const downloadURL = getDownloadURL(selectedResource);

    if (downloadURL) {
      window.open(downloadURL, '_blank'); 
      
      // Update download count
      setDownloadCounts(prev => {
        const newCount = (prev[selectedResource.id] || 0) + 1;
        return {
          ...prev,
          [selectedResource.id]: newCount
        };
      });
      
      toast.info('Starting download...', {
        description: 'Crediting Renderdragon is optional but appreciated!',
        duration: 3000,
      });
    } else {
      toast.error('Download URL not available.');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music':
        return <Music className="h-5 w-5" />;
      case 'sfx':
        return <FileAudio className="h-5 w-5" />;
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'animations':
        return <Video className="h-5 w-5" />;
      case 'fonts':
        return <FileText className="h-5 w-5" />;
      case 'presets':
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
      case 'animations':
        return 'bg-red-500/10 text-red-500';
      case 'fonts':
        return 'bg-green-500/10 text-green-500';
      case 'presets':
        return 'bg-gray-500/10 text-gray-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  const ResourcePreview = ({ resource }: { resource: Resource }) => {
    const downloadURL = getDownloadURL(resource);

    if (!downloadURL) {
      return <p>No preview available</p>;
    }

    if (resource.category === 'music' || resource.category === 'sfx') {
      return <AudioPlayer src={downloadURL} />;
    }

    if (resource.category === 'animations') {
      return (
        <video
          src={downloadURL}
          controls
          className="w-full rounded-md aspect-video"
        />
      );
    }

    if (resource.category === 'image') {
      return (
        <img
          src={downloadURL}
          alt={resource.title}
          className="w-full rounded-md aspect-square object-cover"
        />
      );
    }

    if (resource.category === 'fonts') {
      return (
        <div
          style={{
            fontFamily: resource.title,
            fontSize: '2rem',
            textAlign: 'center',
            padding: '1rem',
            color: 'white',
            backgroundColor: '#374151',
            borderRadius: '0.5rem',
          }}
        >
          The quick brown fox jumps over the lazy dog.
          <style>
            {`
              @font-face {
                font-family: '${resource.title}';
                src: url('${downloadURL}') format('${resource.filetype}');
              }
            `}
          </style>
        </div>
      );
    }

    return <p>Preview not available for this type.</p>;
  };

  // Check if we have resources in the current selected category
  const hasCategoryResources = useMemo(() => {
    if (!selectedCategory) return true;
    return resources.some(resource => resource.category === selectedCategory);
  }, [resources, selectedCategory]);

  // Either no resources match filters, or the selected category has no resources
  const shouldShowNoResourcesMessage = filteredResources.length === 0 || 
                                      (selectedCategory && !hasCategoryResources);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 cow-grid-bg custom-scrollbar">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-vt323 mb-8 text-center">
              <span className="text-cow-purple">Resources</span> Hub
            </h1>

            <div className="mb-8 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <Input
                    ref={inputRef}
                    placeholder="Search resources (or press Ctrl+K)..."
                    value={searchQuery}
                    onChange={handleSearch}
                    onClick={() => query.toggle()}
                    className="pixel-input w-full pr-10"
                  />
                  
                  {searchQuery && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                      onClick={handleClearSearch}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Clear search</span>
                    </Button>
                  )}
                  
                  <Button type="submit" className="sr-only">Search</Button>
                </form>
              </div>

              {isMobile ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button size="icon" className="pixel-corners">
                      <Filter className="h-4 w-4" />
                      <span className="sr-only">Filter</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="bottom" className="h-[80vh] pixel-corners">
                    <div className="h-full py-4 space-y-4">
                      <h3 className="text-lg font-vt323 mb-2">
                        Filter by Category
                      </h3>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant={selectedCategory === null ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange(null)}
                          className="justify-start pixel-corners"
                        >
                          All
                        </Button>
                        <Button
                          variant={selectedCategory === 'music' ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange('music')}
                          className="justify-start pixel-corners"
                        >
                          <Music className="h-4 w-4 mr-2" />
                          Music
                        </Button>
                        <Button
                          variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange('sfx')}
                          className="justify-start pixel-corners"
                        >
                          <FileAudio className="h-4 w-4 mr-2" />
                          SFX
                        </Button>
                        <Button
                          variant={selectedCategory === 'image' ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange('image')}
                          className="justify-start pixel-corners"
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Images
                        </Button>
                        <Button
                          variant={selectedCategory === 'animations' ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange('animations')}
                          className="justify-start pixel-corners"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Animations
                        </Button>
                        <Button
                          variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange('fonts')}
                          className="justify-start pixel-corners"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Fonts
                        </Button>
                        <Button
                          variant={selectedCategory === 'presets' ? 'default' : 'outline'}
                          onClick={() => handleCategoryChange('presets')}
                          className="justify-start pixel-corners"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Presets
                        </Button>
                        {selectedCategory === 'presets' && (
                          <div className="mt-2 ml-2">
                            <Select
                              value={selectedSubcategory || "all"}
                              onValueChange={(value) => setSelectedSubcategory(value === "all" ? null : value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select preset type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Presets</SelectItem>
                                <SelectItem value="davinci">Davinci Resolve</SelectItem>
                                <SelectItem value="premiere">Adobe Premiere Pro</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedCategory === null ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange(null)}
                    className="h-10 pixel-corners"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === 'music' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange('music')}
                    className="h-10 pixel-corners"
                  >
                    Music
                  </Button>
                  <Button
                    variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange('sfx')}
                    className="h-10 pixel-corners"
                  >
                    SFX
                  </Button>
                  <Button
                    variant={selectedCategory === 'image' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange('image')}
                    className="h-10 pixel-corners"
                  >
                    Images
                  </Button>
                  <Button
                    variant={selectedCategory === 'animations' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange('animations')}
                    className="h-10 pixel-corners"
                  >
                    Animations
                  </Button>
                  <Button
                    variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange('fonts')}
                    className="h-10 pixel-corners"
                  >
                    Fonts
                  </Button>
                  <Button
                    variant={selectedCategory === 'presets' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange('presets')}
                    className="h-10 pixel-corners"
                  >
                    Presets
                  </Button>
                  {selectedCategory === 'presets' && (
                    <Select
                      value={selectedSubcategory || "all"}
                      onValueChange={(value) => setSelectedSubcategory(value === "all" ? null : value)}
                    >
                      <SelectTrigger className="h-10 w-[180px] pixel-corners">
                        <SelectValue placeholder="Select preset type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Presets</SelectItem>
                        <SelectItem value="davinci">Davinci Resolve</SelectItem>
                        <SelectItem value="premiere">Adobe Premiere Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  Loading resources...
                </p>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="text-center py-16 space-y-6">
                <div className="flex justify-center mb-4">
                  <FolderX className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-semibold">No resources found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {isSearching ? 
                    `No resources match your search for "${searchQuery}"` : 
                    selectedCategory ? 
                      `No resources found in the "${selectedCategory}" category` :
                      "No resources found with the current filters"}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
                  <Button 
                    onClick={handleClearSearch} 
                    variant="outline"
                    className="pixel-corners"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                  <Button 
                    className="pixel-corners bg-cow-purple hover:bg-cow-purple/80"
                    onClick={() => window.open("https://github.com/Yxmura/resources_renderdragon", "_blank")}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Contribute Resources
                  </Button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredResources.map((resource) => (
                  <div
                    key={`resource-${resource.id}`}
                    onClick={() => setSelectedResource(resource)}
                    className="pixel-card group cursor-pointer hover:border-primary transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-md text-xs ${getCategoryColor(
                          resource.category,
                        )}`}
                      >
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

                    <div className="flex items-center justify-between">
                      {resource.credit ? (
                        <div className="text-xs bg-orange-500/10 text-orange-500 px-2 py-1 rounded-md inline-flex items-center">
                          <span>Credit required</span>
                        </div>
                      ) : (
                        <div className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-md inline-flex items-center">
                          <Check className="h-3 w-3 mr-1" />
                          <span>No credit needed</span>
                        </div>
                      )}
                      
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Download className="h-3 w-3 mr-1" />
                        <span>{downloadCounts[resource.id] || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <Dialog
        open={!!selectedResource}
        onOpenChange={(open) => !open && setSelectedResource(null)}
      >
        <DialogContent className="sm:max-w-2xl pixel-corners border-2 border-cow-purple max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-2xl font-vt323">
              {selectedResource?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getCategoryColor(selectedResource?.category || '')}
              >
                {getCategoryIcon(selectedResource?.category || '')}
                <span className="ml-1 capitalize">{selectedResource?.category}</span>
                {selectedResource?.subcategory && (
                  <span className="ml-1">({selectedResource.subcategory})</span>
                )}
              </Badge>
              
              {selectedResource && (
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                  <Download className="h-3 w-3 mr-1" />
                  {downloadCounts[selectedResource.id] || 0} downloads
                </Badge>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="border border-border rounded-md p-4">
              <h4 className="font-vt323 text-lg mb-2">Attribution</h4>

              {selectedResource?.credit ? (
                <div className="space-y-2">
                  <p className="text-sm text-orange-500 flex items-center">
                    <span className="mr-2">⚠️</span>
                    Please credit this author in your description:
                  </p>

                  <div className="flex items-center">
                    <code className="bg-muted px-2 py-1 rounded text-sm flex-grow">
                      Music by {selectedResource.credit}
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
                  <span>
                    No attribution required! You're free to use this resource
                    without crediting.
                  </span>
                </div>
              )}
            </div>
            {selectedResource && <ResourcePreview resource={selectedResource} />}
            <div className="flex gap-2">
              <Button
                onClick={handleDownload}
                className="w-full pixel-btn-primary flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Resource</span>
              </Button>
              <Button
                onClick={() => {
                  if (!selectedResource) return;
                  const url = getDownloadURL(selectedResource);
                  window.open(url, '_blank');
                }}
                className="w-full pixel-btn-primary flex items-center justify-center gap-2"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              By downloading, you agree to our terms of use. Crediting
              "Renderdragon" is optional but appreciated!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourcesHub;
