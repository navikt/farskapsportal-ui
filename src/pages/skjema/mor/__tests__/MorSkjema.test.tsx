import { fireEvent, render, screen, waitFor } from 'test-utils';
import texts from 'texts/nb';
import { Foreldrerolle } from 'types/foreldrerolle';
import { getToday } from 'utils/date';

import MorSkjema from '../MorSkjema';

jest.mock('api/api', () => ({ controlFatherInfo: () => Promise.resolve() }));

const termindatoLabel = texts['skjema.mor.barn.termindato.label'];
const navnLabel = texts['skjema.mor.far.navn.label'];
const foedselsnummerLabel = texts['skjema.mor.far.foedselsnummer.label'];
const borSammenYesLabel = texts['skjema.borSammen.label.yes'];
const farCorrectLabel = texts['skjema.mor.confirm.farCorrect.label'];
const submitButtonLabel = texts['skjema.next'];

test('should display steps correctly', async () => {
    render(<MorSkjema />, {
        store: {
            userInfo: {
                status: 'SUCCESS',
                data: {
                    kanOppretteFarskapserklaering: true,
                    gyldigForelderrolle: true,
                    forelderrolle: Foreldrerolle.Mor,
                    avventerSigneringBruker: null,
                    avventerSigneringMotpart: null,
                    avventerRegistrering: null,
                    fnrNyligFoedteBarnUtenRegistrertFar: null,
                },
            },
        },
    });

    const termindatoInput = screen.getByLabelText(termindatoLabel);
    const submitButton = screen.getByText(submitButtonLabel);

    // only step 1 is displayed
    expect(termindatoInput).toBeInTheDocument();
    expect(screen.queryByLabelText(navnLabel)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(borSammenYesLabel)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(farCorrectLabel)).not.toBeInTheDocument();

    // fill out step 1
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: getToday() } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(async () => {
        const navnInput = screen.getByLabelText(navnLabel);
        const foedselsnummerInput = screen.getByLabelText(foedselsnummerLabel);
        const submitButton = screen.getByText(submitButtonLabel);

        // only step 2 is displayed
        expect(screen.queryByLabelText(termindatoLabel)).not.toBeInTheDocument();
        expect(navnInput).toBeInTheDocument();
        expect(screen.queryByLabelText(borSammenYesLabel)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(farCorrectLabel)).not.toBeInTheDocument();

        // fill out step 2
        fireEvent.change(navnInput, { target: { value: 'TEST' } });
        foedselsnummerInput.focus();
        fireEvent.change(foedselsnummerInput, { target: { value: '03119022621' } });
        fireEvent.click(submitButton);
    });

    await waitFor(async () => {
        const jaRadioInput = screen.getByLabelText(borSammenYesLabel);
        const submitButton = screen.getByText(submitButtonLabel);

        // only step 3 is displayed
        expect(screen.queryByLabelText(termindatoLabel)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(navnLabel)).not.toBeInTheDocument();
        expect(jaRadioInput).toBeInTheDocument();
        expect(screen.queryByLabelText(farCorrectLabel)).not.toBeInTheDocument();

        // fill out step 3
        fireEvent.click(jaRadioInput);
        fireEvent.click(submitButton);
    });

    await waitFor(() => {
        const farCorrectCheckbox = screen.getByLabelText(farCorrectLabel);

        // only step 4 is displayed
        expect(screen.queryByLabelText(termindatoLabel)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(navnLabel)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(borSammenYesLabel)).not.toBeInTheDocument();
        expect(farCorrectCheckbox).toBeInTheDocument();
    });
});
