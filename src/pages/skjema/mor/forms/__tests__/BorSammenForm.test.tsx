import { axe } from 'jest-axe';

import { fireEvent, render, screen, waitFor } from 'test-utils';
import texts from 'texts/nb';
import BorSammenForm, { BorSammenFormProps } from '../BorSammenForm';

const borSammenYesLabel = texts['mor.skjema.borSammen.label.yes'];
const submitButtonLabel = texts['mor.form.buttons.next'];
const requiredErrorMessage = texts['mor.skjema.borSammen.validation.required'];

const defaultProps: BorSammenFormProps = {
    defaultBorSammen: null,
    onSubmit: () => undefined,
    onCancel: () => undefined,
};

test('should have no a11y violations', async () => {
    const { container } = render(<BorSammenForm {...defaultProps} />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
});

test('should set default values', async () => {
    render(<BorSammenForm {...defaultProps} defaultBorSammen="YES" />);

    const jaRadioInput = screen.getByLabelText(borSammenYesLabel) as HTMLInputElement;
    expect(jaRadioInput.checked).toBeTruthy();
});

test('should show required error', async () => {
    render(<BorSammenForm {...defaultProps} />);

    fireEvent.click(screen.getByText(submitButtonLabel));

    await waitFor(() => {
        expect(screen.getByText(requiredErrorMessage)).toBeInTheDocument();
    });
});
