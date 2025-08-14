import { useEffect, useState } from 'react';

type Option = {
  label: string;
  value: string;
  description?: string;
};

type FetchOptionsFn = (query: string) => Promise<Option[]>;

/**
 * Hook to manage Combobox state and async options fetching.
 * @param fetchOptions Async function to fetch options based on search query.
 */
export function useCombobox(fetchOptions: FetchOptionsFn) {
  const [value, setValue] = useState('');
  const [search, setSearch] = useState('');
  const [options, setOptions] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;

    fetchOptions(search).then((results) => {
      if (active) setOptions(results);
    });

    return () => {
      active = false;
    };
  }, [search, fetchOptions]);

  return {
    value,
    search,
    options,
    open,
    onValueChange: setValue,
    onSearchChange: setSearch,
    onOpenChange: setOpen,
  };
}
