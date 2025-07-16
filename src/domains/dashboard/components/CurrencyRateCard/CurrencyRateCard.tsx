import { Line, LineChart, ResponsiveContainer } from 'recharts';

type CurrencyRateCardProps = {
  currency: string;
  percent: number;
  series: {
    date: string;
    delta: number;
    percent: number;
  }[];
};

function CurrencyRateCard({ currency, percent, series }: CurrencyRateCardProps) {
  return (
    <div className="bg-white flex flex-col gap-2 p-5 min-w-[200px] min-h-[150px] shadow-md rounded-md">
      <div className="flex gap-2 items-center">
        <h3 className="text-md font-semibold">{currency}</h3>
        <span className="text-sm pt-0.5 px-1.5 items-center bg-green-100 inline-flex rounded-4xl w-max ml-auto">
          {percent}%
        </span>
      </div>

      <ResponsiveContainer>
        <LineChart data={series} width={150} height={100}>
          <Line dataKey="delta" type="monotone" dot={false} activeDot={false} strokeWidth={1} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CurrencyRateCard;
