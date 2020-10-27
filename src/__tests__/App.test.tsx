import React from 'react';

import { render } from 'test-utils';
import App from '../App';

test('renders app with header', () => {
    const { getByText } = render(<App />);
    const headerElement = getByText('Farskapserklæring');
    expect(headerElement).toBeInTheDocument();
});
