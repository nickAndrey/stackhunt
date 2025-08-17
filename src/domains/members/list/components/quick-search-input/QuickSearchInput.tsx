import { Input } from '@/design-system/components/ui/input';
import { Search } from 'lucide-react';
import type { useQuickSearchInput } from './hooks/useQuickSearchInput';

type QuickSearchInputProps = ReturnType<typeof useQuickSearchInput> & {};

export function QuickSearchInput({ searchValue, setSearchValue }: QuickSearchInputProps) {
  return (
    <div className="relative mr-2 w-full">
      <Input
        placeholder="Search for staff ..."
        className="peer block w-full rounded-md border py-[9px] pl-10 text-sm"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-[16px] w-[16px]" />
    </div>
  );
}
