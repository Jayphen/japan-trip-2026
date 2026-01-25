/**
 * Update exchange rates for trip dates
 * Run with: node tools/update-rates.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.dirname(__dirname);

// Trip dates - update these for your trip
const TRIP_DATES = [
  "2026-01-25",
  "2026-01-26",
  "2026-01-27",
  "2026-01-28",
  "2026-01-29",
  "2026-01-30",
  "2026-01-31",
];

const CACHE_DIR = path.join(PROJECT_ROOT, '.cache');
const RATES_FILE = path.join(CACHE_DIR, 'exchange-rates.json');

const API_URL = 'https://api.exchangerate-api.com/v4/latest/AUD';

// Load cached rates
let rateCache = {};
try {
  if (fs.existsSync(RATES_FILE)) {
    rateCache = JSON.parse(fs.readFileSync(RATES_FILE, 'utf-8'));
  }
} catch (e) {
  console.warn('Could not load cache:', e.message);
}

// Fetch rate from API
async function fetchRate() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error(`API error: ${response.status}`);
  const data = await response.json();
  return data.rates?.JPY;
}

async function updateRates() {
  console.log('Japan Trip Exchange Rate Updater');
  console.log('================================\n');
  
  for (const date of TRIP_DATES) {
    process.stdout.write(`  ${date}: `);
    try {
      // Use today's rate as proxy (historical rates require paid API)
      const rate = await fetchRate();
      rateCache[date] = {
        audToJpy: rate,
        date,
        timestamp: Date.now(),
        source: 'exchangerate-api.com'
      };
      console.log(`${rate.toFixed(2)} JPY`);
    } catch (e) {
      console.log(`Failed: ${e.message}`);
    }
  }
  
  // Save cache
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
  fs.writeFileSync(RATES_FILE, JSON.stringify(rateCache, null, 2));
  
  console.log('\nDone! Rates saved to .cache/exchange-rates.json');
}

updateRates().catch(console.error);
