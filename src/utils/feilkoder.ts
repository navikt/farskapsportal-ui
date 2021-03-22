import { AlertError } from 'types/error';
import { Feilkode } from 'types/feilkode';

const EXPECTED_FEILKODER_FETCH_USER = [
    Feilkode.IkkeMyndig,
    Feilkode.MedmorEllerUkjent,
    Feilkode.MorSivilstandGift,
    Feilkode.MorSivilstandRegistrertPartner,
    Feilkode.MorSivilstandUoppgitt,
];

const EXPECTED_FEILKODER_CONTROL_FATHER = [
    Feilkode.FeilRolleFar,
    Feilkode.ForskjelligeFedre,
    Feilkode.IkkeMyndig,
    Feilkode.MaksAntallForsoek,
    Feilkode.NavnStemmerIkkeMedRegister,
];

export const isUserNotPermitted = (error: AlertError): boolean =>
    error.code === 400 &&
    !!error.feilkode &&
    EXPECTED_FEILKODER_FETCH_USER.includes(error.feilkode);

export const isControlFatherValidationError = (error: AlertError): boolean =>
    error.code === 400 &&
    !!error.feilkode &&
    EXPECTED_FEILKODER_CONTROL_FATHER.includes(error.feilkode);
