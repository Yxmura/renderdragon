
export interface Resource {
  id: number;
  title: string;
  category: 'music' | 'sfx' | 'image' | 'animations' | 'fonts' | 'presets';
  subcategory?: 'davinci' | 'premiere' | null;
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
