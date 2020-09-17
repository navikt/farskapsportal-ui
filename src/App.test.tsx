import React from 'react';

import { renderWithIntlAndStore } from 'setupTests';
import App from './App';

test('renders learn react link', () => {
    const { getByText } = renderWithIntlAndStore(<App />);
    const linkElement = getByText(/Elektronisk farskapserklæring/i);
    expect(linkElement).toBeInTheDocument();
});
