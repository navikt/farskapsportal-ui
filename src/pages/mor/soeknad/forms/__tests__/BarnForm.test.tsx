import { axe } from 'jest-axe';

import { fireEvent, render, screen, waitFor } from 'test-utils';
import { getNDaysAhead } from 'utils/date';
import BarnForm, { BarnFormProps } from '../BarnForm';

const defaultProps: BarnFormProps = {
    defaultTermindato: '',
    onSubmit: () => undefined,
    onCancel: () => undefined,
};

test('should have no a11y violations', async () => {
    const { container } = render(<BarnForm {...defaultProps} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('should set default value', async () => {
    render(<BarnForm {...defaultProps} defaultTermindato="2020-11-11" />);

    const termindatoInput = screen.getByLabelText(/termindato/i) as HTMLInputElement;
    expect(termindatoInput.value).toBe('11.11.2020');
});

test('should show required error', async () => {
    render(<BarnForm {...defaultProps} />);

    fireEvent.click(screen.getByText('Neste'));

    await waitFor(() => {
        expect(screen.getByText('Termindato er påkrevd')).toBeInTheDocument();
    });
});

test('should show error for date too far in the future', async () => {
    render(<BarnForm {...defaultProps} />);

    const termindatoInput = screen.getByLabelText(/termindato/i) as HTMLInputElement;
    const submitButton = screen.getByText('Neste');

    // uses .focus() to trigger onBlur
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: getNDaysAhead(200) } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(
            screen.getByText('Du er i uke 12 i svangerskapet. Vent til uke 22 med å bekrefte far.')
        ).toBeInTheDocument();
    });
});

test('should show error for date in the past', async () => {
    render(<BarnForm {...defaultProps} />);

    const termindatoInput = screen.getByLabelText(/termindato/i) as HTMLInputElement;
    const submitButton = screen.getByText('Neste');

    // uses .focus() to trigger onBlur
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: getNDaysAhead(-1) } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText('Kan ikke være før dagens dato')).toBeInTheDocument();
    });
});
