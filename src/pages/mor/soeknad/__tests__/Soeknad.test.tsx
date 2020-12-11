import { fireEvent, render, screen, waitFor } from 'test-utils';
import { Foreldrerolle } from 'types/foreldrerolle';
import { getToday } from 'utils/date';

import Soeknad from '../Soeknad';

jest.mock('api/api', () => ({ controlFatherInfo: () => Promise.resolve() }));

test('should display steps correctly', async () => {
    render(<Soeknad />, {
        store: {
            userInfo: {
                status: 'SUCCESS',
                data: {
                    kanOppretteFarskapserklaering: true,
                    gyldigForelderrolle: true,
                    forelderrolle: Foreldrerolle.Mor,
                    farsVentendeFarskapserklaeringer: null,
                    morsVentendeFarskapserklaeringer: null,
                    fnrNyligFoedteBarnUtenRegistrertFar: null,
                },
            },
        },
    });

    const termindatoInput = screen.getByLabelText(/termindato/i);
    const submitButton = screen.getByText('Neste');

    // only step 1 is displayed
    expect(termindatoInput).toBeInTheDocument();
    expect(screen.queryByLabelText(/navn/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/jeg godkjenner/i)).not.toBeInTheDocument();

    // fill out step 1
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: getToday() } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(async () => {
        const navnInput = screen.getByLabelText(/navn/i);
        const foedselsnummerInput = screen.getByLabelText(/fødselsnummer/i);
        const submitButton = screen.getByText('Neste');

        // only step 2 is displayed
        expect(screen.queryByLabelText(/termindato/i)).not.toBeInTheDocument();
        expect(navnInput).toBeInTheDocument();
        expect(screen.queryByLabelText(/jeg godkjenner/i)).not.toBeInTheDocument();

        // fill out step 2
        fireEvent.change(navnInput, { target: { value: 'TEST' } });
        fireEvent.change(foedselsnummerInput, { target: { value: '03119022621' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            // only step 3 is displayed
            expect(screen.queryByLabelText(/termindato/i)).not.toBeInTheDocument();
            expect(screen.queryByLabelText(/navn/i)).not.toBeInTheDocument();
            expect(screen.getByLabelText(/jeg godkjenner/i)).toBeInTheDocument();
        });
    });
});
