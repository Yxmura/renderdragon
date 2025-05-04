
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useResources } from "@/hooks/useResources";
import ResourceDetailDialog from "./resources/ResourceDetailDialog";
import { Resource } from "@/types/resources";
import { Download, Youtube } from "lucide-react";

const FeaturedResources = () => {
  const navigate = useNavigate();
  const { resources, isLoading } = useResources();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const featuredResources = resources?.filter((r) => r.featured) || [];
  const displayed = featuredResources.slice(0, 3);

  if (isLoading || displayed.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gradient-to-br from-neutral-900 to-neutral-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Featured Resources
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((resource) => (
            <Card
              key={resource.id}
              className="bg-neutral-800 border-neutral-700 text-white hover:border-emerald-500 transition-all cursor-pointer"
              onClick={() => setSelectedResource(resource)}
            >
              {resource.imageUrl && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="pt-4">
                <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
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
                      <Youtube size={18} />
                    </a>
                  )}
                </h3>
                <p className="text-neutral-400 mb-4">
                  {resource.description.length > 100
                    ? `${resource.description.substring(0, 100)}...`
                    : resource.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-neutral-400">
                    <Download size={14} className="inline mr-1" />
                    {resource.downloadCount.toLocaleString()}
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-neutral-700 text-emerald-400 text-xs rounded-full">
                      {resource.type.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            onClick={() => navigate("/resources")}
            variant="outline"
            className="border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-black"
          >
            View All Resources
          </Button>
        </div>

        <ResourceDetailDialog
          resource={selectedResource}
          isOpen={!!selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      </div>
    </section>
  );
};

export default FeaturedResources;
