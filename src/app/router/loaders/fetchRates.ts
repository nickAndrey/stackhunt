import type { HistoricalRatesRecord } from '@/shared/types/historical-rates-record';
import dbGet from '@/shared/utils/idb/db-get';
import dbWrite from '@/shared/utils/idb/db-write';
import formatTime from '@/shared/utils/time-format';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

async function fetchRates() {
  const rates = await dbGet<HistoricalRatesRecord>({
    dbName: 'dashboard',
    storeName: 'rates',
    searchId: 'historical_rates',
  });

  const isFresh = rates && rates.last_updated + ONE_DAY_MS > Date.now();

  if (isFresh) return rates;

  try {
    const response = await fetch(
      `${import.meta.env.VITE_FRANKFURTER}/2024-01-01..${formatTime(new Date())}?base=USD`
    );
    const dataJson = await response.json();

    if (!response.ok) throw new Error('Failed to fetch data');

    const cachedData = await dbWrite<HistoricalRatesRecord>({
      dbName: 'dashboard',
      storeName: 'rates',
      data: {
        ...dataJson,
        id: 'historical_rates',
        last_updated: Date.now(),
      },
    });

    return cachedData;
  } catch (e) {
    console.error(e);
    if (rates) return rates;
  }
}

export default fetchRates;
