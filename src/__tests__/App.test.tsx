import { render, runAxe } from 'test-utils';
import { expect, test } from 'vitest';
import App from '../App';

test('should have no a11y violations', async () => {
    const { container } = render(<App />);
    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
});
