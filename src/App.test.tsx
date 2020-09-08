import React from 'react';

import { renderWithReactIntlAndStore } from './setupTests';
import App from './App';

test('renders learn react link', () => {
    const { getByText } = renderWithReactIntlAndStore(<App />);
    const linkElement = getByText(/Elektronisk farskapserklæring/i);
    expect(linkElement).toBeInTheDocument();
});
