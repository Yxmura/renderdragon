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
  Search,
  Filter,
  Copy,
  Check,
  FileAudio,
  Download,
  Github,
  Play,
  Pause,
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
import ReactAudioPlayer from 'react-audio-player';

interface Resource {
  id: number;
  title: string;
  category: 'music' | 'sfx' | 'image' | 'animations' | 'fonts' | 'presets';
  subcategory?: 'davinci' | 'premiere' | null;
  credit?: string;
  filetype?: string;
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

  // Memoize the fetchResources function to prevent unnecessary re-renders
  const fetchResources = useCallback(async () => {
    try {
      const response = await fetch('/resources.json');
      if (!response.ok) {
        throw new Error(
          `Failed to fetch resources: ${response.status} ${response.statusText}`,
        );
      }
      const resourcesData = (await response.json()) as ResourcesData;

      const allResources: Resource[] = Object.entries(resourcesData).flatMap(
        ([category, resources]) =>
          resources.map((resource) => ({ ...resource, category })),
      );

      setResources(allResources);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching resources:', error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Resources Hub - Renderdragon';

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Memoize the filter logic to improve performance
  const filteredResources = useCallback(
    (resource: Resource) => {
      const matchesSearch = resource.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? resource.category === selectedCategory
        : true;
      const matchesSubcategory = selectedSubcategory
        ? resource.subcategory === selectedSubcategory
        : true;

      if (selectedCategory === 'presets') {
        return matchesSearch && matchesCategory && matchesSubcategory;
      }

      return matchesSearch && matchesCategory;
    },
    [searchQuery, selectedCategory, selectedSubcategory],
  );

  const filteredResourcesList = useMemo(
    () => resources.filter(filteredResources),
    [resources, filteredResources],
  );

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

  const AudioPlayer = ({ url }: { url: string }) => {
    return (
      <div>
        <ReactAudioPlayer src={url} controls />
      </div>
    );
  };

  const VideoPlayer = ({ url }: { url: string }) => {
    return (
      <div className="relative w-full">
        <video
          src={url}
          controls
          className="w-full rounded-md aspect-video"
        />
      </div>
    );
  };

  const FontSample = ({ resource }: { resource: Resource }) => {
    const downloadURL = getDownloadURL(resource);
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
  };

  const ResourcePreview = ({ resource }: { resource: Resource }) => {
    const downloadURL = getDownloadURL(resource);

    if (!downloadURL) {
      return <p>No preview available</p>;
    }

    if (resource.category === 'music' || resource.category === 'sfx') {
      return <AudioPlayer url={downloadURL} />;
    }

    if (resource.category === 'animations') {
      return <VideoPlayer url={downloadURL} />;
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
      return <FontSample resource={resource} />;
    }

    return <p>Preview not available for this type.</p>;
  };

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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  ref={inputRef}
                  placeholder="Search resources (or press Ctrl+K)..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onClick={() => query.toggle()}
                  className="pl-9 pixel-input w-full cursor-pointer"
                />
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
                          onClick={() => {
                            setSelectedCategory(null);
                            setSelectedSubcategory(null);
                          }}
                          className="justify-start pixel-corners"
                        >
                          All
                        </Button>
                        <Button
                          variant={selectedCategory === 'music' ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory('music')}
                          className="justify-start pixel-corners"
                        >
                          <Music className="h-4 w-4 mr-2" />
                          Music
                        </Button>
                        <Button
                          variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory('sfx')}
                          className="justify-start pixel-corners"
                        >
                          <FileAudio className="h-4 w-4 mr-2" />
                          SFX
                        </Button>
                        <Button
                          variant={selectedCategory === 'image' ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory('image')}
                          className="justify-start pixel-corners"
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Images
                        </Button>
                        <Button
                          variant={selectedCategory === 'animations' ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory('animations')}
                          className="justify-start pixel-corners"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Animations
                        </Button>
                        <Button
                          variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory('fonts')}
                          className="justify-start pixel-corners"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Fonts
                        </Button>
                        <Button
                          variant={selectedCategory === 'presets' ? 'default' : 'outline'}
                          onClick={() => setSelectedCategory('presets')}
                          className="justify-start pixel-corners"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Presets
                        </Button>
                        {selectedCategory === 'presets' && (
                          <div className="flex flex-col gap-2 pl-4 mt-2">
                            <Button
                              variant={
                                selectedSubcategory === 'davinci'
                                  ? 'default'
                                  : 'outline'
                              }
                              onClick={() => setSelectedSubcategory('davinci')}
                              className="justify-start pixel-corners pl-4"
                            >
                              Davinci Resolve
                            </Button>
                            <Button
                              variant={
                                selectedSubcategory === 'premiere' ? 'default' : 'outline'
                              }
                              onClick={() => setSelectedSubcategory('premiere')}
                              className="justify-start pixel-corners pl-4"
                            >
                              Adobe Premiere Pro
                            </Button>
                            <Button
                              variant={selectedSubcategory === null ? 'default' : 'outline'}
                              onClick={() => setSelectedSubcategory(null)}
                              className="justify-start pixel-corners pl-4"
                            >
                              All Presets
                            </Button>
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
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedSubcategory(null);
                    }}
                    className="h-10 pixel-corners"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedCategory === 'music' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('music')}
                    className="h-10 pixel-corners"
                  >
                    Music
                  </Button>
                  <Button
                    variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('sfx')}
                    className="h-10 pixel-corners"
                  >
                    SFX
                  </Button>
                  <Button
                    variant={selectedCategory === 'image' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('image')}
                    className="h-10 pixel-corners"
                  >
                    Images
                  </Button>
                  <Button
                    variant={selectedCategory === 'animations' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('animations')}
                    className="h-10 pixel-corners"
                  >
                    Animations
                  </Button>
                  <Button
                    variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('fonts')}
                    className="h-10 pixel-corners"
                  >
                    Fonts
                  </Button>
                  <Button
                    variant={selectedCategory === 'presets' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('presets')}
                    className="h-10 pixel-corners"
                  >
                    Presets
                  </Button>
                  {selectedCategory === 'presets' && (
                    <>
                      <Button
                        variant={
                          selectedSubcategory === 'davinci' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setSelectedSubcategory('davinci')}
                        className="h-10 pixel-corners pl-4"
                      >
                        Davinci Resolve
                      </Button>
                      <Button
                        variant={
                          selectedSubcategory === 'premiere' ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => setSelectedSubcategory('premiere')}
                        className="h-10 pixel-corners pl-4"
                      >
                        Adobe Premiere Pro
                      </Button>
                      <Button
                        variant={selectedSubcategory === null ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSubcategory(null)}
                        className="h-10 pixel-corners pl-4"
                      >
                        All Presets
                      </Button>
                    </>
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
            ) : filteredResourcesList.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No resources found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredResourcesList.map((resource) => (
                  <div
                    key={resource.id}
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
