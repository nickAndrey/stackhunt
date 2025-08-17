import { useState, type ReactNode } from 'react';
import { HeaderContext, type HeaderContent } from './header-context';

type HeaderProviderProps = { children: ReactNode };

export const HeaderProvider = ({ children }: HeaderProviderProps) => {
  const [header, setHeader] = useState<HeaderContent>({});

  const updateHeader = (content: HeaderContent) => {
    setHeader((prev) => ({ ...prev, ...content }));
  };

  const toggleMenu = (isOpened: boolean) => {
    setHeader((prev) => ({ ...prev, isMenuOpened: isOpened }));
  };

  return (
    <HeaderContext.Provider value={{ header, setHeader, updateHeader, toggleMenu }}>
      {children}
    </HeaderContext.Provider>
  );
};
