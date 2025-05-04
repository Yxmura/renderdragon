
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Resource } from "@/types/resources";
import { Download, Youtube } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource;
  onClick: (resource: Resource) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onClick }) => {
  const typeBadgeClass = {
    music: "bg-blue-600",
    sfx: "bg-purple-600",
    animation: "bg-yellow-600",
    font: "bg-green-600",
    image: "bg-red-600",
    premiere_preset: "bg-orange-600",
    davinci_preset: "bg-pink-600",
    other: "bg-gray-600",
  };

  // Type assertions to make TypeScript happy with dynamic object access
  const typeColor = typeBadgeClass[resource.type as keyof typeof typeBadgeClass] || "bg-gray-600";

  return (
    <Card
      className="h-full overflow-hidden bg-neutral-800 border-neutral-700 text-white hover:border-emerald-500 transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(resource)}
    >
      <div className="relative h-48 overflow-hidden">
        {resource.imageUrl ? (
          <img
            src={resource.imageUrl}
            alt={resource.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
            <span className="text-neutral-400">No preview</span>
          </div>
        )}
        <div className="absolute top-2 left-2 flex gap-2">
          <span
            className={cn(
              "text-xs px-2 py-1 rounded-full text-white",
              typeColor
            )}
          >
            {resource.type.replace("_", " ")}
          </span>
          {resource.featured && (
            <span className="bg-amber-600 text-xs px-2 py-1 rounded-full text-white">
              Featured
            </span>
          )}
        </div>
        {resource.youtubeChannelUrl && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-600 text-xs p-1 rounded-full text-white">
              <Youtube size={12} />
            </span>
          </div>
        )}
      </div>
      <CardContent className="pt-3">
        <h3 className="text-lg font-bold mb-1 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
          {resource.title}
          {resource.youtubeChannelUrl && (
            <a 
              href={resource.youtubeChannelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-400 transition-colors"
              onClick={(e) => e.stopPropagation()}
              title="Visit creator's YouTube channel"
            >
              <Youtube size={16} />
            </a>
          )}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-2">
          {resource.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center text-xs text-neutral-400 pt-0">
        <div>Downloads: {resource.downloadCount.toLocaleString()}</div>
        <div className="flex items-center">
          <Download size={14} className="mr-1" /> Download
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
