import React, { useRef } from 'react';
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
  Search
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SortSelector from './SortSelector';
import { useTranslation } from 'react-i18next';

interface ResourceFiltersProps {
  searchQuery: string;
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  sortOrder: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onSearchSubmit: (e?: React.FormEvent) => void;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  onSortOrderChange: (order: string) => void;
  isMobile: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const ResourceFilters = ({
  t,

  searchQuery,
  selectedCategory,
  selectedSubcategory,
  sortOrder,
  onSearch,
  onClearSearch,
  onSearchSubmit,
  onCategoryChange,
  onSubcategoryChange,
  onSortOrderChange,
  isMobile,
  inputRef
}: ResourceFiltersProps & { t: (key: string) => string }) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <form onSubmit={(e) => onSearchSubmit(e)} className="relative w-full">
          <Input
            ref={inputRef}
            placeholder={t('resourceFilters.searchPlaceholder')}
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
              <span className="sr-only">{t('resourceFilters.clearSearch')}</span>
            </Button>
          )}
          
          <Button type="submit" className="sr-only">{t('resourceFilters.searchPlaceholder')}</Button>
        </form>
      </div>

      {isMobile ? (
        <MobileFilters
          t={t} 
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={onCategoryChange}
          onSubcategoryChange={onSubcategoryChange}
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
        />
      ) : (
        <DesktopFilters
          t={t} 
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
          onCategoryChange={onCategoryChange}
          onSubcategoryChange={onSubcategoryChange}
          sortOrder={sortOrder}
          onSortOrderChange={onSortOrderChange}
        />
      )}
    </div>
  );
};

interface MobileFiltersProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
}

const MobileFilters = ({
  t,
 
  selectedCategory, 
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  sortOrder,
  onSortOrderChange
}: MobileFiltersProps & { t: (key: string) => string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="pixel-corners">
          <Filter className="h-4 w-4" />
          <span className="sr-only">{t('resourceFilters.filterTitleMobile')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] pixel-corners">
        <div className="h-full py-4 space-y-4">
          <h3 className="text-lg font-vt323 mb-2">{t('resourceFilters.filterByCategory')}</h3>
          <div className="flex flex-col gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => onCategoryChange(null)}
              className="justify-start pixel-corners"
            >
              {t('resourceFilters.all')}
            </Button>
            <Button
              variant={selectedCategory === 'music' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('music')}
              className="justify-start pixel-corners"
            >
              <Music className="h-4 w-4 mr-2" />
              {t('resourceFilters.music')}
            </Button>
            <Button
              variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('sfx')}
              className="justify-start pixel-corners"
            >
              <FileAudio className="h-4 w-4 mr-2" />
              {t('resourceFilters.sfx')}
            </Button>
            <Button
              variant={selectedCategory === 'images' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('images')}
              className="justify-start pixel-corners"
            >
              <Image className="h-4 w-4 mr-2" />
              {t('resourceFilters.images')}
            </Button>
            <Button
              variant={selectedCategory === 'animations' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('animations')}
              className="justify-start pixel-corners"
            >
              <Video className="h-4 w-4 mr-2" />
              {t('resourceFilters.animations')}
            </Button>
            <Button
              variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('fonts')}
              className="justify-start pixel-corners"
            >
              <FileText className="h-4 w-4 mr-2" />
              {t('resourceFilters.fonts')}
            </Button>
            <Button
              variant={selectedCategory === 'presets' ? 'default' : 'outline'}
              onClick={() => onCategoryChange('presets')}
              className="justify-start pixel-corners"
            >
              <FileText className="h-4 w-4 mr-2" />
              {t('resourceFilters.presets')}
            </Button>
            {selectedCategory === 'presets' && (
              <div className="mt-2 ml-2">
                <Select onValueChange={onSubcategoryChange} value={selectedSubcategory || 'all'}>
                  <SelectTrigger className="w-full pixel-corners">
                    <SelectValue placeholder={t('select_preset_type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_presets')}</SelectItem>
                    <SelectItem value="davinci">{t('davinci_presets')}</SelectItem>
                    <SelectItem value="adobe">{t('adobe_presets')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          <h3 className="text-lg font-vt323 mb-2 pt-4 border-t border-gray-700">{t('resourceFilters.sortBy')}</h3>
          <SortSelector sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface DesktopFiltersProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onCategoryChange: (category: string | null) => void;
  onSubcategoryChange: (subcategory: string | null) => void;
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
}

const DesktopFilters = ({
  t,
 
  selectedCategory, 
  selectedSubcategory,
  onCategoryChange,
  onSubcategoryChange,
  sortOrder,
  onSortOrderChange
}: DesktopFiltersProps & { t: (key: string) => string }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={selectedCategory === null ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange(null)}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.all')}
      </Button>
      <Button
        variant={selectedCategory === 'music' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('music')}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.music')}
      </Button>
      <Button
        variant={selectedCategory === 'sfx' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('sfx')}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.sfx')}
      </Button>
      <Button
        variant={selectedCategory === 'images' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('images')}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.images')}
      </Button>
      <Button
        variant={selectedCategory === 'animations' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('animations')}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.animations')}
      </Button>
      <Button
        variant={selectedCategory === 'fonts' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('fonts')}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.fonts')}
      </Button>
      <Button
        variant={selectedCategory === 'presets' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onCategoryChange('presets')}
        className="h-10 pixel-corners"
      >
        {t('resourceFilters.presets')}
      </Button>
      <SortSelector sortOrder={sortOrder} onSortOrderChange={onSortOrderChange} />
      {selectedCategory === 'presets' && (
        <Select onValueChange={onSubcategoryChange} value={selectedSubcategory || 'all'}>
          <SelectTrigger className="w-[180px] pixel-corners">
            <SelectValue placeholder={t('resourceFilters.selectPreset')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('resourceFilters.allPresets')}</SelectItem>
            <SelectItem value="davinci">{t('resourceFilters.davinciPresets')}</SelectItem>
            <SelectItem value="adobe">{t('resourceFilters.adobePresets')}</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default ResourceFilters;
