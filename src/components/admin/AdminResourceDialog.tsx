
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Resource } from '@/types/resources';

interface AdminResourceDialogProps {
  resource: Resource | null;
  open: boolean;
  onClose: () => void;
}

const AdminResourceDialog = ({ resource, open, onClose }: AdminResourceDialogProps) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'music' as const,
    subcategory: null as 'davinci' | 'adobe' | null,
    credit: '',
    filetype: '',
    software: '',
    image_url: '',
    description: '',
    preview_url: '',
    download_url: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title || '',
        category: resource.category || 'music',
        subcategory: resource.subcategory || null,
        credit: resource.credit || '',
        filetype: resource.filetype || '',
        software: resource.software || '',
        image_url: resource.image_url || '',
        description: resource.description || '',
        preview_url: resource.preview_url || '',
        download_url: resource.download_url || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'music',
        subcategory: null,
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
    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Title is required',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToSubmit = {
        ...formData,
        subcategory: formData.subcategory || null,
        credit: formData.credit || null,
        filetype: formData.filetype || null,
        software: formData.software || null,
        image_url: formData.image_url || null,
        description: formData.description || null,
        preview_url: formData.preview_url || null,
        download_url: formData.download_url || null,
      };

      if (resource) {
        const { error } = await supabase
          .from('resources')
          .update(dataToSubmit)
          .eq('id', resource.id);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Resource updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('resources')
          .insert([dataToSubmit]);
        
        if (error) throw error;
        
        toast({
          title: 'Success',
          description: 'Resource created successfully',
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        title: 'Error',
        description: 'Failed to save resource',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-vt323 text-xl">
            {resource ? 'Edit Resource' : 'Add New Resource'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Resource title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="sfx">SFX</SelectItem>
                  <SelectItem value="images">Images</SelectItem>
                  <SelectItem value="animations">Animations</SelectItem>
                  <SelectItem value="fonts">Fonts</SelectItem>
                  <SelectItem value="presets">Presets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.category === 'presets' && (
              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                  value={formData.subcategory || ''}
                  onValueChange={(value) => setFormData({ ...formData, subcategory: value as 'davinci' | 'adobe' | null })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="davinci">DaVinci</SelectItem>
                    <SelectItem value="adobe">Adobe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="credit">Credit</Label>
              <Input
                id="credit"
                value={formData.credit}
                onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
                placeholder="Creator credit"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filetype">File Type</Label>
              <Input
                id="filetype"
                value={formData.filetype}
                onChange={(e) => setFormData({ ...formData, filetype: e.target.value })}
                placeholder="mp3, png, zip, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="software">Software</Label>
              <Input
                id="software"
                value={formData.software}
                onChange={(e) => setFormData({ ...formData, software: e.target.value })}
                placeholder="Required software"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Resource description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="preview_url">Preview URL</Label>
            <Input
              id="preview_url"
              value={formData.preview_url}
              onChange={(e) => setFormData({ ...formData, preview_url: e.target.value })}
              placeholder="https://example.com/preview.mp4"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="download_url">Download URL</Label>
            <Input
              id="download_url"
              value={formData.download_url}
              onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
              placeholder="https://example.com/download.zip"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="pixel-btn-primary">
              {isSubmitting ? 'Saving...' : resource ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminResourceDialog;
