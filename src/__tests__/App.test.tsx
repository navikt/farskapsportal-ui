import { axe } from 'jest-axe';

import { render, screen } from 'test-utils';
import texts from 'texts/nb';
import App from '../App';
import Modal from 'nav-frontend-modal';

Modal.setAppElement = () => null;

const headerText = texts['header.forside'];

test('should render app with header', () => {
    render(<App />);
    const headerElement = screen.getByText(headerText);
    expect(headerElement).toBeInTheDocument();
});

test('should have no a11y violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
