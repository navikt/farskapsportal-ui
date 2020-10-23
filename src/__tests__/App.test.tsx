import React from 'react';

import { renderWithIntlAndStore } from 'setupTests';
import App from '../App';

test('renders learn react link', () => {
    const { getByText } = renderWithIntlAndStore(<App />);
    const headerElement = getByText('Farskapserklæring');
    expect(headerElement).toBeInTheDocument();
});
