import { ReactNode, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface ScrollToTopProps {
    children: ReactNode;
}

function ScrollToTop({ children }: ScrollToTopProps) {
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <>{children}</>;
}

export default ScrollToTop;
