import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  slots: {
    id: string;
    element: ReactNode;
  }[];
};

export function Portal({ slots }: PortalProps) {
  const [targets, setTargets] = useState<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const resolved: Record<string, HTMLElement | null> = {};
    for (const slot of slots) {
      const el = document.getElementById(slot.id);
      if (!el) {
        console.warn(`Portal target element #${slot.id} not found.`);
      }
      resolved[slot.id] = el;
    }
    setTargets(resolved);
  }, [slots]);

  return (
    <>
      {slots.map(
        (slot) => targets[slot.id] && createPortal(slot.element, targets[slot.id] as HTMLElement)
      )}
    </>
  );
}
