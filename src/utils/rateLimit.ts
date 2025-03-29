
interface RateLimit {
  count: number;
  lastReset: number;
}

const STORAGE_KEY = 'ai_title_helper_rate_limit';
const LIMIT_PER_MONTH = 5;
const MONTH_IN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export const getRateLimit = (): RateLimit => {
  const storedLimit = localStorage.getItem(STORAGE_KEY);
  
  if (storedLimit) {
    const parsedLimit = JSON.parse(storedLimit) as RateLimit;
    const now = Date.now();
    
    // Check if we need to reset based on time
    if (now - parsedLimit.lastReset > MONTH_IN_MS) {
      const newLimit: RateLimit = {
        count: 0,
        lastReset: now
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLimit));
      return newLimit;
    }
    
    return parsedLimit;
  }
  
  // Initialize if not exists
  const initialLimit: RateLimit = {
    count: 0,
    lastReset: Date.now()
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialLimit));
  return initialLimit;
};

export const incrementRateLimit = (): RateLimit => {
  const currentLimit = getRateLimit();
  const updatedLimit: RateLimit = {
    ...currentLimit,
    count: currentLimit.count + 1
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLimit));
  return updatedLimit;
};

export const canGenerateTitle = (): boolean => {
  const { count } = getRateLimit();
  return count < LIMIT_PER_MONTH;
};

export const getRemainingTitles = (): number => {
  const { count } = getRateLimit();
  return Math.max(0, LIMIT_PER_MONTH - count);
};
