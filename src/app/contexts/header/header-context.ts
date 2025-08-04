import { createContext } from 'react';

export type HeaderContent = {
  title?: string;
  actions?: React.ReactNode;
};

export const HeaderContext = createContext<{
  header: HeaderContent;
  setHeader: React.Dispatch<React.SetStateAction<HeaderContent>>;
}>({
  header: {},
  setHeader: () => {},
});
