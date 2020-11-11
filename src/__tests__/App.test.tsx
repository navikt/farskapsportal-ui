import React from 'react';

import { render, screen } from 'test-utils';
import App from '../App';

test('renders app with header', () => {
    render(<App />);
    const headerElement = screen.getByText('Farskapserklæring');
    expect(headerElement).toBeInTheDocument();
});
