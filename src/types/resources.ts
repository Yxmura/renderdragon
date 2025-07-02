
export interface Resource {
  id: number;
  title: string;
  category: 'music' | 'sfx' | 'images' | 'animations' | 'fonts' | 'presets';
  subcategory?: 'davinci' | 'adobe';
  credit?: string;
  filetype?: string;
  software?: string;
  image_url?: string;
  description?: string;
  preview_url?: string;
  download_url?: string;
  download_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ResourcesData {
  music: Resource[];
  sfx: Resource[];
  images: Resource[];
  animations: Resource[];
  fonts: Resource[];
  presets: Resource[];
}
