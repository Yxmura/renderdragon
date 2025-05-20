import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  Music, 
  FileAudio,
  Image, 
  Video, 
  FileText,
  X,
  Search,
  Heart
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface ResourceFiltersProps {
  searchQuery: string;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  isMobile: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ResourceFilters = ({
  searchQuery,
  selectedCategory,
  selectedSubcategory,
  onSearch,
  onClearSearch,
  onSearchSubmit,
  onCategoryChange,
  onSubcategoryChange,
  isMobile,
  inputRef
}: ResourceFiltersProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <form onSubmit={(e) => onSearchSubmit(e)} className="relative w-full">
          <Input
            ref={inputRef}
            placeholder="Search resources..."
            value={searchQuery}
            onChange={onSearch}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="pixel-input w-full pr-10"
          />
          
          {searchQuery && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
              onClick={onClearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          
          <Button type="submit" className="sr-only">Search</Button>
        </form>
      </div>

      {isMobile ? (
        <MobileFilters 
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={onCategoryChange}
          onSubcategoryChange={onSubcategoryChange}
        />
      ) : (
        <DesktopFilters 
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={onCategoryChange}
          onSubcategoryChange={onSubcategoryChange}
        />
      )}
    </div>
  );
};

const MobileFilters = ({ 
  selectedCategory, 
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange
}: {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="pixel-corners">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] pixel-corners">
        <div className="h-full py-4 space-y-4">
          <h3 className="text-lg font-vt323 mb-2">
            Filter by Category
          </h3>
          <div className="flex flex-col gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => onCategoryChange(null)}
              className="justify-start pixel-corners"
            >
              All
            </Button>
            <Button
              variant={selectedCategory === 'music' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('music')}
              className="justify-start pixel-corners"
            >
              <Music className="h-4 w-4 mr-2" />
              Music
            </Button>
            <Button
              variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('sfx')}
              className="justify-start pixel-corners"
            >
              <FileAudio className="h-4 w-4 mr-2" />
              SFX
            </Button>
            <Button
              variant={selectedCategory === 'images' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('images')}
              className="justify-start pixel-corners"
            >
              <Image className="h-4 w-4 mr-2" />
              Images
            </Button>
            <Button
              variant={selectedCategory === 'animations' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('animations')}
              className="justify-start pixel-corners"
            >
              <Video className="h-4 w-4 mr-2" />
              Animations
            </Button>
            <Button
              variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('fonts')}
              className="justify-start pixel-corners"
            >
              <FileText className="h-4 w-4 mr-2" />
              Fonts
            </Button>
            <Button
              variant={selectedCategory === 'presets' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('presets')}
              className="justify-start pixel-corners"
            >
              <FileText className="h-4 w-4 mr-2" />
              Presets
            </Button>
            <Button
              variant={selectedCategory === 'favorites' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('favorites')}
              className="justify-start pixel-corners"
            >
              <Heart className="h-4 w-4 mr-2" />
              Favorites
            </Button>
            {selectedCategory === 'presets' && (
              <div className="mt-2 ml-2">
                <Select
                  value={selectedSubcategory || "all"}
                  onValueChange={(value) => onSubcategoryChange(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select preset type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Presets</SelectItem>
                    <SelectItem value="davinci">Davinci Resolve</SelectItem>
                    <SelectItem value="adobe">Premiere Pro & AE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopFilters = ({ 
  selectedCategory, 
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange
}: {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="h-10 pixel-corners"
      >
        All
      </Button>
      <Button
        variant={selectedCategory === 'music' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('music')}
        className="h-10 pixel-corners"
      >
        Music
      </Button>
      <Button
        variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('sfx')}
        className="h-10 pixel-corners"
      >
        SFX
      </Button>
      <Button
        variant={selectedCategory === 'images' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('images')}
        className="h-10 pixel-corners"
      >
        Images
      </Button>
      <Button
        variant={selectedCategory === 'animations' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('animations')}
        className="h-10 pixel-corners"
      >
        Animations
      </Button>
      <Button
        variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('fonts')}
        className="h-10 pixel-corners"
      >
        Fonts
      </Button>
      <Button
        variant={selectedCategory === 'presets' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('presets')}
        className="h-10 pixel-corners"
      >
        Presets
      </Button>
      <Button
        variant={selectedCategory === 'favorites' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('favorites')}
        className="h-10 pixel-corners bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white hover:opacity-90"
      >
        <Heart className="h-4 w-4 mr-2" />
        Favorites
      </Button>
      {selectedCategory === 'presets' && (
        <Select
          value={selectedSubcategory || "all"}
          onValueChange={(value) => onSubcategoryChange(value === "all" ? null : value)}
        >
          <SelectTrigger className="h-10 w-[180px] pixel-corners">
            <SelectValue placeholder="Select preset type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Presets</SelectItem>
            <SelectItem value="davinci">Davinci Resolve</SelectItem>
            <SelectItem value="adobe">Adobe Products</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ResourceFilters;
