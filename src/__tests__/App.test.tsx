import React from 'react';
import { axe } from 'jest-axe';

import { render, screen } from 'test-utils';
import App from '../App';

test('should render app with header', () => {
    render(<App />);
    const headerElement = screen.getByText('Farskapserklæring');
    expect(headerElement).toBeInTheDocument();
});

test('should have no a11y violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
