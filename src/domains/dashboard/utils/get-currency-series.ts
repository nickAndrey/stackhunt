import type { CurrencyCode, DailyRate } from '@/shared/types/historical-rates-record';

function getCurrencySeries(data: DailyRate[], currency: CurrencyCode) {
  return data.map((entry) => ({
    date: entry.date,
    delta: entry[currency]?.delta ?? 0,
    percent: entry[currency]?.percent ?? 0,
  }));
}

export default getCurrencySeries;
