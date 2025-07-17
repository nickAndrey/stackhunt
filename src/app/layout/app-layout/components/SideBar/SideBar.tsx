import { useRef, type ReactNode } from 'react';

import useResizeSideBar from './hooks/useResizeSideBar';
import useStoreSideBarSize from './hooks/useStoreSideBarSize';

type SideBarProps = {
  children: (currentWidth: number) => ReactNode;
};

function SideBar({ children }: SideBarProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { currentWidth } = useResizeSideBar({ ref });

  useStoreSideBarSize({ currentWidth });

  return (
    <aside className="grid grid-cols-[1fr_auto] overflow-y-auto group" id="side-bar">
      {children(currentWidth)}
      <div
        className="w-0.5 h-full bg-gray-200 hover:bg-gray-300 hover:w-1 hover:cursor-grab transition-[width,background] group-[.active]:bg-blue-300 group-[.active]:w-1"
        ref={ref}
      />
    </aside>
  );
}

export default SideBar;
