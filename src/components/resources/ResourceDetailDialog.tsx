import { useState, useEffect, useCallback } from 'react';
import { Resource } from '@/types/resources';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ResourcePreview from './ResourcePreview';
import { 
  Download, 
  Copy, 
  Check, 
  Github, 
  Music, 
  Image, 
  Video, 
  FileText, 
  FileAudio,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation } from 'react-i18next';

interface ResourceDetailDialogProps {
  resource: Resource | null;
  onClose: () => void;
  onDownload: (resource: Resource) => void;
  downloadCount: number;
  loadedFonts: string[];
  setLoadedFonts: (fonts: string[]) => void;
  filteredResources: Resource[]; 
  onSelectResource: (resource: Resource) => void; 
  isFavoritesView?: boolean; 
}

const ResourceDetailDialog = ({ 
  resource, 
  onClose, 
  onDownload, 
  downloadCount,
  loadedFonts,
  setLoadedFonts,
  filteredResources,
  onSelectResource,
  isFavoritesView = false
}: ResourceDetailDialogProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const isMobile = useIsMobile();

  const currentIndex = resource ? filteredResources.findIndex(r => r.id === resource.id) : -1;
  const hasPrevious = !isFavoritesView && currentIndex > 0;
  const hasNext = !isFavoritesView && currentIndex < filteredResources.length - 1;

  const handlePrevious = useCallback(() => {
    if (hasPrevious && resource) {
      onSelectResource(filteredResources[currentIndex - 1]);
    }
  }, [hasPrevious, resource, filteredResources, currentIndex, onSelectResource]);

  const handleNext = useCallback(() => {
    if (hasNext && resource) {
      onSelectResource(filteredResources[currentIndex + 1]);
    }
  }, [hasNext, resource, filteredResources, currentIndex, onSelectResource]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!resource || isFavoritesView) return;
      
      if (e.key === 'ArrowLeft' && hasPrevious) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && hasNext) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resource, hasPrevious, hasNext, handlePrevious, handleNext, isFavoritesView]);

  useEffect(() => {
    if (resource?.category === 'fonts' && resource.title && !loadedFonts.includes(resource.title)) {
      const titleLowered = resource.title
        .toLowerCase()
        .replace(/ /g, '%20');

      let fontUrl = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}`;

      if (resource.credit) {
        const creditName = resource.credit.replace(/ /g, '_');
        fontUrl = `${fontUrl}__${creditName}`;
      }

      fontUrl = `${fontUrl}.${resource.filetype}`;

      const fontFace = new FontFace(resource.title, `url(${fontUrl})`);

      fontFace.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        setLoadedFonts([...loadedFonts, resource.title]);
      }).catch(err => {
        console.error('Error loading font:', err);
      });
    }
  }, [resource, loadedFonts, setLoadedFonts]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'music':
        return <Music className="h-5 w-5" />;
      case 'sfx':
        return <FileAudio className="h-5 w-5" />;
      case 'images':
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
      case 'images':
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

  const copyCredit = () => {
    if (!resource?.credit) return;

    const creditText = t('credit_text', { author: resource.credit });
    navigator.clipboard.writeText(creditText);
    setCopied(true);
    toast.success(t('credit_copied'));

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getGithubURL = (resource: Resource) => {
    if (!resource || !resource.filetype) return '';
    
    const titleLowered = resource.title
      .toLowerCase()
      .replace(/ /g, '%20');
    
    return `https://github.com/Yxmura/resources_renderdragon/blob/main/${resource.category}/${titleLowered}__${resource.credit}.${resource.filetype}`;
  };

  if (!resource) return null;

  return (
    <Dialog open={!!resource} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl pixel-corners border-2 border-cow-purple max-h-[90vh] overflow-y-auto custom-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-2xl font-vt323">
            {resource.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={getCategoryColor(resource.category || '')}
              >
                {getCategoryIcon(resource.category || '')}
                <span className="ml-1 capitalize">{resource.category}</span>
                {resource.subcategory && (
                  <span className="ml-1">({resource.subcategory})</span>
                )}
              </Badge>
              
              <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                <Download className="h-3 w-3 mr-1" />
                {downloadCount || 0} {t('resourceFilters.downloads')}
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div className="border border-border rounded-md p-4">
            <h4 className="font-vt323 text-lg mb-1">{t('resourceFilters.attribution')}</h4>

            {resource.credit ? (
              <div className="space-y-2">
                <p className="text-sm text-orange-500 flex items-center">
                  <span className="mr-2">⚠️</span>
                  <span>{t('resourceFilters.credit_warning')}</span>
                </p>

                <div className="flex items-center">
                  <code className="bg-muted px-2 py-1 rounded text-sm flex-grow">
                    {t('resourceFilters.credit_text', { author: resource.credit })}
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
                        <span>{t('resourceFilters.copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>{t('resourceFilters.copy')}</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-green-500">
                <Check className="h-5 w-5 mr-2" />
                <span>{t('resourceFilters.no_attribution_required')}</span>
              </div>
            )}
          </div>
          
          <ResourcePreview resource={resource} />
          
          {!isFavoritesView && (
            <div className="flex items-center gap-2 justify-between">
              <Button
                variant="outline"
                className={`${!hasPrevious ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100'} transition-opacity`}
                onClick={handlePrevious}
                disabled={!hasPrevious}
              >
                <ChevronLeft className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">{t('resourceFilters.previous')}</span>
                <span className="sr-only">{t('resourceFilters.previous_resource')}</span>
              </Button>

              <Button
                onClick={() => onDownload(resource)}
                className="pixel-btn-primary flex items-center justify-center gap-2"
              >
                <Download className="h-5 w-5" />
                <span>{t('resourceFilters.download_resource')}</span>
              </Button>

              <Button
                variant="outline"
                className={`${!hasNext ? 'opacity-0 pointer-events-none' : 'opacity-70 hover:opacity-100'} transition-opacity`}
                onClick={handleNext}
                disabled={!hasNext}
              >
                <span className="hidden md:inline">{t('next')}</span>
                <ChevronRight className="h-4 w-4 md:ml-2" />
                <span className="sr-only">{t('next_resource')}</span>
              </Button>
            </div>
          )}

          <p className="text-xs text-center text-muted-foreground">
            {t('resourceFilters.download_agreement')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDetailDialog;
