import { axe } from 'jest-axe';

import { render, screen } from 'test-utils';
import App from '../App';
import Modal from 'nav-frontend-modal';

Modal.setAppElement = () => null;

test('should have no a11y violations', async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
