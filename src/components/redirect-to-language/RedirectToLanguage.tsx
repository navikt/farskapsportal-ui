import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { useStore } from 'store/Context';

function RedirectToLanguage(props: { children: JSX.Element }) {
    const location = useLocation();
    const history = useHistory();
    const [{ language }] = useStore();

    useEffect(() => {
        const urlHasLanguage = ['/en/', '/nb/', '/nn/'].some((l) => location.pathname.includes(l));

        if (!urlHasLanguage) {
            const redirectTo = `/${language}${location.pathname}${location.search}${location.hash}`;
            history.replace(redirectTo);
        }
    }, [language, location, history]);

    return props.children;
}

export default RedirectToLanguage;
