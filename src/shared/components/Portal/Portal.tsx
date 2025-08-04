import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  /**
   * @param elementId String that specifies the ID value.
   */
  elementId: string;
  children: ReactNode;
};

export function Portal({ elementId, children }: PortalProps) {
  const [targetElementContainer, setTargetElementContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.getElementById(elementId);

    if (!el) {
      console.warn(`Portal target element #${elementId} not found.`);
    }

    setTargetElementContainer(el);
  }, [elementId]);

  return targetElementContainer && createPortal(children, targetElementContainer);
}
