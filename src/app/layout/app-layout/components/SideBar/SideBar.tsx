import { useRef } from 'react';
import { Navigation } from '../Navigation';
import useResizeSideBar from './hooks/useResizeSideBar';

function SideBar() {
  const ref = useRef<HTMLDivElement | null>(null);

  useResizeSideBar({ ref });

  return (
    <aside className="grid grid-cols-[1fr_auto] overflow-y-auto group" id="side-bar">
      <Navigation />
      <div
        className="w-0.5 h-full bg-gray-200 hover:bg-gray-300 hover:w-1 hover:cursor-grab transition-[width,background] group-[.active]:bg-blue-300 group-[.active]:w-1"
        ref={ref}
      />
    </aside>
  );
}

export default SideBar;
