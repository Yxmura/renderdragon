
import { createServerHandler } from '@/utils/api';

// In a real application, this would connect to a database
// or other data source to get the actual download count
export default createServerHandler(async (req, res) => {
  try {
    // Simulate a database call with a small delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return a dynamic number that grows over time
    const baseDownloads = 125000;
    const daysSinceLaunch = Math.floor((Date.now() - new Date('2023-01-01').getTime()) / (1000 * 60 * 60 * 24));
    const downloads = baseDownloads + (daysSinceLaunch * 150); // Add 150 downloads per day
    
    return res.json({ downloads });
  } catch (error) {
    console.error('Error fetching download stats:', error);
    return res.status(500).json({ error: 'Failed to fetch download statistics' });
  }
});
