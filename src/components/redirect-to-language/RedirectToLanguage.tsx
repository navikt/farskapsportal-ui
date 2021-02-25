import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { setLanguage } from 'store/actions';
import { useStore } from 'store/Context';
import { Language } from 'types/intl';
import { getCookie, languageCookie } from 'utils/cookies';

function RedirectToLanguage(props: { children: JSX.Element }) {
    const location = useLocation();
    const history = useHistory();
    const [{ language }] = useStore();

    useEffect(() => {
        const urlHasLanguage = ['/en/', '/nb/', '/nn/'].some((l) => location.pathname.includes(l));

        if (!urlHasLanguage) {
            const languageFromCookie = getCookie(languageCookie);
            if (languageFromCookie) {
                setLanguage(languageFromCookie as Language);
            }

            const nextLanguage = languageFromCookie ?? language;
            const redirectTo = `/${nextLanguage}${location.pathname}${location.search}${location.hash}`;

            history.replace(redirectTo);
        }
    }, [language, location, history]);
    return props.children;
}

export default RedirectToLanguage;
