import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from "react-i18next";

interface SortSelectorProps {
  sortOrder: string;
  onSortOrderChange: (order: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ sortOrder, onSortOrderChange }) => {
  const { t } = useTranslation();
  return (
    <Select value={sortOrder} onValueChange={onSortOrderChange}>
      <SelectTrigger className="h-10 w-full md:w-[180px] pixel-corners">
        <SelectValue placeholder={t('resourceFilters.sortBy')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">{t('resourceFilters.sortOptions.newest')}</SelectItem>
        <SelectItem value="popular">{t('resourceFilters.sortOptions.popular')}</SelectItem>
        <SelectItem value="a-z">{t('resourceFilters.sortOptions.a_z')}</SelectItem>
        <SelectItem value="z-a">{t('resourceFilters.sortOptions.z_a')}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortSelector;
