export type CurrencyCode =
  | 'AUD'
  | 'BGN'
  | 'BRL'
  | 'CAD'
  | 'CHF'
  | 'CNY'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HKD'
  | 'HUF'
  | 'IDR'
  | 'ILS'
  | 'INR'
  | 'ISK'
  | 'JPY'
  | 'KRW'
  | 'MXN'
  | 'MYR'
  | 'NOK'
  | 'NZD'
  | 'PHP'
  | 'PLN'
  | 'RON'
  | 'SEK'
  | 'SGD'
  | 'THB'
  | 'TRY'
  | 'ZAR';

export type DailyRate = {
  date: string;
} & {
  [key in CurrencyCode]?: { delta: number; percent: number };
};

export type HistoricalRatesRecord = {
  id: string;
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  last_updated: number; // timestamp (ms since epoch)
  rates: DailyRate[];
};
