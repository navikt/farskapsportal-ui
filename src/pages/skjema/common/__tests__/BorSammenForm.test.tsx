import { fireEvent, render, runAxe, screen, waitFor } from 'test-utils';
import { expect, test } from 'vitest';
import texts from 'texts/nb';
import BorSammenForm, { BorSammenFormProps } from '../BorSammenForm';

const borSammenYesLabel = texts['skjema.borSammen.label.yes'];
const submitButtonLabel = texts['skjema.next'];
const requiredErrorMessage = texts['skjema.borSammen.validation.required'];

const defaultProps: BorSammenFormProps = {
    titleId: 'skjema.far.borSammen.title',
    defaultBorSammen: null,
    onSubmit: () => undefined,
    onCancel: () => undefined,
};

test('should have no a11y violations', async () => {
    const { container } = render(<BorSammenForm {...defaultProps} />);

    const results = await runAxe(container);
    expect(results.violations).toHaveLength(0);
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
        expect(screen.getByText(requiredErrorMessage)).not.toBeNull();
    });
});
