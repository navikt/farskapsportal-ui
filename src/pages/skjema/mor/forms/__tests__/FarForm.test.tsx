import { axe } from 'jest-axe';

import { fireEvent, render, screen, waitFor } from 'test-utils';
import texts from 'texts/nb';
import FarForm, { FarFormProps } from '../FarForm';

const navnLabel = texts['skjema.mor.far.navn.label'];
const foedselsnummerLabel = texts['skjema.mor.far.foedselsnummer.label'];
const navnRequiredErrorMessage = texts['skjema.mor.far.navn.validation.required'];
const foedselsnummerRequiredErrorMessage =
    texts['skjema.mor.far.foedselsnummer.validation.required'];
const invalidFoedselsnummerErrorMessage = texts['skjema.mor.far.foedselsnummer.validation.fnr'];
const submitButtonLabel = texts['skjema.next'];

const defaultProps: FarFormProps = {
    defaultNavn: '',
    defaultFoedselsnummer: '',
    onSubmit: () => undefined,
    onCancel: () => undefined,
};

test('should have no a11y violations', async () => {
    const { container } = render(<FarForm {...defaultProps} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('should set default values', async () => {
    render(<FarForm {...defaultProps} defaultNavn="TEST" defaultFoedselsnummer="12345678910" />);

    const navnInput = screen.getByLabelText(navnLabel) as HTMLInputElement;
    expect(navnInput.value).toBe('TEST');

    const foedselsnummerInput = screen.getByLabelText(foedselsnummerLabel) as HTMLInputElement;
    expect(foedselsnummerInput.value).toBe('12345678910');
});

test('should show required errors', async () => {
    render(<FarForm {...defaultProps} />);

    fireEvent.click(screen.getByText(submitButtonLabel));

    await waitFor(() => {
        // expect to find errors 2 times, one below field and one in Feiloppsummering
        expect(screen.getAllByText(navnRequiredErrorMessage)).toHaveLength(2);
        expect(screen.getAllByText(foedselsnummerRequiredErrorMessage)).toHaveLength(2);
    });
});

test('should show invalid foedselsnummer error', async () => {
    render(<FarForm {...defaultProps} />);

    const foedselsnummerInput = screen.getByLabelText(foedselsnummerLabel) as HTMLInputElement;
    fireEvent.change(foedselsnummerInput, { target: { value: 'A2345678910' } });
    fireEvent.click(screen.getByText(submitButtonLabel));

    await waitFor(() => {
        expect(foedselsnummerInput.value).toBe('A23456 78910');
        // expect to find errors 2 times, one below field and one in Feiloppsummering
        expect(screen.getAllByText(invalidFoedselsnummerErrorMessage)).toHaveLength(2);
    });
});
