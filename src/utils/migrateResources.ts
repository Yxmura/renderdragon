import { supabase } from '@/integrations/supabase/client';
import { Resource } from '@/types/resources';

interface JsonResource {
  id: number;
  title: string;
  credit?: string;
  filetype?: string;
  software?: string;
  description?: string;
  preview_url?: string;
}

interface JsonResourcesData {
  music: JsonResource[];
  sfx: JsonResource[];
  images: JsonResource[];
  animations: JsonResource[];
  fonts: JsonResource[];
  presets: JsonResource[];
}

export const migrateJsonResourcesToSupabase = async () => {
  try {
    console.log('Starting migration of JSON resources to Supabase...');
    
    // Fetch the JSON resources
    const response = await fetch('/resources.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch resources: ${response.status}`);
    }
    
    const jsonData: JsonResourcesData = await response.json();
    console.log('Fetched JSON data:', jsonData);
    
    // Convert JSON structure to Supabase format
    const supabaseResources: Omit<Resource, 'created_at' | 'updated_at'>[] = [];
    
    // Process each category
    Object.entries(jsonData).forEach(([category, resources]) => {
      resources.forEach((resource: JsonResource) => {
        const supabaseResource: Omit<Resource, 'created_at' | 'updated_at'> = {
          id: resource.id,
          title: resource.title,
          category: category as Resource['category'],
          credit: resource.credit || null,
          filetype: resource.filetype || null,
          software: resource.software || null,
          description: resource.description || null,
          preview_url: resource.preview_url || null,
          subcategory: undefined,
          image_url: null,
          download_url: null, // Will need to be constructed based on existing logic
        };
        
        // Construct download URL based on existing logic
        const titleLowered = encodeURIComponent(resource.title.toLowerCase());
        const creditName = resource.credit ? encodeURIComponent(resource.credit) : '';
        const filetype = resource.filetype;
        
        if (category === 'presets' && resource.software) {
          // For presets, use software as subcategory
          supabaseResource.subcategory = resource.software.toLowerCase() === 'davinci resolve' ? 'davinci' : 'adobe';
          supabaseResource.download_url = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${category}/${supabaseResource.subcategory}/${titleLowered}${creditName ? `__${creditName}` : ''}.${filetype}`;
        } else if (resource.credit) {
          supabaseResource.download_url = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${category}/${titleLowered}__${creditName}.${filetype}`;
        } else {
          supabaseResource.download_url = `https://raw.githubusercontent.com/Yxmura/resources_renderdragon/main/${category}/${titleLowered}.${filetype}`;
        }
        
        supabaseResources.push(supabaseResource);
      });
    });
    
    console.log(`Converted ${supabaseResources.length} resources for migration`);
    
    // Clear existing resources (optional - comment out if you want to keep existing data)
    console.log('Clearing existing resources...');
    const { error: clearError } = await supabase
      .from('resources')
      .delete()
      .neq('id', 0); // This will delete all resources
    
    if (clearError) {
      console.error('Error clearing existing resources:', clearError);
    }
    
    // Insert resources in batches to avoid payload size limits
    const batchSize = 100;
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < supabaseResources.length; i += batchSize) {
      const batch = supabaseResources.slice(i, i + batchSize);
      console.log(`Inserting batch ${Math.floor(i / batchSize) + 1} (${batch.length} resources)...`);
      
      const { data, error } = await supabase
        .from('resources')
        .insert(batch)
        .select();
      
      if (error) {
        console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error);
        errorCount += batch.length;
      } else {
        console.log(`Successfully inserted batch ${Math.floor(i / batchSize) + 1}`);
        successCount += batch.length;
      }
    }
    
    console.log(`Migration completed: ${successCount} successful, ${errorCount} errors`);
    return { success: successCount, errors: errorCount };
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
};
