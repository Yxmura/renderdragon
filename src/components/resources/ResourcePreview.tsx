
import { Resource } from '@/types/resources';
import AudioPlayer from '@/components/AudioPlayer';

interface ResourcePreviewProps {
  resource: Resource;
}

const ResourcePreview = ({ resource }: ResourcePreviewProps) => {
  const getDownloadURL = (resource: Resource) => {
    if (!resource || !resource.filetype) return '';
    
    const titleLowered = resource.title
      .toLowerCase()
      .replace(/ /g, '%20');
    
    // Use the same URL structure for all resource types
    if (resource.credit) {
      return `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}__${resource.credit}.${resource.filetype}`;
    }
    else {
      return `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${resource.category}/${titleLowered}.${resource.filetype}`;
    }
  };

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
        <div className="text-xs mt-2 opacity-70">
          Font: {resource.title}
        </div>
      </div>
    );
  }

  return <p>Preview not available for this type.</p>;
};

export default ResourcePreview;
