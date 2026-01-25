#!/bin/bash
# Update exchange rates for Japan trip dates
# Usage: ./update-trip-rates.sh

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_DIR"

echo "Japan Trip Exchange Rate Updater"
echo "================================"

# Trip dates (update these for your trip)
TRIP_DATES=(
  "2026-01-25"
  "2026-01-26"
  "2026-01-27"
  "2026-01-28"
  "2026-01-29"
  "2026-01-30"
  "2026-01-31"
)

echo ""
echo "Fetching exchange rates for trip dates..."
echo ""

for date in "${TRIP_DATES[@]}"; do
  echo -n "  $date: "
  node -e "
    import('$PROJECT_DIR/src/lib/exchange-rates.js').then(async ({ updateExchangeRate }) => {
      try {
        const rate = await updateExchangeRate('$date');
        console.log(rate.audToJpy.toFixed(2) + ' JPY');
      } catch (e) {
        console.log('Failed: ' + e.message);
      }
    });
  "
done

echo ""
echo "Done! Exchange rates cached in .cache/exchange-rates.json"
