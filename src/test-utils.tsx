import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';

import { StoreProvider } from 'store/Context';
import LanguageProvider from 'store/providers/LanguageProvider';
import { initialState, reducer, Store } from 'store/store';

function ProviderWrapper({ children, store }: { children: ReactNode; store?: Partial<Store> }) {
    return (
        <StoreProvider initialState={{ ...initialState, ...store }} reducer={reducer}>
            <LanguageProvider>
                <Router>{children}</Router>
            </LanguageProvider>
        </StoreProvider>
    );
}

const customRender = (
    ui: ReactElement,
    { store, ...options }: RenderOptions & { store?: Partial<Store> } = {}
) => render(<ProviderWrapper store={store}>{ui}</ProviderWrapper>, { ...options });

export * from '@testing-library/react';

export { customRender as render };
