import type { ReactNode } from 'react';

type SliderProps = {
  children: ReactNode;
  headerComponent?: ReactNode;
};

function Slider({ children, headerComponent }: SliderProps) {
  return (
    <section className="pt-4">
      <header className="mb-2 px-2">{headerComponent}</header>

      <div className="grid grid-flow-col gap-4 overflow-auto py-2">{children}</div>
    </section>
  );
}

export default Slider;
