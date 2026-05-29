import { FieldErrors } from 'react-hook-form';

export interface FormFeil {
    skjemaelementId: string;
    feilmelding: string;
}

export const mapErrors = (errors: FieldErrors, keys: string[]): FormFeil[] => {
    const feil: FormFeil[] = [];

    keys.forEach((key) => {
        if (errors[key]) {
            feil.push({
                skjemaelementId: key,
                feilmelding: errors[key]?.message as string ?? '',
            });
        }
    });

    return feil;
};
