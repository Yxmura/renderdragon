
export interface Resource {
  id: number;
  title: string;
  category: 'music' | 'sfx' | 'images' | 'animations' | 'fonts' | 'presets';
  subcategory?: 'davinci' | 'adobe' | null;
  credit?: string;
  filetype?: string;
  downloads?: number;
}

export interface ResourcesData {
  animations: Resource[];
  fonts: Resource[];
  music: Resource[];
  sfx: Resource[];
  images: Resource[];
  presets: Resource[];
}
