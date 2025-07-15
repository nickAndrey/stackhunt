import { useEffect, useLayoutEffect } from 'react';

const SIDEBAR_WIDTH = 'SideBar_width';

type Args = {
  currentWidth: number;
};

const useStoreSideBarSize = ({ currentWidth }: Args) => {
  useLayoutEffect(() => {
    const sideBar = document.getElementById('side-bar');
    if (!sideBar) return;

    const savedWidth = localStorage.getItem(SIDEBAR_WIDTH);
    if (!savedWidth) return;

    sideBar.style.width = savedWidth;
  }, []);

  useEffect(() => {
    if (currentWidth === 0) return;
    localStorage.setItem(SIDEBAR_WIDTH, `${currentWidth}px`);
  }, [currentWidth]);
};

export default useStoreSideBarSize;
