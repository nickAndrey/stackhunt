import { Button } from '@/design-system/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MonthTogglerProps = {
  currentMonth: string;
  currentYear: number;
  setPrevMonth: () => void;
  setNextMonth: () => void;
};

export function MonthToggler({
  setPrevMonth,
  setNextMonth,
  currentMonth,
  currentYear,
}: MonthTogglerProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-3">
        <Button variant="ghost" className="size-10 rounded-full" onClick={setPrevMonth}>
          <ChevronLeft />
        </Button>
        <Button variant="ghost" className="size-10 rounded-full" onClick={setNextMonth}>
          <ChevronRight />
        </Button>
      </div>
      <h4 className="text-xl">
        {currentMonth} {currentYear}
      </h4>
    </div>
  );
}
