import { render, runAxe, screen } from 'test-utils';
import { expect, test } from 'vitest';
import ErrorPage, { ErrorPageProps } from '../ErrorPage';

const defaultProps: ErrorPageProps = {
    title: 'Test title',
    text: 'Test text',
    banner: {
        title: 'Test banner title',
        text: 'Test banner text',
    },
};

test('should have no a11y violations', async () => {
    const { container } = render(<ErrorPage {...defaultProps} />);

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
});

test('should display title, text and banner', async () => {
    render(<ErrorPage {...defaultProps} />);

    expect(screen.getByText('Test title')).not.toBeNull();
    expect(screen.getByText('Test text')).not.toBeNull();
    expect(screen.getByText('Test banner title')).not.toBeNull();
    expect(screen.getByText('Test banner text')).not.toBeNull();
});
