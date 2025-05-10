import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useDownloadCounts = () => {
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data, error } = await supabase
          .from('downloads')
          .select('asset_id, count');

        if (error) {
          console.error('Error fetching download counts:', error);
          return;
        }

        if (data) {
          const mapped = data.reduce((acc, row) => {
            acc[parseInt(row.asset_id)] = row.count;
            return acc;
          }, {} as Record<number, number>);
          setDownloadCounts(mapped);
        }
      } catch (err) {
        console.error('Unexpected error fetching download counts:', err);
      }
    };

    fetchCounts();
  }, []);

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
