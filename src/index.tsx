import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.less';
import App from './App';
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

        injectDecoratorClientSide({
            env: 'localhost',
            port: 8100,
            level: 'Level4',
            redirectToApp: true,
        });
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
