import { Forelder } from 'types/forelder';
import { capitalizeFirsLetterInEveryWord } from './string';

export const getNameFromForelder = (forelder?: Forelder | null) => {
    if (!forelder?.navn) {
        return '';
    }

    return `${capitalizeFirsLetterInEveryWord(forelder.navn.fornavn)}${
        forelder.navn.mellomnavn
            ? ' ' + capitalizeFirsLetterInEveryWord(forelder.navn.mellomnavn)
            : ''
    } ${capitalizeFirsLetterInEveryWord(forelder.navn.etternavn)}`;
};
