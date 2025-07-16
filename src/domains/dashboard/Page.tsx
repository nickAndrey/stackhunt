import type { HistoricalRatesRecord } from '@/shared/types/historical-rates-record';
import { useLoaderData } from 'react-router';
import { Slider } from './components/Slider';

function Page() {
  const rates = useLoaderData<HistoricalRatesRecord>();

  return (
    <div>
      <Slider headerComponent={<h2 className="text-xl font-bold">{rates.end_date}</h2>}>
        {Object.entries(rates.rates[rates.end_date]).map(([key, value]) => (
          <div
            key={key}
            className=" bg-white flex gap-2 p-5 min-w-[150px] min-h-[150px] shadow-md rounded-md"
          >
            <span>{key}</span>
            <span>{value}</span>
          </div>
        ))}
      </Slider>
      Page Dashboard
    </div>
  );
}

export default Page;
