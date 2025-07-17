import type { CurrencyCode, HistoricalRatesRecord } from '@/shared/types/historical-rates-record';
import getCurrencySeries from '../../utils/get-currency-series';
import { CurrencyRateCard } from '../CurrencyRateCard';
import { Slider } from '../Slider';

type RatesSliderProps = {
  rates: HistoricalRatesRecord;
};

function RatesSlider({ rates }: RatesSliderProps) {
  const ratesForLast5Days = rates.rates.slice(-5);
  const currenciesToShow: CurrencyCode[] = ['EUR', 'AUD', 'CAD', 'GBP', 'JPY', 'CHF', 'HUF'];
  return (
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
  );
}

export default RatesSlider;
