import { axe } from 'jest-axe';

import { render } from 'test-utils';
import Forside from '../Forside';
import Modal from 'nav-frontend-modal';

Modal.setAppElement = () => null;

test('should have no a11y violations', async () => {
    const { container } = render(<Forside />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
