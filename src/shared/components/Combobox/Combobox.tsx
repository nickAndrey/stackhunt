import { Button } from '@/design-system/components/ui/button';
import { Input } from '@/design-system/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/design-system/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { useCombobox } from './hooks/useCombobox';

type ComboboxProps = ReturnType<typeof useCombobox> & {
  id?: string;
};

export function Combobox({
  value,
  search,
  options,
  open,
  id,
  onValueChange,
  onSearchChange,
  onOpenChange,
}: ComboboxProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value ? options.find((opt) => opt.value === value)?.label : 'Select option...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-2 space-y-2" side="bottom" align="start">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <div className="max-h-[200px] overflow-auto">
          {options.length === 0 && (
            <p className="text-sm text-muted-foreground">No results found.</p>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              className="flex w-full items-center justify-between rounded-sm px-2 py-1 hover:bg-accent"
              onClick={() => {
                onValueChange(option.value === value ? '' : option.value);
                onOpenChange(false);
              }}
            >
              <span className="flex flex-col items-start">
                {option.label}
                <small>{option.description}</small>
              </span>
              {value === option.value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
