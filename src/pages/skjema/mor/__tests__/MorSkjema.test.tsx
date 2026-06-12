import { fireEvent, render, screen, waitFor } from 'test-utils';
import { vi } from 'vitest';
import texts from 'texts/nb';
import { Foreldrerolle } from 'types/foreldrerolle';
import { getToday } from 'utils/date';

import MorSkjema from '../MorSkjema';
import { generateRandomValidNorwegianIdent } from 'test-utils';

vi.mock('api/api', () => ({ controlFatherInfo: () => Promise.resolve() }));

const termindatoLabel = texts['termindato'];
const navnLabel = texts['skjema.mor.far.navn.label'];
const foedselsnummerLabel = texts['skjema.mor.far.foedselsnummer.label'];
const spraakBokmaalLabel = texts['skjema.mor.spraak.label.norwegian'];
const farCorrectLabel = texts['skjema.mor.confirm.farCorrect.label'];
const submitButtonLabel = texts['skjema.next'];

const toDateInputValue = (isoDate: string): string => {
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
};

test('should display steps correctly', async () => {
    render(
        <MorSkjema
            userInfo={{
                brukersFornavn: null,
                kanOppretteFarskapserklaering: true,
                gyldigForelderrolle: true,
                forelderrolle: Foreldrerolle.Mor,
                avventerSigneringBruker: null,
                avventerSigneringMotpart: null,
                avventerRegistrering: null,
                fnrNyligFoedteBarnUtenRegistrertFar: null,
            }}
        />
    );

    const termindatoInput = screen.getByLabelText(termindatoLabel);
    const submitButton = screen.getByText(submitButtonLabel);

    // only step 1 is displayed
    expect(termindatoInput).not.toBeNull();
    expect(screen.queryByLabelText(navnLabel)).toBeNull();
    expect(screen.queryByLabelText(farCorrectLabel)).toBeNull();
    expect(screen.queryByLabelText(spraakBokmaalLabel)).toBeNull();

    // fill out step 1
    termindatoInput.focus();
    fireEvent.change(termindatoInput, { target: { value: toDateInputValue(getToday()) } });
    submitButton.focus();
    fireEvent.click(submitButton);

    await waitFor(async () => {
        const navnInput = screen.getByLabelText(navnLabel);
        const foedselsnummerInput = screen.getByLabelText(foedselsnummerLabel);
        const submitButton = screen.getByText(submitButtonLabel);

        // only step 2 is displayed
        expect(screen.queryByLabelText(termindatoLabel)).toBeNull();
        expect(navnInput).not.toBeNull();
        expect(screen.queryByLabelText(farCorrectLabel)).toBeNull();
        expect(screen.queryByLabelText(spraakBokmaalLabel)).toBeNull();

        // fill out step 2
        fireEvent.change(navnInput, { target: { value: 'TEST' } });
        foedselsnummerInput.focus();
        fireEvent.change(foedselsnummerInput, {
            target: { value: generateRandomValidNorwegianIdent() },
        });
        fireEvent.click(submitButton);
    });

    await waitFor(async () => {
        const spraakBokmaalInput = screen.getByLabelText(spraakBokmaalLabel);
        const submitButton = screen.getByText(submitButtonLabel);

        // only step 3 is displayed
        expect(screen.queryByLabelText(termindatoLabel)).toBeNull();
        expect(screen.queryByLabelText(navnLabel)).toBeNull();
        expect(screen.queryByLabelText(farCorrectLabel)).toBeNull();
        expect(spraakBokmaalInput).not.toBeNull();

        // fill out step 3
        fireEvent.change(spraakBokmaalInput, { target: { checked: true } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => {
        const farCorrectCheckbox = screen.getByLabelText(farCorrectLabel);

        // only step 4 is displayed
        expect(screen.queryByLabelText(termindatoLabel)).toBeNull();
        expect(screen.queryByLabelText(navnLabel)).toBeNull();
        expect(farCorrectCheckbox).not.toBeNull();
    });
});
