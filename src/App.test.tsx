import React from 'react';
import { renderWithReactIntl } from './setupTests';
import App from './App';

test('renders learn react link', () => {
    const { getByText } = renderWithReactIntl(<App />);
    const linkElement = getByText(/Elektronisk farskapserklæring/i);
    expect(linkElement).toBeInTheDocument();
});
