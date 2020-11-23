import { axe } from 'jest-axe';

import { render, screen } from 'test-utils';
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

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('should display title, text and banner', async () => {
    render(<ErrorPage {...defaultProps} />);

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test text')).toBeInTheDocument();
    expect(screen.getByText('Test banner title')).toBeInTheDocument();
    expect(screen.getByText('Test banner text')).toBeInTheDocument();
});
