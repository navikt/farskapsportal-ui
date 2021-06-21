import { Forelder } from 'types/forelder';
import { capitalizeFirsLetterInEveryWord } from './string';

export const getNameFromForelder = (forelder?: Forelder | null) => {
    if (!forelder) {
        // TODO: handle this differently? Should not be missing
        return '';
    }

    return `${capitalizeFirsLetterInEveryWord(forelder.fornavn)}${
        forelder.mellomnavn ? ' ' + capitalizeFirsLetterInEveryWord(forelder.mellomnavn) : ''
    } ${capitalizeFirsLetterInEveryWord(forelder.etternavn)}`;
};
