
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Plus, Search, Edit, Trash2, Download, Calendar } from 'lucide-react';
import { Resource } from '@/types/resources';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AdminResourceDialog from './AdminResourceDialog';
import ResourceMigration from './ResourceMigration';
import AdminResourcesManagerSkeleton from '../skeletons/AdminResourcesManagerSkeleton';

const RESOURCES_PER_PAGE = 15;

const AdminResourcesManager = () => {
  const { t } = useTranslation();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | undefined>();
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; resource: Resource | null }>({
    open: false,
    resource: null,
  });
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const categories = ['all', 'music', 'sfx', 'images', 'animations', 'fonts', 'presets'].map(category => ({
    id: category,
    label: t(`admin.resourcesManager.categories.${category}`)
  }));

  const fetchResources = async (isNewSearch = false) => {
    try {
      setLoading(true);
      const from = isNewSearch ? 0 : page * RESOURCES_PER_PAGE;
      const to = from + RESOURCES_PER_PAGE - 1;

      let query = supabase
        .from('resources')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,credit.ilike.%${searchTerm}%`);
      }
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      
      setResources(isNewSearch ? data || [] : [...resources, ...(data || [])]);
      setHasMore((data?.length || 0) === RESOURCES_PER_PAGE);
      if (isNewSearch) setPage(0);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error(t('admin.resourcesManager.dialogs.error.fetch'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources(true);
  }, [searchTerm, selectedCategory]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (page > 0) {
      fetchResources();
    }
  }, [page]);

  const handleDelete = async () => {
    if (!deleteDialog.resource) return;

    try {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', deleteDialog.resource.id);

      if (error) throw error;

      setResources(resources.filter((r) => r.id !== deleteDialog.resource?.id));
      setDeleteDialog({ open: false, resource: null });
      toast.success(t('admin.resourcesManager.dialogs.success.deleted'));
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error(t('admin.resourcesManager.dialogs.error.delete'));
    }
  };

  const filteredResources = resources;

  const getResourceStats = () => {
    const stats = categories.slice(1).map(category => ({
      category,
      count: resources.filter(r => r.category === category).length
    }));
    return stats;
  };

  if (loading && page === 0) {
    return <AdminResourcesManagerSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t('admin.resourcesManager.searchPlaceholder')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('admin.resourcesManager.actions.add')}
          </Button>
          <ResourceMigration onMigrate={() => fetchResources(true)} />
        </div>
      </div>

      {/* Stats Cards */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 sm:grid-cols-7">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Resources Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card key={resource.id} className="relative overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium line-clamp-1">
                  {resource.title}
                </CardTitle>
                <Badge variant="outline" className="ml-2">
                  {t(`admin.resourcesManager.categories.${resource.category}`, resource.category)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {resource.credit} • {new Date(resource.created_at).toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {resource.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{resource.downloads || 0}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingResource(resource);
                      setDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {t('admin.resourcesManager.actions.edit')}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteDialog({ open: true, resource })}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    {t('admin.resourcesManager.actions.delete')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {resources.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('admin.resourcesManager.pagination.noResults')}</p>
        </div>
      )}

      <div className="flex justify-center mt-6">
        {hasMore && (
          <Button onClick={loadMore} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        )}
      </div>

      {/* Dialogs */}
      <AdminResourceDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingResource(undefined);
        }}
        onSave={() => fetchResources(true)}
        resource={editingResource}
        categories={categories}
      />

      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.resourcesManager.dialogs.deleteTitle')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.resourcesManager.dialogs.deleteMessage')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('admin.resourcesManager.dialogs.deleteCancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              {t('admin.resourcesManager.dialogs.deleteConfirm')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminResourcesManager;
