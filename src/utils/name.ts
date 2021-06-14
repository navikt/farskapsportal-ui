import { Forelder } from 'types/forelder';
import {capitalizeFirsLetterOnly} from "./string";

export const getNameFromForelder = (forelder?: Forelder | null) => {
    if (!forelder) {
        // TODO: handle this differently? Should not be missing
        return '';
    }

    return `${capitalizeFirsLetterOnly(forelder.fornavn)}${forelder.mellomnavn ? ' ' + capitalizeFirsLetterOnly(forelder.mellomnavn) : ''} ${
        capitalizeFirsLetterOnly(forelder.etternavn)
    }`;
};
