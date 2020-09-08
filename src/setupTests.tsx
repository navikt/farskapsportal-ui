import React, { ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';

import { StoreProvider } from 'store/Context';
import { initialState, reducer } from 'store/store';
import messages from 'text/nb';

export const renderWithReactIntlAndStore = (component: ReactNode) => {
    return render(
        <IntlProvider locale="nb" messages={messages}>
            <StoreProvider initialState={initialState} reducer={reducer}>
                <Router>{component}</Router>
            </StoreProvider>
        </IntlProvider>
    );
};
