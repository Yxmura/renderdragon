
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Image, 
  Video, 
  FileText, 
  FileAudio,
  Download,
  Check
} from 'lucide-react';
import { Resource } from '@/types/resources';

interface ResourceCardProps {
  resource: Resource;
  downloadCount: number;
  onClick: (resource: Resource) => void;
}

const ResourceCard = ({ resource, downloadCount, onClick }: ResourceCardProps) => {
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

  return (
    <div
      onClick={() => onClick(resource)}
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
          <span>{downloadCount || 0}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
