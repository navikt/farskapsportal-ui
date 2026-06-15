import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import * as Sentry from '@sentry/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import '@navikt/ds-css';
import App from './App';
import ErrorBoundary from 'components/error-boundary/ErrorBoundary';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import { StoreProvider } from 'store/Context';
import LanguageProvider from 'store/providers/LanguageProvider';
import { initialState, reducer } from 'store/store';

if (import.meta.env.PROD) {
    Sentry.init({
        dsn: 'https://45feaf242d6e4c02b4b536ccc838eed1@sentry.gc.nav.no/48',
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        release: (window as any).APP_VERSION,
        environment: window.location.hostname,
    });
}

const init = async () => {
    if (import.meta.env.DEV) {
        await import('./api/mock/app').then(({ setUpMock }) => setUpMock());

        injectDecoratorClientSide({
            env: 'dev',
            params: {
                context: 'privatperson',
                level: 'Level4',
                chatbot: true,
            },
        });
    }

    const container = document.getElementById('app');
    if (!container) throw new Error('Root element #app not found');
    createRoot(container).render(
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
        </StrictMode>
    );
};

init();
