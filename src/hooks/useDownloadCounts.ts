import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useDownloadCounts = () => {
  const [downloadCounts, setDownloadCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data, error } = await supabase
          .from('downloads')
          .select('resource_id, count');

        if (error) {
          console.error('Error fetching download counts:', error);
          return;
        }

        if (data) {
          const mapped = data.reduce((acc, row) => {
            if (row.resource_id) {
              acc[row.resource_id] = row.count || 0;
            }
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

  const incrementDownload = useCallback(async (resourceId: number) => {
    try {
      const currentCount = downloadCounts[resourceId] || 0;
      const newCount = currentCount + 1;

      const { error } = await supabase
        .from('downloads')
        .upsert({ 
          resource_id: resourceId, 
          count: newCount 
        }, {
          onConflict: 'resource_id'
        });

      if (error) {
        console.error('Error incrementing download count:', error);
        return;
      }

      setDownloadCounts(prev => ({
        ...prev,
        [resourceId]: newCount,
      }));
    } catch (err) {
      console.error('Unexpected error incrementing download count:', err);
    }
  }, [downloadCounts]);

  return { downloadCounts, incrementDownload };
};