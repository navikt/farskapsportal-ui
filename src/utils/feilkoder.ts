import { AlertError } from 'types/error';
import { Feilkode } from 'types/feilkode';

const EXPECTED_FEILKODER_FETCH_USER = [
    Feilkode.FarHarIkkeFnummer,
    Feilkode.ForelderHarVerge,
    Feilkode.IkkeMyndig,
    Feilkode.MedmorEllerUkjent,
    Feilkode.MorSivilstandGift,
    Feilkode.MorSivilstandRegistrertPartner,
    Feilkode.MorSivilstandUoppgitt,
    Feilkode.MorHarIkkeFnummer,
    Feilkode.MorIkkeNorskBostedsadresse,
];

const EXPECTED_FEILKODER_CONTROL_FATHER = [
    Feilkode.FarHarIkkeFnummer,
    Feilkode.FeilRolleFar,
    Feilkode.ForskjelligeFedre,
    Feilkode.MaksAntallForsoek,
    Feilkode.MorOgFarSammePerson,
    Feilkode.NavnStemmerIkkeMedRegister,
    Feilkode.PdlPersonIkkeFunnet,
    Feilkode.UgyldigFar, // doed, ikke myndig, har verge
];

export const isUserNotPermitted = (error: AlertError): boolean =>
    error.code === 400 &&
    !!error.feilkode &&
    EXPECTED_FEILKODER_FETCH_USER.includes(error.feilkode);

export const isControlFatherValidationError = (error: AlertError): boolean =>
    (error.code === 400 || error.code === 404) &&
    !!error.feilkode &&
    EXPECTED_FEILKODER_CONTROL_FATHER.includes(error.feilkode);
