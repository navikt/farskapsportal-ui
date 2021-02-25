import { ReactNode, useEffect } from 'react';
import { IntlProvider as Provider } from 'react-intl';
import '@formatjs/intl-numberformat/polyfill-force';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/nb';
import '@formatjs/intl-numberformat/locale-data/nn';
import '@formatjs/intl-datetimeformat/polyfill-force';
import '@formatjs/intl-datetimeformat/locale-data/en';
import '@formatjs/intl-datetimeformat/locale-data/nb';
import '@formatjs/intl-datetimeformat/locale-data/nn';

import { useStore } from 'store/Context';
import enMessages from 'texts/en';
import nbMessages from 'texts/nb';
import nnMessages from 'texts/nn';
import { languageCookie, setCookie } from 'utils/cookies';

interface LanguageProviderProps {
    children: ReactNode;
}

function LanguageProvider({ children }: LanguageProviderProps) {
    const [{ language }] = useStore();

    useEffect(() => {
        document.documentElement.lang = language;
        setCookie(languageCookie, language, 1);
    }, [language]);

    let messages = nbMessages;
    if (language === 'en') {
        messages = { ...nbMessages, ...enMessages };
    } else if (language === 'nn') {
        messages = { ...nbMessages, ...nnMessages };
    }

    return (
        <Provider locale={language} messages={messages || {}}>
            {children}
        </Provider>
    );
}

export default LanguageProvider;
