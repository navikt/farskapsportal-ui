import React, { ReactNode } from 'react';
import { IntlProvider as Provider } from 'react-intl';

import { useStore } from 'store/Context';
import enMessages from './locales/en';
import nbMessages from './locales/nb';
import nnMessages from './locales/nn';

interface IntlProviderProps {
    children: ReactNode;
}

function IntlProvider({ children }: IntlProviderProps) {
    const [{ language }] = useStore();

    let messages = nbMessages;
    if (language === 'en') {
        messages = { ...nbMessages, ...enMessages };
    } else if (language === 'nn') {
        messages = { ...nbMessages, ...nnMessages };
    }

    return (
        <Provider locale={language} messages={messages || {}}>
            <div lang={language}>{children}</div>
        </Provider>
    );
}

export default IntlProvider;
