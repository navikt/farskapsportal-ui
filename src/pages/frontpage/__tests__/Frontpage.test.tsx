import { axe } from 'jest-axe';

import { render } from 'test-utils';
import Frontpage from '../Frontpage';

test('should have no a11y violations', async () => {
    const { container } = render(<Frontpage />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});
