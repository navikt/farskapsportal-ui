import '@testing-library/jest-dom/extend-expect';
import React, { ComponentType, ReactElement, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';

import IntlProvider from 'intl/IntlProvider';
import { StoreProvider } from 'store/Context';
import { initialState, reducer } from 'store/store';

const AllTheProviders = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <StoreProvider initialState={initialState} reducer={reducer}>
            <IntlProvider>
                <Router>{children}</Router>
            </IntlProvider>
        </StoreProvider>
    );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
    render(ui, { wrapper: AllTheProviders as ComponentType, ...options });

export * from '@testing-library/react';

export { customRender as render };
