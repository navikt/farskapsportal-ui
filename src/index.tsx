import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Sentry from '@sentry/react';

import './index.less';
import App from './App';
import footer from 'api/mock/decorator/decorator-footer';
import header from 'api/mock/decorator/decorator-header';
import scripts from 'api/mock/decorator/decorator-scripts';
import styles from 'api/mock/decorator/decorator-styles';
import ErrorBoundary from 'components/error-boundary/ErrorBoundary';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import { StoreProvider } from 'store/Context';
import LanguageProvider from 'store/providers/LanguageProvider';
import { initialState, reducer } from 'store/store';

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: 'https://45feaf242d6e4c02b4b536ccc838eed1@sentry.gc.nav.no/48',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        release: (window as any).APP_VERSION,
        environment: window.location.hostname,
    });
}

const init = async () => {
    if (process.env.NODE_ENV === 'development') {
        await import('./api/mock/app').then(({ setUpMock }) => setUpMock());

        document.body.innerHTML = document.body.innerHTML.replace('{{{STYLES}}}', styles);
        document.body.innerHTML = document.body.innerHTML.replace('{{{HEADER}}}', header);
        document.body.innerHTML = document.body.innerHTML.replace('{{{FOOTER}}}', footer);
        document.body.innerHTML = document.body.innerHTML.replace('{{{SCRIPTS}}}', scripts);

        // Execute client.js
        const script = document.createElement('script');
        script.src = 'http://localhost:8100/dekoratoren/client.js';
        document.body.appendChild(script);
    }

    render(
        <StrictMode>
            <ErrorBoundary>
                <StoreProvider initialState={initialState} reducer={reducer}>
                    <LanguageProvider>
                        <Router>
                            <ScrollToTop />
                            <App />
                        </Router>
                    </LanguageProvider>
                </StoreProvider>
            </ErrorBoundary>
        </StrictMode>,
        document.getElementById('app')
    );
};

init();
