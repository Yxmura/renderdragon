import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const useDownloadCounts = (resourceIds: number[]) => {
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

    if (resourceIds.length > 0) {
      fetchCounts();
    }
  }, [resourceIds]);

  const incrementDownload = async (assetId: number) => {
    try {
      const stringId = assetId.toString();

      // Check if the asset_id exists in the downloads table
      const { data: existing, error: fetchError } = await supabase
        .from('downloads')
        .select('*')
        .eq('asset_id', stringId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
        console.error('Error fetching existing download count:', fetchError);
        return;
      }

      if (existing) {
        // If the asset_id exists, update the count
        const { error: updateError } = await supabase
          .from('downloads')
          .update({ count: existing.count + 1 })
          .eq('asset_id', stringId);

        if (updateError) {
          console.error('Error updating download count:', updateError);
          return;
        }
      } else {
        // If the asset_id does not exist, insert a new row
        const { data: insertData, error: insertError } = await supabase
          .from('downloads')
          .insert({ asset_id: stringId, count: 1 });

        if (insertError) {
          console.error('Error inserting new download count:', insertError);
          return;
        }

        console.log('Inserted new download count:', insertData);
      }

      // Update the local state
      setDownloadCounts((prev) => ({
        ...prev,
        [assetId]: (prev[assetId] || 0) + 1,
      }));
    } catch (err) {
      console.error('Unexpected error incrementing download count:', err);
    }
  };

  return { downloadCounts, incrementDownload };
};
