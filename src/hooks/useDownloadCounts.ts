import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useDownloadCounts = (resourceIds: number[]) => {
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      const { data, error } = await supabase
        .from('downloads')
        .select('asset_id, count');

      if (error) {
        console.error('Error fetching download counts:', error);
        return;
      }

      const counts = data?.reduce((acc, { asset_id, count }) => {
        acc[parseInt(asset_id)] = count;
        return acc;
      }, {} as Record<number, number>);

      setDownloadCounts(counts || {});
    };

    if (resourceIds.length !== Object.keys(downloadCounts).length) {
      fetchCounts();
    }
  }, [resourceIds, downloadCounts]);

  const incrementDownload = async (assetId: number) => {
    try {
      const { data, error } = await supabase
        .from('downloads')
        .upsert({ asset_id: assetId, count: downloadCounts[assetId] + 1 })
        .eq('asset_id', assetId);

      if (error) {
        console.error('Error incrementing download count:', error);
        return;
      }

      setDownloadCounts(prev => ({
        ...prev,
        [assetId]: (prev[assetId] || 0) + 1,
      }));
    } catch (err) {
      console.error('Unexpected error incrementing download count:', err);
    }
  };

  return { downloadCounts, incrementDownload };
};
