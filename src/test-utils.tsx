import '@testing-library/jest-dom/extend-expect';
import 'jest-axe/extend-expect';
import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';

import IntlProvider from 'intl/IntlProvider';
import { StoreProvider } from 'store/Context';
import { initialState, reducer, Store } from 'store/store';

const AllTheProviders = ({
    children,
    store,
}: {
    children: ReactNode;
    store?: Partial<Store>;
}): ReactElement => {
    return (
        <StoreProvider initialState={{ ...initialState, ...store }} reducer={reducer}>
            <IntlProvider>
                <Router>{children}</Router>
            </IntlProvider>
        </StoreProvider>
    );
};

const customRender = (
    ui: ReactElement,
    { store, ...options }: RenderOptions & { store?: Partial<Store> } = {}
) => render(<AllTheProviders store={store}>{ui}</AllTheProviders>, { ...options });

export * from '@testing-library/react';

export { customRender as render };
