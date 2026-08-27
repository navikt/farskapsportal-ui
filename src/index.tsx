import { injectDecoratorClientSide } from '@navikt/nav-dekoratoren-moduler';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';
import { init as initApm } from '@nais/apm';
import { ApmErrorBoundary } from '@nais/apm/react';
import '@navikt/ds-css';
import App from './App';
import ScrollToTop from 'components/scroll-to-top/ScrollToTop';
import { StoreProvider } from 'store/Context';
import LanguageProvider from 'store/providers/LanguageProvider';
import { initialState, reducer } from 'store/store';

initApm({
    namespace: 'farskapsportal',
});

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
            <ApmErrorBoundary fallback={<p>Noe gikk galt.</p>}>
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
