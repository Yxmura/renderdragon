
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Edit, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Resource } from '@/types/resources';
import AdminResourceDialog from './AdminResourceDialog';
import { useDownloadCounts } from '@/hooks/useDownloadCounts';

const AdminResourcesManager = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { downloadCounts } = useDownloadCounts();

  const fetchResources = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setResources(data || []);
      setFilteredResources(data || []);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch resources',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredResources(resources);
    } else {
      const filtered = resources.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.credit && resource.credit.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredResources(filtered);
    }
  }, [searchQuery, resources]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Resource deleted successfully',
      });
      
      fetchResources();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete resource',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setSelectedResource(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedResource(null);
    fetchResources();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cow-purple"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pixel-corners"
          />
        </div>
        <Button onClick={handleAdd} className="pixel-btn-primary">
          <Plus className="mr-2 h-4 w-4" />
          Add Resource
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="pixel-corners">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-vt323 text-cow-purple">
                      {resource.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{resource.category}</Badge>
                      {resource.subcategory && (
                        <Badge variant="outline">{resource.subcategory}</Badge>
                      )}
                      {resource.credit && (
                        <Badge variant="outline">by {resource.credit}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleEdit(resource)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(resource.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">ID:</span> {resource.id}
                  </div>
                  <div>
                    <span className="font-medium">Filetype:</span> {resource.filetype || 'N/A'}
                  </div>
                  <div>
                    <span className="font-medium">Downloads:</span> {downloadCounts[resource.id] || 0}
                  </div>
                  <div>
                    <span className="font-medium">Created:</span> {new Date(resource.created_at || '').toLocaleDateString()}
                  </div>
                </div>
                {resource.description && (
                  <p className="text-muted-foreground mt-2 text-sm">{resource.description}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredResources.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found</p>
        </div>
      )}

      <AdminResourceDialog
        resource={selectedResource}
        open={isDialogOpen}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default AdminResourcesManager;
