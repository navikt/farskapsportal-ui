import { AlertError } from 'types/error';
import { Feilkode } from 'types/feilkode';

const EXPECTED_FEILKODER_FETCH_USER = [
    Feilkode.FeilRolle,
    Feilkode.IkkeMyndig,
    Feilkode.MedmorEllerUkjent,
    Feilkode.MorSivilstandGift,
    Feilkode.MorSivilstandRegistrertPartner,
    Feilkode.MorSivilstandUoppgitt,
];

export const isUserNotPermitted = (error: AlertError) =>
    error.code === 400 && error.feilkode && EXPECTED_FEILKODER_FETCH_USER.includes(error.feilkode);
