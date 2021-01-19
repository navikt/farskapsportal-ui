import { Forelder } from 'types/forelder';

export const getNameFromForelder = (forelder?: Forelder | null) => {
    if (!forelder) {
        // TODO: handle this differently? Should not be missing
        return '';
    }

    return `${forelder.fornavn}${forelder.mellomnavn ? ' ' + forelder.mellomnavn : ''} ${
        forelder.etternavn
    }`;
};
