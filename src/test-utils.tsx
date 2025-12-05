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
export function generateRandomValidNorwegianIdent(): string {
    // Generate random date (last 30 years)
    const today = new Date();
    const randomDate = new Date(
        today.getFullYear() - Math.floor(Math.random() * 30),
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
    );

    const day = String(randomDate.getDate()).padStart(2, '0');
    const month = String(randomDate.getMonth() + 1).padStart(2, '0');
    const year = String(randomDate.getFullYear()).slice(-2);

    // Generate individual number (000-999)
    const individualNumber = String(Math.floor(Math.random() * 1000)).padStart(3, '0');

    const partial = `${day}${month}${year}${individualNumber}`;

    // Calculate control digits using mod11 algorithm
    const k1Weights = [3, 7, 6, 1, 8, 9, 4, 5, 2];
    const k2Weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

    const k1Sum = partial.split('').reduce((sum, digit, i) => sum + parseInt(digit) * k1Weights[i], 0);
    const k1 = 11 - (k1Sum % 11);
    const firstControl = k1 === 11 ? 0 : k1;

    if (firstControl === 10) {
        // Invalid, regenerate
        return generateRandomValidNorwegianIdent();
    }

    const partialWithK1 = partial + firstControl;
    const k2Sum = partialWithK1.split('').reduce((sum, digit, i) => sum + parseInt(digit) * k2Weights[i], 0);
    const k2 = 11 - (k2Sum % 11);
    const secondControl = k2 === 11 ? 0 : k2;

    if (secondControl === 10) {
        // Invalid, regenerate
        return generateRandomValidNorwegianIdent();
    }

    return `${partial}${firstControl}${secondControl}`;
}
export { customRender as render };
