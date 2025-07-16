type CurrencyDelta = {
  delta: number;
  percent: number;
};

type RateDeltaEntry = {
  date: string;
  [currency: string]: number | CurrencyDelta | string;
};

function calculateRateDeltas(
  ratesByDate: Record<string, Record<string, number>>
): RateDeltaEntry[] {
  const sortedDates = Object.keys(ratesByDate).sort(); // ascending date order
  const result: RateDeltaEntry[] = [];

  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i];
    const todayRates = ratesByDate[date];
    const previousDate = sortedDates[i - 1];
    const previousRates = ratesByDate[previousDate] || {};

    const entry: RateDeltaEntry = { date };

    for (const currency in todayRates) {
      const current = todayRates[currency];
      const prev = previousRates[currency];

      if (typeof prev === 'number') {
        const delta = current - prev;
        const percent = (delta / prev) * 100;
        entry[currency] = {
          delta: parseFloat(delta.toFixed(4)),
          percent: parseFloat(percent.toFixed(2)),
        };
      } else {
        entry[currency] = current;
      }
    }

    result.push(entry);
  }

  return result;
}

export default calculateRateDeltas;
