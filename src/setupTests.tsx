import React, { ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import messages from './text/nb';

export const renderWithReactIntl = (component: ReactNode) => {
    return render(
        <IntlProvider locale="nb" messages={messages}>
            {component}
        </IntlProvider>
    );
};
