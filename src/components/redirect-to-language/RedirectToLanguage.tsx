import { Navigate, useLocation } from 'react-router-dom';

import { useStore } from 'store/Context';

function RedirectToLanguage(props: { children: JSX.Element }) {
    const location = useLocation();
    const [{ language }] = useStore();

    const urlHasLanguage = ['/en/', '/nb/', '/nn/'].some((l) => location.pathname.includes(l));

    if (!urlHasLanguage) {
        return (
            <Navigate
                to={`/${language}${location.pathname}${location.search}${location.hash}`}
                replace
            />
        );
    }

    return props.children;
}

export default RedirectToLanguage;
