import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';

import { setLanguage } from 'store/actions';
import { useStore } from 'store/Context';
import { Language } from 'types/intl';

export const useDekoratorLanguage = () => {
    const [, dispatch] = useStore();
    const history = useHistory();
    const location = useLocation();

    onLanguageSelect((language) => {
        dispatch(setLanguage(language.locale as Language));
        history.push(language.url);
    });

    useEffect(() => {
        setAvailableLanguages([
            {
                url: `${location.pathname.replace(/^\/(en|nn)\/?/, '/nb/')}`,
                locale: 'nb',
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/^\/(en|nb)\/?/, '/nn/')}`,
                locale: 'nn',
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/^\/(nb|nn)\/?/, '/en/')}`,
                locale: 'en',
                handleInApp: true,
            },
        ]);
    }, [location]);
};
