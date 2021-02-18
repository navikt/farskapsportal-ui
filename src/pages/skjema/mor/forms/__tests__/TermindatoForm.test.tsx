import { axe } from 'jest-axe';

import { fireEvent, render, screen, waitFor } from 'test-utils';
import texts from 'texts/nb';
import { DAYS_IN_THREE_WEEKS } from 'utils/constants';
import { getNDaysInTheFuture, getNDaysInThePast } from 'utils/date';
import TermindatoForm, { TermindatoFormProps } from '../TermindatoForm';

const termindatoLabel = texts['mor.skjema.barn.form.termindato.label'];
const requiredErrorMessage = texts['mor.skjema.barn.form.termindato.validation.required'];
const invalidDateErrorMessage = texts['mor.skjema.barn.form.termindato.validation.pattern'];
const minDateErrorMessage = texts['mor.skjema.barn.form.termindato.validation.minDate'];
const submitButtonLabel = texts['mor.form.buttons.next'];

const defaultProps: TermindatoFormProps = {
    defaultTermindato: null,
    onSubmit: () => undefined,
    onCancel: () => undefined,
};

test('should have no a11y violations', async () => {
    const { container } = render(<TermindatoForm {...defaultProps} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('should set default value', async () => {
    render(<TermindatoForm {...defaultProps} defaultTermindato="2020-11-11" />);

    const termindatoInput = screen.getByLabelText(termindatoLabel) as HTMLInputElement;
    expect(termindatoInput.value).toBe('11.11.2020');
});

test('should show required error', async () => {
    render(<TermindatoForm {...defaultProps} />);

    fireEvent.click(screen.getByText(submitButtonLabel));

    await waitFor(() => {
        expect(screen.getByText(requiredErrorMessage)).toBeInTheDocument();
    });
});

test('should show error for invalid date', async () => {
    render(<TermindatoForm {...defaultProps} />);

    const termindatoInput = screen.getByLabelText(termindatoLabel) as HTMLInputElement;
    const submitButton = screen.getByText(submitButtonLabel);

    // uses .focus() to trigger onBlur
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: '31.13.2020' } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText(invalidDateErrorMessage)).toBeInTheDocument();
    });
});

test('should show error for date too far in the future', async () => {
    render(<TermindatoForm {...defaultProps} />);

    const termindatoInput = screen.getByLabelText(termindatoLabel) as HTMLInputElement;
    const submitButton = screen.getByText(submitButtonLabel);

    // uses .focus() to trigger onBlur
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: getNDaysInTheFuture(200) } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(
            screen.getByText('Du er i uke 12 i svangerskapet. Vent til uke 22 med å bekrefte far.')
        ).toBeInTheDocument();
    });
});

test('should show error for date too far in the past', async () => {
    render(<TermindatoForm {...defaultProps} />);

    const termindatoInput = screen.getByLabelText(termindatoLabel) as HTMLInputElement;
    const submitButton = screen.getByText(submitButtonLabel);

    // uses .focus() to trigger onBlur
    termindatoInput.focus();
    fireEvent.change(termindatoInput, {
        target: { value: getNDaysInThePast(DAYS_IN_THREE_WEEKS + 1) },
    });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText(minDateErrorMessage)).toBeInTheDocument();
    });
});
