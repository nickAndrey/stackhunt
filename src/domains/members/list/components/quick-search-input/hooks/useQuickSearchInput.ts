import type { Staff } from '@/shared/types/staff';
import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';
import { searchForStaff } from '../services/search-for-staff';

export function useQuickSearchInput() {
  const [searchValue, setSearchValue] = useState('');
  const searchValueDebounced = useDebounce(searchValue, 1000);

  const [searchResults, setSearchResults] = useState<Staff[] | null>(null);

  useEffect(() => {
    const getSearchResults = async () => {
      if (searchValueDebounced.trim() === '') {
        setSearchResults(null);
        return;
      }
      const data = await searchForStaff(searchValueDebounced);
      setSearchResults(data);
    };

    getSearchResults();
  }, [searchValueDebounced]);

  return {
    searchValue,
    searchResults,
    setSearchValue,
  };
}
