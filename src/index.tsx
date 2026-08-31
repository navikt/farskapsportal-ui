import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { init as initApm, setTag } from '@nais/apm';
import { ApmErrorBoundary } from '@nais/apm/react';
import '@navikt/ds-css';
import App from './App';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import { StoreProvider } from 'store/Context';
import LanguageProvider from 'store/providers/LanguageProvider';
import { initialState, reducer } from 'store/store';

// NAIS meta tags (app, namespace, version, environment and telemetryUrl)
// are resolved automatically from values injected by the server at runtime.
initApm();
// Tagger alle events med scope:farskapsportal-ui (tilsvarte beforeCapture i Sentry.ErrorBoundary)
// for å filtrere på kun exceptions fanget opp av ApmErrorBoundary.ErrorBoundary. Dette vil også
// filtrere ut alle exceptions som nav-dekoratøren kaster.
setTag('scope', 'farskapsportal-ui');

const init = async () => {
    if (import.meta.env.DEV) {
        await import('./api/mock/app').then(({ setUpMock }) => setUpMock());

        injectDecoratorClientSide({
            env: 'dev',
            params: {
                context: 'privatperson',
                level: 'Level4',
                chatbot: false,
            },
        });
    }

    const container = document.getElementById('app');
    if (!container) throw new Error('Root element #app not found');
    createRoot(container).render(
        <StrictMode>
            <ApmErrorBoundary fallback={<p>NA: Noe gikk galt. Vennligst prøv igjen senere.</p>}>
                <StoreProvider initialState={initialState} reducer={reducer}>
                    <LanguageProvider>
                        <Router>
                            <ScrollToTop />
                            <App />
                        </Router>
                    </LanguageProvider>
                </StoreProvider>
            </ApmErrorBoundary>
        </StrictMode>
    );
};

init().catch((error) => {
    console.error('Failed to initialize app', error);
});
