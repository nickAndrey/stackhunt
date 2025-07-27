import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

const SIDEBAR_WIDTH = 'SideBar_width';

const getInitialSidebarWidth = () => {
  const saved = localStorage.getItem(SIDEBAR_WIDTH);
  return saved ? parseFloat(saved) : 60;
};

export function useStoreSideBarSize() {
  const [currentWidth, setCurrentWidth] = useState(getInitialSidebarWidth);
  const currentWidthDebounced = useDebounce(currentWidth, 500);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_WIDTH, currentWidthDebounced.toString());
  }, [currentWidthDebounced]);

  const handleResize = (currentSize: number) => {
    const valueToSave = currentSize;
    setCurrentWidth(valueToSave);
  };

  return {
    currentWidth,
    handleResize,
  };
}
