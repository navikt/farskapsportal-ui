import React, { ReactNode } from 'react';
import { IntlProvider as Provider } from 'react-intl';

import { useStore } from 'store/Context';
import enMessages from './locales/en';
import nbMessages from './locales/nb';

interface IntlProviderProps {
    children: ReactNode;
}

function IntlProvider({ children }: IntlProviderProps) {
    const [{ locale }] = useStore();

    let messages = nbMessages;
    if (locale === 'en') {
        messages = { ...nbMessages, ...enMessages };
    }

    return (
        <Provider locale={locale} messages={messages || {}}>
            <div lang={locale}>{children}</div>
        </Provider>
    );
}

export default IntlProvider;
