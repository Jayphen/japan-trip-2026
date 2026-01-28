/**
 * Exchange Rate Service
 * Fetches real AUD/JPY exchange rates and caches per day
 * Uses exchangerate-api.com free tier
 */

// Free API - exchangerate-api.com (no key required for basic rates)
const AUD_TO_JPY_API = 'https://api.exchangerate-api.com/v4/latest/AUD';

export interface ExchangeRate {
  audToJpy: number;
  date: string; // YYYY-MM-DD
  timestamp: number;
  source: string;
}

// In-memory cache (only cache we have in Cloudflare Workers)
let rateCache: Map<string, ExchangeRate> = new Map();

/**
 * Load cached rates from disk (no-op in Cloudflare)
 */
function loadCache(): void {
  // File system not available in Cloudflare Workers
  // Cache will be in-memory only
}

/**
 * Save cache to disk (no-op in Cloudflare)
 */
function saveCache(): void {
  // File system not available in Cloudflare Workers
  // Cache will be in-memory only
}

/**
 * Fetch real exchange rate from API
 */
async function fetchExchangeRate(): Promise<ExchangeRate> {
  const date = new Date().toISOString().split('T')[0];
  const timestamp = Date.now();
  
  try {
    const response = await fetch(AUD_TO_JPY_API);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    const rate = data.rates?.JPY;
    
    if (!rate) {
      throw new Error('No JPY rate in response');
    }
    
    return {
      audToJpy: rate,
      date,
      timestamp,
      source: 'exchangerate-api.com'
    };
  } catch (e) {
    console.warn('Failed to fetch exchange rate:', e);
    // Fallback to cached rate or default
    throw e;
  }
}

/**
 * Get exchange rate for a specific date
 * Will fetch if not in cache
 */
export async function getExchangeRate(date?: string): Promise<ExchangeRate> {
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  // Check cache first
  if (rateCache.has(targetDate)) {
    const cached = rateCache.get(targetDate)!;
    // Use cached if less than 24 hours old
    const hoursOld = (Date.now() - cached.timestamp) / (1000 * 60 * 60);
    if (hoursOld < 24) {
      return cached;
    }
  }
  
  // Fetch fresh rate
  try {
    const rate = await fetchExchangeRate();
    rate.date = targetDate; // Use requested date
    rateCache.set(targetDate, rate);
    saveCache();
    return rate;
  } catch (e) {
    // Try to use cached rate even if old
    if (rateCache.has(targetDate)) {
      return rateCache.get(targetDate)!;
    }
    // Ultimate fallback
    return {
      audToJpy: 97.5, // Default fallback rate
      date: targetDate,
      timestamp: Date.now(),
      source: 'fallback'
    };
  }
}

/**
 * Get rate synchronously from cache (returns 97.5 if not found)
 * Use this for synchronous conversions in templates
 */
export function getCachedRate(date: string): number {
  if (rateCache.has(date)) {
    return rateCache.get(date)!.audToJpy;
  }
  return 97.5; // Default fallback
}

/**
 * Convert JPY to AUD synchronously (uses cached rate)
 */
export function convertJpyToAudSync(jpyAmount: number, date: string): number {
  if (!jpyAmount || jpyAmount === 0) return 0;
  const rate = getCachedRate(date);
  return Math.round((jpyAmount / rate) * 100) / 100;
}

/**
 * Update exchange rate for today (or specified date)
 */
export async function updateExchangeRate(date?: string): Promise<ExchangeRate> {
  const targetDate = date || new Date().toISOString().split('T')[0];
  
  try {
    // For historical dates, we use today's rate as proxy
    // (real historical rates would require a paid API)
    const rate = await fetchExchangeRate();
    rate.date = targetDate;
    rateCache.set(targetDate, rate);
    saveCache();
    return rate;
  } catch (e) {
    console.error('Failed to update exchange rate:', e);
    throw e;
  }
}

/**
 * Get current exchange rate with display info
 */
export async function getRateInfo(date?: string) {
  const rate = await getExchangeRate(date);
  return {
    rate: rate.audToJpy,
    date: rate.date,
    source: rate.source,
    formatted: `1 AUD = ${rate.audToJpy.toFixed(2)} JPY`
  };
}

// Initialize cache on module load
loadCache();
