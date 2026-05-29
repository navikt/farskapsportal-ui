import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';

import { setLanguage } from 'store/actions';
import { useStore } from 'store/Context';
import { Language } from 'types/intl';

export const useDekoratorLanguage = () => {
    const [, dispatch] = useStore();
    const navigate = useNavigate();
    const location = useLocation();

    onLanguageSelect((language) => {
        dispatch(setLanguage(language.locale as Language));
        navigate(language.url || '/nb');
    });

    useEffect(() => {
        setAvailableLanguages([
            {
                url: `${location.pathname.replace(/\/(en|nn)\//, '/nb/')}${location.search}${
                    location.hash
                }`,
                locale: 'nb',
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/\/(en|nb)\//, '/nn/')}${location.search}${
                    location.hash
                }`,
                locale: 'nn',
                handleInApp: true,
            },
            {
                url: `${location.pathname.replace(/\/(nb|nn)\//, '/en/')}${location.search}${
                    location.hash
                }`,
                locale: 'en',
                handleInApp: true,
            },
        ]);
    }, [location]);
};
