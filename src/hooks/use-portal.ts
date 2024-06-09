import { useEffect, useRef, useState } from 'react';

function usePortal(): HTMLDivElement | null {
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const [portal, setPortal] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const portalContainer = document.createElement('div');
    portalContainerRef.current = portalContainer;

    document.body.appendChild(portalContainer);

    if (portalContainerRef.current) {
      setPortal(portalContainerRef.current);
    }
    return () => {
      if (portalContainerRef.current) {
        document.body.removeChild(portalContainerRef.current);
      }
    };
  }, []);

  return portal;
}

export default usePortal;
