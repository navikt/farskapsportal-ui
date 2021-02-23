import { axe } from 'jest-axe';

import { fireEvent, render, screen, waitFor } from 'test-utils';
import FarForm, { FarFormProps } from '../FarForm';

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

    const navnInput = screen.getByLabelText(/navn/i) as HTMLInputElement;
    expect(navnInput.value).toBe('TEST');

    const foedselsnummerInput = screen.getByLabelText(/fødselsnummer/i) as HTMLInputElement;
    expect(foedselsnummerInput.value).toBe('12345678910');
});

test('should show required errors', async () => {
    render(<FarForm {...defaultProps} />);

    fireEvent.click(screen.getByText('Neste'));

    await waitFor(() => {
        expect(screen.getAllByText('Navn til far er påkrevd')).toHaveLength(2);
        expect(screen.getAllByText('Fødselsnummer er påkrevd')).toHaveLength(2);
    });
});

test('should show invalid foedselsnummer error', async () => {
    render(<FarForm {...defaultProps} />);

    const foedselsnummerInput = screen.getByLabelText(/fødselsnummer/i) as HTMLInputElement;
    fireEvent.change(foedselsnummerInput, { target: { value: '12345678910' } });
    fireEvent.click(screen.getByText('Neste'));

    await waitFor(() => {
        expect(foedselsnummerInput.value).toBe('123456 78910');
        expect(screen.getAllByText('Ugyldig fødselsnummer')).toHaveLength(2);
    });
});
