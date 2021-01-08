import { axe } from 'jest-axe';

import { fireEvent, render, screen, waitFor } from 'test-utils';
import SelectBarnForm, { SelectBarnFormProps } from '../SelectBarnForm';

const defaultProps: SelectBarnFormProps = {
    defaultFoedselsnummer: null,
    barn: ['123', '456'],
    onSubmit: () => undefined,
    onCancel: () => undefined,
};

test('should have no a11y violations', async () => {
    const { container } = render(<SelectBarnForm {...defaultProps} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('should show required error', async () => {
    render(<SelectBarnForm {...defaultProps} />);

    fireEvent.click(screen.getByText('Neste'));

    await waitFor(() => {
        expect(screen.getByText('Påkrevd')).toBeInTheDocument();
    });
});
