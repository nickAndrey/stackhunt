import { createContext } from 'react';

export type HeaderContent = {
  title?: string;
  actions?: React.ReactNode;
  isMenuOpened?: boolean;
};

export const HeaderContext = createContext<{
  header: HeaderContent;
  setHeader: React.Dispatch<React.SetStateAction<HeaderContent>>;
  updateHeader?: (content: HeaderContent) => void;
  toggleMenu?: (isOpened: boolean) => void;
}>({
  header: {},
  setHeader: () => {},
});
