import { FieldErrors } from 'react-hook-form';
import { FeiloppsummeringFeil } from 'nav-frontend-skjema';

export const mapErrors = (
    errors: FieldErrors,
    keys: string[]
): FeiloppsummeringFeil[] => {
    const feil: FeiloppsummeringFeil[] = [];

    keys.forEach((key) => {
        if (errors[key]) {
            feil.push({
                skjemaelementId: key,
                feilmelding: errors[key].message,
            });
        }
    });

    return feil;
};
