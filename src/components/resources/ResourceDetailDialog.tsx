
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Resource } from "@/types/resources";
import { Download, Youtube } from "lucide-react";
import { toast } from "sonner";
import { useDownloadCounts } from "@/hooks/useDownloadCounts";

interface ResourceDetailDialogProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

const ResourceDetailDialog: React.FC<ResourceDetailDialogProps> = ({
  resource,
  isOpen,
  onClose,
}) => {
  const { incrementDownloadCount } = useDownloadCounts();

  if (!resource) return null;

  const handleDownload = () => {
    // Increment download count
    incrementDownloadCount(resource.id);

    // Open download in new tab
    window.open(resource.downloadUrl, "_blank");

    // Show success message
    toast.success("Download started!", {
      description: "Thanks for using Renderdragon!",
    });

    // Don't close the dialog after download
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl bg-neutral-900 text-white border border-neutral-700 shadow-lg shadow-emerald-500/20">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            {resource.title}
            {resource.youtubeChannelUrl && (
              <a 
                href={resource.youtubeChannelUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors inline-flex items-center"
                title="Visit creator's YouTube channel"
              >
                <Youtube size={18} className="ml-2" />
              </a>
            )}
          </DialogTitle>
          <DialogDescription className="text-neutral-400">
            {resource.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          {resource.imageUrl && (
            <div className="mb-4 rounded-md overflow-hidden">
              <img
                src={resource.imageUrl}
                alt={resource.title}
                className="w-full object-cover h-64"
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-neutral-800 text-emerald-400 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {resource.youtubeChannelUrl && (
            <div className="mb-4">
              <a
                href={resource.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
              >
                <Youtube size={16} className="mr-1" />
                <span>Visit Creator's YouTube Channel</span>
              </a>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-neutral-400">
              Downloads: {resource.downloadCount.toLocaleString()}
            </div>
            <Button onClick={handleDownload} className="bg-emerald-600 hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceDetailDialog;
