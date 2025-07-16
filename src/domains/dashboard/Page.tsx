import type { CurrencyCode, HistoricalRatesRecord } from '@/shared/types/historical-rates-record';
import { useLoaderData } from 'react-router';
import { CurrencyRateCard } from './components/CurrencyRateCard';
import { Slider } from './components/Slider';
import getCurrencySeries from './utils/get-currency-series';

function Page() {
  const rates = useLoaderData<HistoricalRatesRecord>();
  const ratesForLast5Days = rates.rates.slice(-5);
  const currenciesToShow: CurrencyCode[] = ['EUR', 'AUD', 'CAD', 'GBP', 'JPY', 'CHF', 'HUF'];

  return (
    <div>
      <Slider headerComponent={<h2 className="text-xl font-bold">{rates.end_date}</h2>}>
        {currenciesToShow.map((currency) => {
          const series = getCurrencySeries(ratesForLast5Days, currency);

          return (
            <CurrencyRateCard
              key={currency}
              currency={currency}
              series={series}
              percent={series[series.length - 1].percent}
            />
          );
        })}
      </Slider>
      Page Dashboard
    </div>
  );
}

export default Page;
