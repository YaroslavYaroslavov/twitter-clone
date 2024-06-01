import { useEffect, useRef, useState } from 'react';
function usePortal() {
    const portalContainerRef = useRef(null);
    const [portal, setPortal] = useState(null);
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
