import React, { ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

import IntlProvider from 'intl/IntlProvider';
import { StoreProvider } from 'store/Context';
import { initialState, reducer } from 'store/store';

export const renderWithIntlAndStore = (component: ReactNode) => {
    return render(
        <StoreProvider initialState={initialState} reducer={reducer}>
            <IntlProvider>
                <Router>{component}</Router>
            </IntlProvider>
        </StoreProvider>
    );
};
