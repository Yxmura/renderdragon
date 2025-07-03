
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Resource } from '@/types/resources';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AdminResourceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resource?: Resource;
  onSave: () => void;
}

const AdminResourceDialog = ({ open, onOpenChange, resource, onSave }: AdminResourceDialogProps) => {
  const [formData, setFormData] = useState<Partial<Resource>>({
    title: '',
    category: 'music',
    subcategory: undefined,
    credit: '',
    filetype: '',
    software: '',
    image_url: '',
    description: '',
    preview_url: '',
    download_url: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resource) {
      setFormData(resource);
    } else {
      setFormData({
        title: '',
        category: 'music',
        subcategory: undefined,
        credit: '',
        filetype: '',
        software: '',
        image_url: '',
        description: '',
        preview_url: '',
        download_url: '',
      });
    }
  }, [resource, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (resource) {
        // Update existing resource
        const { error } = await supabase
          .from('resources')
          .update(formData)
          .eq('id', resource.id);

        if (error) throw error;
        toast.success('Resource updated successfully');
      } else {
        // Create new resource - explicitly exclude id and other auto-generated fields
        const { id, created_at, updated_at, download_count, ...cleanFormData } = formData as any;
        
        const resourceData = {
          title: cleanFormData.title || '',
          category: cleanFormData.category || 'music',
          subcategory: cleanFormData.subcategory || null,
          credit: cleanFormData.credit || null,
          filetype: cleanFormData.filetype || null,
          software: cleanFormData.software || null,
          image_url: cleanFormData.image_url || null,
          description: cleanFormData.description || null,
          preview_url: cleanFormData.preview_url || null,
          download_url: cleanFormData.download_url || null,
        };

        console.log('Inserting resource data:', resourceData);

        const { error } = await supabase
          .from('resources')
          .insert([resourceData]);

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        toast.success('Resource created successfully');
      }

      onSave();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving resource:', error);
      toast.error('Failed to save resource');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['music', 'sfx', 'images', 'animations', 'fonts', 'presets'] as const;
  const subcategories = ['davinci', 'adobe'] as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{resource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value as Resource['category'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory</Label>
              <Select
                value={formData.subcategory || 'none'}
                onValueChange={(value) => setFormData({ ...formData, subcategory: value === 'none' ? undefined : value as Resource['subcategory'] })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {subcategories.map((subcat) => (
                    <SelectItem key={subcat} value={subcat}>
                      {subcat.charAt(0).toUpperCase() + subcat.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(formData.category === 'fonts' || formData.category === 'presets') && (
              <div className="space-y-2">
                <Label htmlFor="software">Software</Label>
                <Input
                  id="software"
                  value={formData.software || ''}
                  onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                  placeholder="e.g., Adobe After Effects"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="credit">Credit</Label>
              <Input
                id="credit"
                value={formData.credit || ''}
                onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="filetype">File Type</Label>
              <Input
                id="filetype"
                value={formData.filetype || ''}
                onChange={(e) => setFormData({ ...formData, filetype: e.target.value })}
                placeholder="e.g., MP3, PNG, AEP"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url || ''}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preview_url">Preview URL</Label>
            <Input
              id="preview_url"
              value={formData.preview_url || ''}
              onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
              placeholder="https://example.com/preview.mp3"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="download_url">Download URL *</Label>
            <Input
              id="download_url"
              value={formData.download_url || ''}
              onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
              placeholder="https://example.com/download.zip"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : resource ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminResourceDialog;
