import { removeWhitespace } from './string';

const FOEDSELSNUMMER_LENGTH = 11;
const CUTOFF_INDEX = 6;

export const formatFoedselsnummer = (fnr: string) => {
    const fnrWithoutWhitespace = removeWhitespace(fnr);

    if (fnrWithoutWhitespace.length === FOEDSELSNUMMER_LENGTH) {
        return `${fnrWithoutWhitespace.substring(0, CUTOFF_INDEX)} ${fnrWithoutWhitespace.substring(
            CUTOFF_INDEX,
            FOEDSELSNUMMER_LENGTH
        )}`;
    }

    return fnrWithoutWhitespace;
};
