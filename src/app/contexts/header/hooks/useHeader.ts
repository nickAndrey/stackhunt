import { useContext } from 'react';
import { HeaderContext } from '../header-context';

export function useHeader() {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within HeaderProvider.');
  }
  return context;
}
