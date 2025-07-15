import { useEffect, useState, type RefObject } from 'react';

type Args = {
  ref: RefObject<HTMLDivElement | null>;
};

const useResizeSideBar = ({ ref }: Args) => {
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizableElement = document.getElementById('side-bar');
    if (!resizableElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientX <= 60) return;
      if (e.clientX >= 250) return;

      resizableElement.style.width = e.clientX + 'px';
      setCurrentWidth(e.clientX);
    };

    const handleMouseDown = () => {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      resizableElement.classList.add('active');
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      resizableElement.classList.remove('active');
      document.body.style.cursor = 'default';
      document.body.style.userSelect = '';
    };

    element.addEventListener('mousedown', handleMouseDown);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
    };
  }, [ref]);

  return { currentWidth };
};

export default useResizeSideBar;
